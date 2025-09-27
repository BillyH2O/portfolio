"use client"

import React, { useState } from 'react'
import { useCategories } from '@/hooks/admin/useCategories'
import { Category, CategoryFormData } from '@/types/Category'
import Link from 'next/link'
import { Loader } from '@/components/ui/Loader'

// Composant pour une carte de catégorie
const CategoryCard = ({ 
  category, 
  onEdit, 
  onDelete 
}: { 
  category: Category
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ?`)) {
      return
    }

    setIsDeleting(true)
    try {
      await onDelete(category.id)
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Erreur lors de la suppression')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
          <p className="text-sm text-gray-500">{category.slug}</p>
          {category.description && (
            <p className="text-sm text-gray-600 mt-1">{category.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {category.isActive ? 'Actif' : 'Inactif'}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {category.subCategories.length} sous-catégorie{category.subCategories.length > 1 ? 's' : ''}
        </p>
        {category.subCategories.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {category.subCategories.slice(0, 3).map((sub) => (
              <span key={sub.id} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                {sub.name}
              </span>
            ))}
            {category.subCategories.length > 3 && (
              <span className="text-xs text-gray-500">+{category.subCategories.length - 3} autres</span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Link
          href={`/admin/categories/${category.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Gérer sous-catégories
        </Link>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(category)}
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

// Composant pour le formulaire de catégorie
const CategoryForm = ({ 
  category, 
  onSave, 
  onCancel 
}: { 
  category?: Category
  onSave: (data: CategoryFormData) => void
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    sortOrder: category?.sortOrder || 0,
    isActive: category?.isActive ?? true
  })

  // Auto-generate slug when name changes
  React.useEffect(() => {
    if (formData.name && !category) { // Only auto-generate for new categories
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
  }, [formData.name, category])

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
          {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
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
              Catégorie active
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
              {category ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Composant principal
export default function AdminCategories() {
  const { categories, loading, error, createCategory, updateCategory, deleteCategory } = useCategories()
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleSave = async (categoryData: CategoryFormData) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, categoryData)
      } else {
        await createCategory(categoryData)
      }
      
      setEditingCategory(null)
      setShowForm(false)
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Erreur lors de la sauvegarde')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id)
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

  return (
    <div className="px-4 sm:px-0">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Catégories</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gérez les catégories principales de vos projets
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
            Nouvelle catégorie
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={(category) => {
                setEditingCategory(category)
                setShowForm(true)
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune catégorie</h3>
          <p className="mt-1 text-sm text-gray-500">
            Commencez par créer votre première catégorie.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-foreground bg-blue-600 hover:bg-blue-700"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nouvelle catégorie
            </button>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <CategoryForm
          category={editingCategory || undefined}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingCategory(null)
          }}
        />
      )}
    </div>
  )
}
