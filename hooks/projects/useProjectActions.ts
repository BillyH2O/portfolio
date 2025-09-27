import { useCallback, useState } from 'react'
import { useProjectAPI } from './useProjectAPI'
import { useAdminNavigation } from '../admin/useAdminNavigation'
import type { ProjectFormData } from '@/types/Project'

/**
 * Hook de haut niveau pour les actions sur les projets
 * Combine les appels API avec la navigation et la gestion d'erreurs
 */
export const useProjectActions = () => {
  const { createProject, updateProject, deleteProject } = useProjectAPI()
  const { navigateToProjects } = useAdminNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Action de création avec navigation automatique
  const handleCreateProject = useCallback(async (formData: ProjectFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      await createProject(formData)
      navigateToProjects()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      alert(`Erreur: ${errorMessage}`)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [createProject, navigateToProjects])

  // Action de mise à jour avec navigation automatique
  const handleUpdateProject = useCallback(async (slug: string, formData: ProjectFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      await updateProject(slug, formData)
      navigateToProjects()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      alert(`Erreur: ${errorMessage}`)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [updateProject, navigateToProjects])

  // Action de suppression avec confirmation
  const handleDeleteProject = useCallback(async (slug: string, projectName?: string) => {
    const confirmMessage = projectName 
      ? `Êtes-vous sûr de vouloir supprimer le projet "${projectName}" ?`
      : 'Êtes-vous sûr de vouloir supprimer ce projet ?'

    if (!confirm(confirmMessage)) {
      return false
    }

    setIsLoading(true)
    setError(null)

    try {
      await deleteProject(slug)
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      alert(`Erreur: ${errorMessage}`)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [deleteProject])

  // Réinitialiser l'état d'erreur
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    handleCreateProject,
    handleUpdateProject,
    handleDeleteProject,
    isLoading,
    error,
    clearError
  }
}
