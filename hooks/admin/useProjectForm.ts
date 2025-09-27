import { useState, useEffect } from 'react'
import type { ProjectFormData, ProjectImage } from '@/types/Project'
import type { StackTechnique } from '@/types/StackTechnique'
import { generateSlug } from '../../components/admin/project-form/utils'
import { useStack } from '@/hooks/projects/useStack'

interface UseProjectFormProps {
  initialData?: Partial<ProjectFormData>
  onSubmit: (formData: ProjectFormData) => Promise<void>
}

export const useProjectForm = ({ initialData, onSubmit }: UseProjectFormProps) => {
  const { getStackTechniques } = useStack()
  const [stackTechniques, setStackTechniques] = useState<StackTechnique[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    slug: '',
    status: 'DRAFT',
    sortOrder: 0,
    images: [],
    stackTechniques: [],
    categories: [],
    articleContent: null,
    ...initialData
  })

  // Auto-generate slug when name changes
  useEffect(() => {
    if (formData.name && !initialData?.slug) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.name)
      }))
    }
  }, [formData.name, initialData?.slug])

  // Fetch stack techniques
  useEffect(() => {
    const fetchStackTechniques = async () => {
      try {
        const data = await getStackTechniques()
        setStackTechniques(data)
      } catch (error) {
        console.error('Error fetching stack techniques:', error)
      }
    }

    fetchStackTechniques()
  }, [getStackTechniques])

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

  const updateImage = (index: number, field: keyof ProjectImage, value: string | number) => {
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

    setLoading(true)
    
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Error submitting form:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    setFormData,
    stackTechniques,
    loading,
    handleInputChange,
    handleStackTechniqueToggle,
    addImage,
    removeImage,
    updateImage,
    handleSubmit
  }
}
