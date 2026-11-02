/**
 * Gulrez Portfolio — Database TypeScript Definitions
 * Represents the PostgreSQL schema in Supabase.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ContentStatus = "draft" | "published" | "archived";
export type MessageStatus = "unread" | "read" | "replied" | "archived";
export type AdminRole = "admin" | "editor";

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          user_id: string;
          role: AdminRole;
          created_at: string;
        };
        Insert: {
          user_id: string;
          role?: AdminRole;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          role?: AdminRole;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          short_description: string | null;
          tech_stack: string[];
          image_url: string | null;
          github_url: string | null;
          live_url: string | null;
          featured: boolean;
          status: ContentStatus;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          short_description?: string | null;
          tech_stack?: string[];
          image_url?: string | null;
          github_url?: string | null;
          live_url?: string | null;
          featured?: boolean;
          status?: ContentStatus;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          short_description?: string | null;
          tech_stack?: string[];
          image_url?: string | null;
          github_url?: string | null;
          live_url?: string | null;
          featured?: boolean;
          status?: ContentStatus;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          storage_path: string;
          alt_text: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          storage_path: string;
          alt_text?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          storage_path?: string;
          alt_text?: string | null;
          display_order?: number;
          created_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string | null;
          proficiency: number | null;
          icon: string | null;
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category?: string | null;
          proficiency?: number | null;
          icon?: string | null;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string | null;
          proficiency?: number | null;
          icon?: string | null;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      experience: {
        Row: {
          id: string;
          company: string;
          role: string;
          employment_type: string | null;
          location: string | null;
          start_date: string | null;
          end_date: string | null;
          is_current: boolean;
          description: string | null;
          highlights: string[];
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company: string;
          role: string;
          employment_type?: string | null;
          location?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          description?: string | null;
          highlights?: string[];
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company?: string;
          role?: string;
          employment_type?: string | null;
          location?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          is_current?: boolean;
          description?: string | null;
          highlights?: string[];
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      education: {
        Row: {
          id: string;
          institution: string;
          qualification: string;
          field_of_study: string | null;
          start_date: string | null;
          end_date: string | null;
          grade: string | null;
          description: string | null;
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          institution: string;
          qualification: string;
          field_of_study?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          grade?: string | null;
          description?: string | null;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          institution?: string;
          qualification?: string;
          field_of_study?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          grade?: string | null;
          description?: string | null;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      certifications: {
        Row: {
          id: string;
          name: string;
          issuer: string | null;
          credential_id: string | null;
          credential_url: string | null;
          issue_date: string | null;
          expiry_date: string | null;
          image_url: string | null;
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          issuer?: string | null;
          credential_id?: string | null;
          credential_url?: string | null;
          issue_date?: string | null;
          expiry_date?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          issuer?: string | null;
          credential_id?: string | null;
          credential_url?: string | null;
          issue_date?: string | null;
          expiry_date?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image_url: string | null;
          tags: string[];
          status: ContentStatus;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string;
          cover_image_url?: string | null;
          tags?: string[];
          status?: ContentStatus;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          cover_image_url?: string | null;
          tags?: string[];
          status?: ContentStatus;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          status: MessageStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          status?: MessageStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          status?: MessageStatus;
          created_at?: string;
        };
      };
      visitor_analytics: {
        Row: {
          id: number;
          page_path: string;
          referrer_host: string | null;
          visitor_hash: string;
          visited_on: string;
          created_at: string;
        };
        Insert: {
          id?: never;
          page_path: string;
          referrer_host?: string | null;
          visitor_hash: string;
          visited_on?: string;
          created_at?: string;
        };
        Update: {
          id?: never;
          page_path?: string;
          referrer_host?: string | null;
          visitor_hash?: string;
          visited_on?: string;
          created_at?: string;
        };
      };
      contact_rate_limits: {
        Row: {
          ip_hash: string;
          window_started_at: string;
          request_count: number;
        };
        Insert: {
          ip_hash: string;
          window_started_at?: string;
          request_count?: number;
        };
        Update: {
          ip_hash?: string;
          window_started_at?: string;
          request_count?: number;
        };
      };
    };
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      consume_contact_rate_limit: {
        Args: {
          p_ip_hash: string;
          p_max_requests?: number;
          p_window_minutes?: number;
        };
        Returns: boolean;
      };
    };
  };
}

