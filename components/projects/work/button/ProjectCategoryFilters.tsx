import React from 'react'
import type { SubCategory } from '@/types/Category'

interface ProjectCategoryFiltersProps {
  subCategories: SubCategory[]
  activeSubCategory: string
  setActiveSubCategory: (subCategory: string) => void
  getSubCategoryCount: (subCategorySlug: string) => number
}

// Composant pour un bouton de sous-catégorie
const SubCategoryButton = ({ 
  subCategory, 
  count, 
  isSelected, 
  onClick 
}: {
  subCategory: SubCategory
  count: number
  isSelected: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-colors ${
      isSelected
        ? 'bg-blue-600 text-foreground'
        : 'bg-white/10 text-secondary hover:bg-white/20'
    }`}
  >
    {subCategory.name} ({count})
  </button>
)

// Composant principal pour les filtres de sous-catégories
const ProjectCategoryFilters = ({ 
  subCategories,
  activeSubCategory, 
  setActiveSubCategory, 
  getSubCategoryCount 
}: ProjectCategoryFiltersProps) => {
  if (subCategories.length === 0) return null

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <SubCategoryButton
        subCategory={{ id: 'all', name: 'Tous', slug: 'all', description: 'Toutes les sous-catégories', sortOrder: 0, isActive: true, categoryId: '', createdAt: '', updatedAt: '' }}
        count={getSubCategoryCount('all')}
        isSelected={activeSubCategory === 'all'}
        onClick={() => setActiveSubCategory('all')}
      />
      {subCategories.map(subCategory => (
        <SubCategoryButton
          key={subCategory.id}
          subCategory={subCategory}
          count={getSubCategoryCount(subCategory.slug)}
          isSelected={activeSubCategory === subCategory.slug}
          onClick={() => setActiveSubCategory(subCategory.slug)}
        />
      ))}
    </div>
  )
}

export default ProjectCategoryFilters
