import { useState, useEffect, useMemo } from 'react'
import type { Project } from '@/types/Project'
import type { Category } from '@/types/Category'

export type SectionType = 'projects' | 'services' | 'stack-technique'

// Hook pour gérer la section projets de la homepage
export const useProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all')
  const [activeSection, setActiveSection] = useState<SectionType>('projects')

  // Réinitialiser la section à "projects" quand on change de catégorie
  useEffect(() => {
    if (activeCategory) {
      setActiveSection('projects')
      setActiveSubCategory('all')
    }
  }, [activeCategory])

  // Charger les projets et catégories depuis l'API
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [projectsRes, categoriesRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/categories')
        ])
        
        if (!projectsRes.ok) {
          throw new Error('Failed to fetch projects')
        }
        if (!categoriesRes.ok) {
          throw new Error('Failed to fetch categories')
        }
        
        const [projectsData, categoriesData] = await Promise.all([
          projectsRes.json(),
          categoriesRes.json()
        ])
        
        setProjects(projectsData)
        setCategories(categoriesData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setProjects([])
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filtrer les projets selon la catégorie et sous-catégorie actives
  const filteredProjects = useMemo(() => {
    if (!activeCategory) return []

    const selectedCategory = categories.find(cat => cat.slug === activeCategory)
    if (!selectedCategory) return []

    return projects.filter(project => {
      // Filtrer par catégorie
      const hasMatchingCategory = project.categories?.some(pc => 
        pc.category.id === selectedCategory.id
      )

      if (!hasMatchingCategory) return false

      // Si sous-catégorie sélectionnée (et pas "all"), filtrer aussi par sous-catégorie
      if (activeSubCategory && activeSubCategory !== 'all') {
        return project.categories?.some(pc => 
          pc.category.id === selectedCategory.id && 
          pc.subCategory?.slug === activeSubCategory
        )
      }

      return true
    })
  }, [projects, categories, activeCategory, activeSubCategory])

  // Obtenir les sous-catégories de la catégorie active
  const getSubCategories = () => {
    if (!activeCategory) return []
    const selectedCategory = categories.find(cat => cat.slug === activeCategory)
    return selectedCategory?.subCategories || []
  }

  // Compter les projets par catégorie
  const getCategoryCount = (categorySlug: string) => {
    const selectedCategory = categories.find(cat => cat.slug === categorySlug)
    if (!selectedCategory) return 0
    
    return projects.filter(project =>
      project.categories?.some(pc => pc.category.id === selectedCategory.id)
    ).length
  }

  // Compter les projets par sous-catégorie
  const getSubCategoryCount = (subCategorySlug: string) => {
    if (!activeCategory) return 0
    
    const selectedCategory = categories.find(cat => cat.slug === activeCategory)
    if (!selectedCategory) return 0

    if (subCategorySlug === 'all') {
      return getCategoryCount(activeCategory)
    }

    const selectedSubCategory = selectedCategory.subCategories.find(sub => sub.slug === subCategorySlug)
    if (!selectedSubCategory) return 0

    return projects.filter(project =>
      project.categories?.some(pc => 
        pc.category.id === selectedCategory.id && 
        pc.subCategory?.id === selectedSubCategory.id
      )
    ).length
  }

  return {
    projects: filteredProjects,
    allProjects: projects,
    categories,
    loading,
    error,
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    activeSection,
    setActiveSection,
    subCategories: getSubCategories(),
    getCategoryCount,
    getSubCategoryCount
  }
}
