// app/projects/[slug]/page.tsx
import { getProject, getProjects } from '@/lib/cosmic'
import { Project } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const projects = await getProjects() as Project[]
  
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug) as Project | null
  
  if (!project) {
    notFound()
  }
  
  const coverImage = project.metadata?.cover_image
  const gallery = project.metadata?.gallery || []
  const category = project.metadata?.category
  const dateCompleted = project.metadata?.date_completed
  
  return (
    <div className="py-16 px-4 max-w-6xl mx-auto">
      <Link 
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Portfolio
      </Link>
      
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {category.metadata?.name || category.title}
            </Link>
          )}
        </div>
        
        {project.metadata?.description && (
          <p className="text-gray-600 text-lg mb-4">{project.metadata.description}</p>
        )}
        
        {dateCompleted && (
          <p className="text-gray-500">
            Completed: {new Date(dateCompleted).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        )}
      </div>
      
      {coverImage && (
        <div className="mb-12 rounded-lg overflow-hidden">
          <img 
            src={`${coverImage.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
            alt={project.title}
            className="w-full h-auto"
          />
        </div>
      )}
      
      {gallery.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}