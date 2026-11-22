import { createClient } from "@supabase/supabase-js";

/**
 * Gulrez Portfolio Supabase Client
 * 
 * Direct static property accesses enable Vite's build compiler to replace
 * environment variables during bundling, while preserving backward compatibility
 * with process.env in Node/Vitest environments.
 */

// 1. Direct static accesses for Vite compiler replacement in browser/build
const viteUrl =
  typeof import.meta !== "undefined" && import.meta.env
    ? (import.meta.env.VITE_SUPABASE_URL || import.meta.env.REACT_APP_SUPABASE_URL)
    : undefined;

const viteKey =
  typeof import.meta !== "undefined" && import.meta.env
    ? (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
       import.meta.env.REACT_APP_SUPABASE_ANON_KEY ||
       import.meta.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY ||
       import.meta.env.VITE_SUPABASE_ANON_KEY)
    : undefined;

// 2. Direct static accesses for Node / Vitest / Jest test runners
const nodeUrl =
  typeof process !== "undefined" && process.env
    ? (process.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL)
    : undefined;

const nodeKey =
  typeof process !== "undefined" && process.env
    ? (process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
       process.env.REACT_APP_SUPABASE_ANON_KEY ||
       process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY ||
       process.env.VITE_SUPABASE_ANON_KEY)
    : undefined;

export const SUPABASE_URL =
  viteUrl ||
  nodeUrl ||
  "https://njmzejtlmokfjpzjkcrq.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY = viteKey || nodeKey || "";

export const isSupabaseConfigured = () => {
  return (
    typeof SUPABASE_URL === "string" &&
    SUPABASE_URL.startsWith("http") &&
    typeof SUPABASE_PUBLISHABLE_KEY === "string" &&
    SUPABASE_PUBLISHABLE_KEY.length > 10
  );
};

if (!isSupabaseConfigured() && typeof window !== "undefined") {
  console.error(
    "Supabase configuration error: Missing publishable API key (VITE_SUPABASE_PUBLISHABLE_KEY / REACT_APP_SUPABASE_ANON_KEY)."
  );
}

/**
 * Singleton Supabase client instance.
 * Persistent session enabled for authenticated administrative sessions.
 */
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export default supabase;
