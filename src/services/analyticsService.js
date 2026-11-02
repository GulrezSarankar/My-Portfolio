import { supabase, isSupabaseConfigured } from "./supabaseClient";

/**
 * Analytics Service
 * Provides privacy-preserving client page-view reporting and admin statistics.
 */

const getOrCreateVisitorId = () => {
  if (typeof window === "undefined" || !window.sessionStorage) return null;
  const KEY = "portfolio_visitor_session_id";
  let id = sessionStorage.getItem(KEY);
  if (!id) {
    id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `vis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(KEY, id);
  }
  return id;
};

export const trackPageVisit = async (pagePath = window.location.pathname, referrer = document.referrer) => {
  if (!isSupabaseConfigured() || typeof window === "undefined") {
    return { success: false, reason: "analytics_disabled_or_ssr" };
  }

  const visitorId = getOrCreateVisitorId();
  if (!visitorId) return { success: false, reason: "no_visitor_token" };

  try {
    const { data, error } = await supabase.functions.invoke("track-visit", {
      body: {
        pagePath: pagePath || "/",
        referrer: referrer || "",
        visitorId,
      },
    });

    if (error) {
      // Analytics failures should never interrupt browsing
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
};

/**
 * Admin: Retrieve visitor analytics statistics
 */
export const getVisitorStatistics = async () => {
  const { data, error } = await supabase
    .from("visitor_analytics")
    .select("id, page_path, referrer_host, visited_on, created_at")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error || !data) {
    return { data: null, error };
  }

  const pageCounts = {};
  data.forEach((r) => {
    pageCounts[r.page_path] = (pageCounts[r.page_path] || 0) + 1;
  });

  const topPages = Object.entries(pageCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count);

  const stats = {
    totalVisits: data.length,
    topPages,
    recentVisits: data.slice(0, 50),
  };

  return { data: stats, error: null };
};

