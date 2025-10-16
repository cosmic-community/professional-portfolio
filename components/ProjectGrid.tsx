import { Project } from '@/types'
import ProjectCard from './ProjectCard'

interface ProjectGridProps {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No projects found.</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}