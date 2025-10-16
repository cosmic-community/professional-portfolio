'use client'

import { Category } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  
  if (!categories || categories.length === 0) {
    return null
  }
  
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      <Link
        href="/"
        className={`px-6 py-2 rounded-full transition-colors ${
          isHome
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Projects
      </Link>
      
      {categories.map((category) => {
        const isActive = pathname === `/categories/${category.slug}`
        
        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className={`px-6 py-2 rounded-full transition-colors ${
              isActive
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.metadata?.name || category.title}
          </Link>
        )
      })}
    </div>
  )
}