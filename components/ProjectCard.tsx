import { Project } from '@/types'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const coverImage = project.metadata?.cover_image
  const category = project.metadata?.category
  const description = project.metadata?.description
  
  return (
    <Link 
      href={`/projects/${project.slug}`}
      className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {coverImage && (
        <div className="relative overflow-hidden aspect-[4/3]">
          <img 
            src={`${coverImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6 bg-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
            {project.title}
          </h3>
          {category && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              {category.metadata?.name || category.title}
            </span>
          )}
        </div>
        
        {description && (
          <p className="text-gray-600 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  )
}