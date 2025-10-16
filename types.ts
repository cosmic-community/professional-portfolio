// TypeScript definitions for Cosmic objects

// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Project type with complete metadata structure
export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    title?: string;
    description?: string;
    cover_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    category?: Category;
    date_completed?: string;
  };
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
  };
}

// About type (singleton)
export interface About extends CosmicObject {
  type: 'about';
  metadata: {
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    phone?: string;
    instagram?: string;
    facebook?: string;
  };
}

// Newsletter Subscriber type
export interface NewsletterSubscriber extends CosmicObject {
  type: 'newsletter-subscribers';
  metadata: {
    name?: string;
    email?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards
export function isProject(obj: CosmicObject): obj is Project {
  return obj.type === 'projects';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}