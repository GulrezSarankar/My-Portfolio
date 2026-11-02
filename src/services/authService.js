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

export const onAuthStateChange = (callback) => {
  const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
    callback(event, session);
  });
  return authListener.subscription;
};

