import { supabase } from "./supabaseClient";

/**
 * Authentication Service
 * Manages administrative authentication and RBAC checks.
 */

export const signInAdmin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) return { data: null, error };
  if (!data.user) return { data: null, error: new Error("Authentication failed: No user returned.") };

  // Verify that the user exists in public.admin_users
  const { data: adminRecord, error: adminCheckError } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (adminCheckError || !adminRecord) {
    // Unauthorized user: immediately sign out to maintain security
    await supabase.auth.signOut();
    return {
      data: null,
      error: new Error("Unauthorized: Account does not have administrative access."),
    };
  }

  return {
    data: {
      user: data.user,
      session: data.session,
      role: adminRecord.role,
    },
    error: null,
  };
};

export const signOutAdmin = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentAdmin = async () => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !sessionData.session) {
    return { admin: null, error: sessionError };
  }

  const user = sessionData.session.user;
  const { data: adminRecord, error: adminError } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !adminRecord) {
    return { admin: null, error: new Error("Not an authorized administrator.") };
  }

  return {
    admin: {
      id: user.id,
      email: user.email,
      role: adminRecord.role,
    },
    error: null,
  };
};

export const resetPassword = async (email, redirectTo = null) => {
  const options = redirectTo ? { redirectTo } : {};
  const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim(), options);
  return { data, error };
};

/**
 * Request an administrator password reset email.
 * Includes explicit redirectTo parameter pointing to the dedicated admin reset page.
 */
export const requestAdminPasswordReset = async (email, redirectTo = null) => {
  const defaultRedirect = typeof window !== "undefined"
    ? `${window.location.origin}/admin/reset-password`
    : "https://gulrezsarankar.info/admin/reset-password";
  
  const options = {
    redirectTo: redirectTo || defaultRedirect,
  };

  const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim(), options);
  return { data, error };
};

/**
 * Update an administrator's password during an active recovery session.
 */
export const updateAdminPassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { data, error };
};

/**
 * Safely retrieve the current active Supabase auth session.
 */
export const getActiveSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data?.session || null, error };
};


export const onAuthStateChange = (callback) => {
  const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
    callback(event, session);
  });
  return authListener.subscription;
};

