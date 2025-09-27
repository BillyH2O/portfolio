"use client"

import React, { useState } from 'react'
import { useSubCategories } from '@/hooks/admin/useSubCategories'
import { SubCategory, SubCategoryFormData } from '@/types/Category'
import Link from 'next/link'
import { Loader } from '@/components/ui/Loader'

interface PageProps {
  params: Promise<{ id: string }>
}

// Composant pour une carte de sous-catégorie
const SubCategoryCard = ({ 
  subCategory, 
  onEdit, 
  onDelete 
}: { 
  subCategory: SubCategory
  onEdit: (subCategory: SubCategory) => void
  onDelete: (id: string) => void
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la sous-catégorie "${subCategory.name}" ?`)) {
      return
    }

    setIsDeleting(true)
    try {
      await onDelete(subCategory.id)
    } catch (error) {
      console.error('Error deleting sub-category:', error)
      alert('Erreur lors de la suppression')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{subCategory.name}</h3>
          <p className="text-sm text-gray-500">{subCategory.slug}</p>
          {subCategory.description && (
            <p className="text-sm text-gray-600 mt-1">{subCategory.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            subCategory.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {subCategory.isActive ? 'Actif' : 'Inactif'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Ordre: {subCategory.sortOrder}
        </span>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(subCategory)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Modifier
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
          >
            {isDeleting ? '...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Composant pour le formulaire de sous-catégorie
const SubCategoryForm = ({ 
  subCategory, 
  onSave, 
  onCancel 
}: { 
  subCategory?: SubCategory
  onSave: (data: Omit<SubCategoryFormData, 'categoryId'>) => void
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState({
    name: subCategory?.name || '',
    slug: subCategory?.slug || '',
    description: subCategory?.description || '',
    sortOrder: subCategory?.sortOrder || 0,
    isActive: subCategory?.isActive ?? true
  })

  // Auto-generate slug when name changes
  React.useEffect(() => {
    if (formData.name && !subCategory) { // Only auto-generate for new sub-categories
      const slug = formData.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
      
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.name, subCategory])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.slug) {
      alert('Nom et slug sont obligatoires')
      return
    }
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {subCategory ? 'Modifier la sous-catégorie' : 'Nouvelle sous-catégorie'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ordre de tri</label>
            <input
              type="number"
              value={formData.sortOrder}
              onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Sous-catégorie active
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-foreground hover:bg-blue-700"
            >
              {subCategory ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Composant principal
export default function AdminSubCategories({ params }: PageProps) {
  const resolvedParams = React.use(params)
  const { id: categoryId } = resolvedParams
  
  const { subCategories, loading, error, createSubCategory, updateSubCategory, deleteSubCategory } = useSubCategories(categoryId)
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleSave = async (subCategoryData: Omit<SubCategoryFormData, 'categoryId'>) => {
    try {
      if (editingSubCategory) {
        await updateSubCategory(editingSubCategory.id, subCategoryData)
      } else {
        await createSubCategory(subCategoryData)
      }
      
      setEditingSubCategory(null)
      setShowForm(false)
    } catch (error) {
      console.error('Error saving sub-category:', error)
      alert('Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteSubCategory(id)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la suppression'
      alert(errorMessage)
      throw error
    }
  }

  if (loading) {
    return (
      <div className="px-4 sm:px-0">
        <Loader/>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 sm:px-0">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Erreur</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const categoryName = subCategories[0]?.category?.name || 'Catégorie'

  return (
    <div className="px-4 sm:px-0">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Link 
              href="/admin/categories"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Retour aux catégories
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sous-catégories</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gérez les sous-catégories de &quot;{categoryName}&quot;
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-foreground bg-blue-600 hover:bg-blue-700"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nouvelle sous-catégorie
          </button>
        </div>
      </div>

      {/* Sub-Categories Grid */}
      {subCategories.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subCategories.map((subCategory) => (
            <SubCategoryCard
              key={subCategory.id}
              subCategory={subCategory}
              onEdit={(subCategory) => {
                setEditingSubCategory(subCategory)
                setShowForm(true)
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune sous-catégorie</h3>
          <p className="mt-1 text-sm text-gray-500">
            Commencez par créer votre première sous-catégorie.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-foreground bg-blue-600 hover:bg-blue-700"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nouvelle sous-catégorie
            </button>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <SubCategoryForm
          subCategory={editingSubCategory || undefined}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingSubCategory(null)
          }}
        />
      )}
    </div>
  )
}
