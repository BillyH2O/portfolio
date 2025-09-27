import { useState, useEffect } from 'react'
import type { ProjectFormData } from '@/types/Project'
import type { StackTechnique } from '@/types/StackTechnique'

// Types pour les données du projet reçues de l'API
interface ProjectImageAPI {
  url: string
  alt: string
  type: string
  width?: number
  height?: number
  sortOrder: number
}

interface ProjectStackTechniqueAPI {
  stackTechnique: {
    id: string
  }
}

interface ProjectCategoryAPI {
  categoryId: string
  subCategoryId: string
}
import { useProjectAPI } from '@/hooks/projects/useProjectAPI'
import { useStack } from '@/hooks/projects/useStack'

interface Project {
  id: string
  name: string
  description: string
  slug: string
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED'
  sortOrder: number
  createdAt: string
  updatedAt: string
  images: Array<{
    id: string
    url: string
    alt: string
    type: 'THUMBNAIL' | 'HERO' | 'GALLERY' | 'SCREENSHOT' | 'MOCKUP'
    width?: number
    height?: number
    sortOrder?: number
  }>
  stackTechniques: Array<{ stackTechnique: StackTechnique }>
  articleContent?: unknown
  articleHtml?: string
}

interface UseProjectEditProps {
  slug: string
  onSubmit: (formData: ProjectFormData) => Promise<void>
}

export const useProjectEdit = ({ slug, onSubmit }: UseProjectEditProps) => {
  const { getProject } = useProjectAPI()
  const { getStackTechniques } = useStack()
  const [project, setProject] = useState<Project | null>(null)
  const [stackTechniques, setStackTechniques] = useState<StackTechnique[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    slug: '',
    status: 'DRAFT',
    sortOrder: 0,
    images: [],
    stackTechniques: [],
    categories: [],
    articleContent: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectData, stackTechniquesData] = await Promise.all([
          getProject(slug),
          getStackTechniques()
        ])

        setProject(projectData)
        setStackTechniques(stackTechniquesData)
        
        // Initialize form data
        setFormData({
          name: projectData.name,
          description: projectData.description,
          slug: projectData.slug,
          status: projectData.status,
          sortOrder: projectData.sortOrder,
          images: projectData.images.map((img: ProjectImageAPI) => ({
            url: img.url,
            alt: img.alt,
            type: img.type,
            width: img.width,
            height: img.height,
            sortOrder: img.sortOrder
          })),
          stackTechniques: projectData.stackTechniques.map((st: ProjectStackTechniqueAPI) => st.stackTechnique.id),
          categories: projectData.categories ? projectData.categories.map((cat: ProjectCategoryAPI) => ({
            categoryId: cat.categoryId,
            subCategoryId: cat.subCategoryId
          })) : [],
          articleContent: projectData.articleContent || null
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug, getProject, getStackTechniques])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleStackTechniqueToggle = (techId: string) => {
    setFormData(prev => ({
      ...prev,
      stackTechniques: prev.stackTechniques.includes(techId)
        ? prev.stackTechniques.filter(id => id !== techId)
        : [...prev.stackTechniques, techId]
    }))
  }

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, {
        url: '',
        alt: '',
        type: 'GALLERY',
        width: 1200,
        height: 800,
        sortOrder: prev.images.length
      }]
    }))
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const updateImage = (index: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description || !formData.slug) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    setSaving(true)
    
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    } finally {
      setSaving(false)
    }
  }

  return {
    project,
    formData,
    setFormData,
    stackTechniques,
    loading,
    saving,
    error,
    handleInputChange,
    handleStackTechniqueToggle,
    addImage,
    removeImage,
    updateImage,
    handleSubmit
  }
}
