import { ContentStatus, MessageStatus, AdminRole } from "./database.types";

export type { ContentStatus, MessageStatus, AdminRole };

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description?: string | null;
  tech_stack: string[];
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  status: ContentStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
  images?: string[];
}

export interface ProjectInput {
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
}

export interface Skill {
  id: string;
  name: string;
  category: string | null;
  proficiency: number | null;
  icon: string | null;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface SkillInput {
  name: string;
  category?: string | null;
  proficiency?: number | null;
  icon?: string | null;
  display_order?: number;
  is_visible?: boolean;
}

export interface Experience {
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
}

export interface ExperienceInput {
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
}

export interface Education {
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
}

export interface EducationInput {
  institution: string;
  qualification: string;
  field_of_study?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  grade?: string | null;
  description?: string | null;
  display_order?: number;
  is_visible?: boolean;
}

export interface Certification {
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
}

export interface CertificationInput {
  name: string;
  issuer?: string | null;
  credential_id?: string | null;
  credential_url?: string | null;
  issue_date?: string | null;
  expiry_date?: string | null;
  image_url?: string | null;
  display_order?: number;
  is_visible?: boolean;
}

export interface BlogPost {
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
}

export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  cover_image_url?: string | null;
  tags?: string[];
  status?: ContentStatus;
  published_at?: string | null;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: MessageStatus;
  created_at: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string; // honeypot
}

export interface VisitorAnalyticsRecord {
  id: number;
  page_path: string;
  referrer_host: string | null;
  visited_on: string;
  created_at: string;
}

export interface VisitorStatistics {
  totalVisits: number;
  uniqueDailyVisitors: number;
  topPages: { path: string; count: number }[];
  recentVisits: VisitorAnalyticsRecord[];
}

export interface ServiceResult<T> {
  data: T | null;
  error: Error | null;
}

