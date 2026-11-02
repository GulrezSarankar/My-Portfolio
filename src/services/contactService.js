import { supabase, isSupabaseConfigured } from "./supabaseClient";

/**
 * Contact Service
 * Interacts with the secure contact-submit Edge Function and provides admin inbox controls.
 */

export const submitContactMessage = async ({ name, email, subject, message, website = "" }) => {
  if (!name || !email || !message) {
    return { data: null, error: new Error("Name, email and message are required.") };
  }

  // If Supabase is configured, invoke the secure contact-submit Edge Function
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.functions.invoke("contact-submit", {
        body: {
          name: name.trim(),
          email: email.trim(),
          subject: (subject || "").trim(),
          message: message.trim(),
          website: website || "", // Honeypot field
        },
      });

      if (error) {
        return { data: null, error: new Error(error.message || "Failed to submit contact message.") };
      }

      if (data && data.error) {
        return { data: null, error: new Error(data.error) };
      }

      return { data: data || { success: true }, error: null };
    } catch (err) {
      console.error("contact-submit invocation exception:", err);
      return { data: null, error: err };
    }
  }

  // Fallback if Supabase is not connected in current runtime:
  return {
    data: null,
    error: new Error("Backend contact service is currently unconfigured. Please email directly."),
  };
};

/**
 * Admin: Retrieve all contact inbox messages
 */
export const getContactMessages = async () => {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return { data, error };
};

/**
 * Admin: Update message status ('unread' | 'read' | 'replied' | 'archived')
 */
export const updateMessageStatus = async (id, status) => {
  const { data, error } = await supabase
    .from("contact_messages")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

/**
 * Admin: Archive a message
 */
export const archiveMessage = async (id) => {
  return updateMessageStatus(id, "archived");
};

/**
 * Admin: Delete a contact message
 */
export const deleteMessage = async (id) => {
  const { data, error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

