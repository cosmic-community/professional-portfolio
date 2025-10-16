import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all projects with categories
export async function getProjects() {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Manual sorting by date_completed (newest first)
    const projects = response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.date_completed || '').getTime();
      const dateB = new Date(b.metadata?.date_completed || '').getTime();
      return dateB - dateA;
    });
    
    return projects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch projects');
  }
}

// Fetch single project by slug
export async function getProject(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'projects', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch project');
  }
}

// Fetch all categories
export async function getCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Fetch projects by category
export async function getProjectsByCategory(categoryId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'projects',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Manual sorting by date_completed (newest first)
    const projects = response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.date_completed || '').getTime();
      const dateB = new Date(b.metadata?.date_completed || '').getTime();
      return dateB - dateA;
    });
    
    return projects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch projects by category');
  }
}

// Fetch about information
export async function getAbout() {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'about' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch about information');
  }
}

// Subscribe to newsletter
export async function subscribeNewsletter(name: string, email: string) {
  try {
    await cosmic.objects.insertOne({
      type: 'newsletter-subscribers',
      title: name,
      metadata: {
        name,
        email
      }
    });
    
    return { success: true };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    throw new Error('Failed to subscribe to newsletter');
  }
}