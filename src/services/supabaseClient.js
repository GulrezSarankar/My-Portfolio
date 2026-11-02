import { createClient } from "@supabase/supabase-js";

/**
 * Gulrez Portfolio Supabase Client
 * 
 * Safely resolves environment variables across Vite (import.meta.env),
 * Create React App (process.env.REACT_APP_*), and standard Node/Jest environments.
 */

const getEnv = (key) => {
  // 1. Node / Create React App / Webpack / Jest environment variables
  try {
    if (typeof process !== "undefined" && process.env) {
      if (process.env[key]) return process.env[key];
      // Check CRA alias
      const craKey = key.replace("VITE_", "REACT_APP_");
      if (process.env[craKey]) return process.env[craKey];
      const anonKey = key.replace("VITE_SUPABASE_PUBLISHABLE_KEY", "REACT_APP_SUPABASE_ANON_KEY");
      if (process.env[anonKey]) return process.env[anonKey];
    }
  } catch (_) {
    // process not available
  }

  // 2. Vite environment variables safely evaluated without breaking CommonJS/Jest AST parsers
  try {
    // eslint-disable-next-line no-new-func
    const getMeta = new Function("try { return import.meta; } catch(e) { return undefined; }");
    const meta = getMeta();
    if (meta && meta.env && meta.env[key]) {
      return meta.env[key];
    }
  } catch (_) {
    // import.meta not available
  }

  return undefined;
};

// Static literal access ensures Webpack/DefinePlugin embeds the value into production builds.
export const SUPABASE_URL =
  (typeof process !== "undefined" && process.env && (process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL)) ||
  getEnv("VITE_SUPABASE_URL") ||
  "https://njmzejtlmokfjpzjkcrq.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  (typeof process !== "undefined" && process.env && (process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY)) ||
  getEnv("VITE_SUPABASE_PUBLISHABLE_KEY") ||
  "";

export const isSupabaseConfigured = () => {
  return (
    typeof SUPABASE_URL === "string" &&
    SUPABASE_URL.startsWith("http") &&
    typeof SUPABASE_PUBLISHABLE_KEY === "string" &&
    SUPABASE_PUBLISHABLE_KEY.length > 10
  );
};

/**
 * Singleton Supabase client instance.
 * Persistent session enabled for authenticated administrative sessions.
 */
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export default supabase;
