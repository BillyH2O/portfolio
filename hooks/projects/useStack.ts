import { useCallback } from 'react'
import { ProjectStackTechnique } from "@/types/Project"
import { StackTechnique } from "@/types/StackTechnique"
import { STACK_TECHNIQUE_CATEGORIES } from '@/types/StackTechnique'
/**
 * Hook pour les appels API liés aux technologies
 */
export const useStack = () => {
  // Récupérer toutes les technologies
  const getStackTechniques = useCallback(async () => {
    const response = await fetch('/api/stack-techniques')
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des technologies')
    }

    return await response.json()
  }, [])

  // Créer une nouvelle technologie
  const createStackTechnique = useCallback(async (data: {
    name: string
    slug: string
    category: string
    color?: string
  }) => {
    const response = await fetch('/api/stack-techniques', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Une erreur est survenue lors de la création')
    }

    return await response.json()
  }, [])

  // Mettre à jour une technologie
  const updateStackTechnique = useCallback(async (id: string, data: {
    name: string
    slug: string
    category: string
    color?: string
  }) => {
    const response = await fetch(`/api/stack-techniques/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Une erreur est survenue lors de la mise à jour')
    }

    return await response.json()
  }, [])

  // Supprimer une technologie
  const deleteStackTechnique = useCallback(async (id: string) => {
    const response = await fetch(`/api/stack-techniques/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Une erreur est survenue lors de la suppression')
    }

    return true
  }, [])


  return {
    getStackTechniques,
    createStackTechnique,
    updateStackTechnique,
    deleteStackTechnique
  }
}

// Hook pour organiser les technologies par catégorie
export const useTechStack = (stackTechniques: ProjectStackTechnique[]) => {
  const techsByCategory = stackTechniques.reduce((acc, { stackTechnique }) => {
    if (!acc[stackTechnique.category]) {
      acc[stackTechnique.category] = []
    }
    acc[stackTechnique.category].push(stackTechnique)
    return acc
  }, {} as Record<string, StackTechnique[]>)

  // Convertir les catégories en format objet pour compatibilité
  const categoryLabels: Record<string, string> = STACK_TECHNIQUE_CATEGORIES.reduce((acc, cat) => {
    acc[cat.value] = cat.label
    return acc
  }, {} as Record<string, string>)

  return {
    techsByCategory,
    categoryLabels
  }
}
