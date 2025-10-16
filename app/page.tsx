import { getProjects, getCategories } from '@/lib/cosmic'
import { Project, Category } from '@/types'
import ProjectGrid from '@/components/ProjectGrid'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'
import Newsletter from '@/components/Newsletter'

export const revalidate = 60

export default async function Home() {
  const projects = await getProjects() as Project[]
  const categories = await getCategories() as Category[]
  
  return (
    <div>
      <Hero />
      
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of stunning photography across various styles and subjects
          </p>
        </div>
        
        <CategoryFilter categories={categories} />
        
        <ProjectGrid projects={projects} />
      </section>
      
      <Newsletter />
    </div>
  )
}