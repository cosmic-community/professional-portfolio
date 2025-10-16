# Professional Photography Portfolio

![App Preview](https://imgix.cosmicjs.com/d62dcef0-aa4f-11f0-8dcc-651091f6a7c0-photo-1519741497674-611481863552-1760592031912.jpg?w=1200&h=300&fit=crop,compress)

A stunning, modern photography portfolio website built with Next.js 15 and Cosmic CMS. Showcase your photography projects organized by category, share your story, and grow your audience with newsletter subscriptions.

## Features

- 📸 **Dynamic Project Gallery** - Masonry-style grid with smooth hover effects and category filtering
- 🏷️ **Category Organization** - Filter projects by Wedding, Portrait, or Landscape photography
- 🖼️ **Full Project Pages** - Detailed project views with complete image galleries
- 👤 **About Page** - Professional biography with profile photo and contact information
- 📧 **Newsletter Subscription** - Collect emails with form validation and success notifications
- 🎨 **Image Optimization** - Automatic image optimization using imgix CDN
- 📱 **Fully Responsive** - Beautiful on all devices from mobile to desktop
- ⚡ **Lightning Fast** - Built with Next.js 15 App Router and Server Components

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68f08055f3dfda8c705d22fc&clone_repository=68f081f1f3dfda8c705d2315)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a website for a professional photographer"

### Code Generation Prompt

> Based on the content model I created for "Create a website for a professional photographer", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface. Add a newsletter subscription feature that saves to a new Cosmic newsletter subscribers Object type with name and email and success message.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **imgix** - Image optimization and CDN

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account and bucket

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd professional-photography-portfolio
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Projects with Categories

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all projects with nested category data
const response = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const projects = response.objects
```

### Filtering by Category

```typescript
// Get projects for a specific category
const response = await cosmic.objects
  .find({ 
    type: 'projects',
    'metadata.category': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating Newsletter Subscribers

```typescript
// Add a new subscriber
await cosmic.objects.insertOne({
  type: 'newsletter-subscribers',
  title: formData.name,
  metadata: {
    name: formData.name,
    email: formData.email
  }
})
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS with the following content structure:

### Object Types

**Projects** (projects)
- Title (text)
- Description (textarea)
- Cover Image (file)
- Gallery (files)
- Category (object relationship)
- Date Completed (date)

**Categories** (categories)
- Name (text)
- Description (textarea)

**About** (about) - Singleton
- Bio (HTML textarea)
- Profile Photo (file)
- Email (text)
- Phone (text)
- Instagram (text)
- Facebook (text)

**Newsletter Subscribers** (newsletter-subscribers)
- Name (text)
- Email (text)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Add environment variables in Site settings
4. Deploy!

## Project Structure

```
├── app/
│   ├── about/              # About page
│   ├── api/
│   │   └── subscribe/      # Newsletter subscription endpoint
│   ├── categories/
│   │   └── [slug]/         # Category pages
│   ├── projects/
│   │   └── [slug]/         # Project detail pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable components
├── lib/
│   └── cosmic.ts          # Cosmic SDK configuration
├── types.ts               # TypeScript definitions
└── public/                # Static assets
```

<!-- README_END -->