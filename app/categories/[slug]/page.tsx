// app/categories/[slug]/page.tsx
import { getCategories, getProjectsByCategory } from '@/lib/cosmic'
import { Category, Project } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProjectGrid from '@/components/ProjectGrid'

export async function generateStaticParams() {
  const categories = await getCategories() as Category[]
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const categories = await getCategories() as Category[]
  const category = categories.find((cat) => cat.slug === slug)
  
  if (!category) {
    notFound()
  }
  
  const projects = await getProjectsByCategory(category.id) as Project[]
  
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <Link 
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to All Projects
      </Link>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.metadata?.name || category.title}</h1>
        {category.metadata?.description && (
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {category.metadata.description}
          </p>
        )}
        <p className="text-gray-500 mt-4">{projects.length} {projects.length === 1 ? 'project' : 'projects'}</p>
      </div>
      
      <ProjectGrid projects={projects} />
    </div>
  )
}