import React from 'react'
import type { ProjectFormData } from '@/types/Project'
import type { SubCategory } from '@/types/Category'
import { useCategories } from '@/hooks/admin/useCategories'

interface CategorySectionProps {
  formData: ProjectFormData
  onCategoriesChange: (categories: Array<{ categoryId: string; subCategoryId: string }>) => void
}

const CategorySection = ({ formData, onCategoriesChange }: CategorySectionProps) => {
  const { categories, loading: categoriesLoading } = useCategories()
  
  // Utiliser directement les catégories du formData, pas d'état local
  const selectedCategories = formData.categories || []

  // Fonction pour mettre à jour les catégories
  const handleCategoriesChange = (newCategories: Array<{ categoryId: string; subCategoryId: string }>) => {
    onCategoriesChange(newCategories)
  }

  const addCategory = () => {
    if (categories.length > 0) {
      const firstCategory = categories[0]
      const firstSubCategory = firstCategory.subCategories?.[0]
      
      if (firstSubCategory) {
        const newCategory = {
          categoryId: firstCategory.id,
          subCategoryId: firstSubCategory.id
        }
        
        const newCategories = [...selectedCategories, newCategory]
        handleCategoriesChange(newCategories)
      }
    }
  }

  const removeCategory = (index: number) => {
    const newCategories = selectedCategories.filter((_, i) => i !== index)
    handleCategoriesChange(newCategories)
  }

  const updateCategory = (index: number, categoryId: string, subCategoryId?: string) => {
    const newCategories = selectedCategories.map((cat, i) => {
      if (i === index) {
        // Si on change la catégorie principale, prendre la première sous-catégorie
        if (categoryId !== cat.categoryId) {
          const selectedCategory = categories.find(c => c.id === categoryId)
          const firstSubCategory = selectedCategory?.subCategories?.[0]
          return {
            categoryId,
            subCategoryId: firstSubCategory?.id || cat.subCategoryId
          }
        }
        // Sinon, juste mettre à jour la sous-catégorie si fournie
        return {
          ...cat,
          subCategoryId: subCategoryId || cat.subCategoryId
        }
      }
      return cat
    })
    handleCategoriesChange(newCategories)
  }

  const getSubCategories = (categoryId: string): SubCategory[] => {
    const category = categories.find(c => c.id === categoryId)
    return category?.subCategories || []
  }

  if (categoriesLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Catégories</h3>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Catégories</h3>
        <button
          type="button"
          onClick={addCategory}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Ajouter une catégorie
        </button>
      </div>

      {selectedCategories.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <svg className="mx-auto h-8 w-8 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <p className="mt-2 text-sm text-gray-500">Aucune catégorie sélectionnée</p>
          <p className="text-xs text-secondary-foreground">Cliquez sur &quot;Ajouter une catégorie&quot; pour commencer</p>
        </div>
      ) : (
        <div className="space-y-3">
          {selectedCategories.map((selectedCat, index) => {
            const subCategories = getSubCategories(selectedCat.categoryId)
           
            return (
              <div key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {/* Sélection de la catégorie principale */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Catégorie principale
                    </label>
                    <select
                      value={selectedCat.categoryId}
                      onChange={(e) => updateCategory(index, e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sélection de la sous-catégorie */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Sous-catégorie
                    </label>
                    <select
                      value={selectedCat.subCategoryId}
                      onChange={(e) => updateCategory(index, selectedCat.categoryId, e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      {subCategories.map(subCat => (
                        <option key={subCat.id} value={subCat.id}>
                          {subCat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bouton de suppression */}
                <button
                  type="button"
                  onClick={() => removeCategory(index)}
                  className="inline-flex items-center p-2 border border-transparent rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  title="Supprimer cette catégorie"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )
          })}
        </div>
      )}

      {categories.length === 0 && (
        <div className="text-center py-4 text-sm text-gray-500">
          <p>Aucune catégorie disponible.</p>
          <p className="text-xs">Créez des catégories depuis l&apos;administration.</p>
        </div>
      )}
    </div>
  )
}

export default CategorySection
