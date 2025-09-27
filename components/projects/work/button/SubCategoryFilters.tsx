import React from 'react'
import type { Category } from '@/types/Category'

interface SubCategoryFiltersProps {
  activeCategory: string
  activeSubCategory: string
  setActiveSubCategory: (subCategory: string) => void
  categories: Category[]
  getSubCategoryCount: (subCategorySlug: string) => number
}

const SubCategoryFilters = ({ 
  activeCategory,
  activeSubCategory, 
  setActiveSubCategory, 
  categories,
  getSubCategoryCount 
}: SubCategoryFiltersProps) => {
  // Trouver la catégorie active pour obtenir ses sous-catégories
  const currentCategory = categories.find(cat => cat.slug === activeCategory)
  const subCategories = currentCategory?.subCategories || []

  if (subCategories.length === 0) return null

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
      <button
        onClick={() => setActiveSubCategory('all')}
        className={`px-4 py-2 rounded-lg transition-colors ${
          activeSubCategory === 'all'
            ? 'bg-blue-600 text-foreground'
            : 'bg-white/10 text-secondary hover:bg-white/20'
        }`}
      >
        Tous ({getSubCategoryCount('all')})
      </button>
      {subCategories.map(subCategory => (
        <button
          key={subCategory.id}
          onClick={() => setActiveSubCategory(subCategory.slug)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeSubCategory === subCategory.slug
              ? 'bg-blue-600 text-foreground'
              : 'bg-white/10 text-secondary hover:bg-white/20'
          }`}
        >
          {subCategory.name} ({getSubCategoryCount(subCategory.slug)})
        </button>
      ))}
    </div>
  )
}

export default SubCategoryFilters
