import { useCallback } from 'react'
import type { ProjectFormData } from '@/components/admin/project-form'

/**
 * Hook pour les appels API liés aux projets
 */
export const useProjectAPI = () => {
  // Créer un nouveau projet
  const createProject = useCallback(async (formData: ProjectFormData) => {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Une erreur est survenue lors de la création')
    }

    return await response.json()
  }, [])

  // Mettre à jour un projet existant
  const updateProject = useCallback(async (slug: string, formData: ProjectFormData) => {
    const response = await fetch(`/api/projects/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Une erreur est survenue lors de la mise à jour')
    }

    return await response.json()
  }, [])

  // Récupérer un projet par slug
  const getProject = useCallback(async (slug: string) => {
    const response = await fetch(`/api/projects/${slug}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Projet non trouvé')
      }
      throw new Error('Erreur lors du chargement du projet')
    }

    return await response.json()
  }, [])

  // Supprimer un projet
  const deleteProject = useCallback(async (slug: string) => {
    const response = await fetch(`/api/projects/${slug}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Une erreur est survenue lors de la suppression')
    }

    return true
  }, [])

  // Récupérer la liste des projets
  const getProjects = useCallback(async () => {
    const response = await fetch('/api/projects')
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des projets')
    }

    return await response.json()
  }, [])

  return {
    createProject,
    updateProject,
    getProject,
    deleteProject,
    getProjects
  }
}
