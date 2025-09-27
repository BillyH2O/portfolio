import { useState, useEffect, useCallback } from 'react'
import { SubCategory, SubCategoryFormData } from '@/types/Category'

/**
 * Hook pour gérer les sous-catégories dans l'admin
 */
export const useSubCategories = (categoryId: string) => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubCategories = useCallback(async () => {
    if (!categoryId) return

    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/categories/${categoryId}/sub-categories`)
      if (!response.ok) throw new Error('Failed to fetch sub-categories')
      
      const data = await response.json()
      setSubCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [categoryId])

  useEffect(() => {
    fetchSubCategories()
  }, [categoryId, fetchSubCategories])

  const createSubCategory = async (subCategoryData: Omit<SubCategoryFormData, 'categoryId'>) => {
    const response = await fetch(`/api/categories/${categoryId}/sub-categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...subCategoryData, categoryId })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create sub-category')
    }

    const newSubCategory = await response.json()
    setSubCategories(prev => [...prev, newSubCategory])
    return newSubCategory
  }

  const updateSubCategory = async (id: string, subCategoryData: Omit<SubCategoryFormData, 'categoryId'>) => {
    const response = await fetch(`/api/sub-categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...subCategoryData, categoryId })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update sub-category')
    }

    const updatedSubCategory = await response.json()
    setSubCategories(prev => prev.map(sub => sub.id === id ? updatedSubCategory : sub))
    return updatedSubCategory
  }

  const deleteSubCategory = async (id: string) => {
    const response = await fetch(`/api/sub-categories/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete sub-category')
    }

    setSubCategories(prev => prev.filter(sub => sub.id !== id))
  }

  return {
    subCategories,
    loading,
    error,
    refetch: fetchSubCategories,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
  }
}
