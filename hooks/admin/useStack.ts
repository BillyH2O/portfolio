import { useState, useEffect } from 'react'
import { StackTechnique } from '@/types/StackTechnique'

/**
 * Hook pour gérer les technologies de stack
 */
export const useStack = () => {
  const [stackTechniques, setStackTechniques] = useState<StackTechnique[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStackTechniques = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/stack-techniques')
      if (!response.ok) throw new Error('Failed to fetch stack techniques')
      
      const data = await response.json()
      setStackTechniques(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStackTechniques()
  }, [])

  const deleteStackTechnique = async (id: string) => {
    const response = await fetch(`/api/stack-techniques/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Erreur lors de la suppression')
    }

    const data = await response.json()
    alert(data.message || 'Technologie supprimée avec succès')

    // Mise à jour locale
    setStackTechniques(techs => techs.filter(t => t.id !== id))
    return true
  }

  const saveStackTechnique = async (techData: Partial<StackTechnique>, editingTech?: StackTechnique) => {
    const url = editingTech 
      ? `/api/stack-techniques/${editingTech.id}`
      : '/api/stack-techniques'
    
    const response = await fetch(url, {
      method: editingTech ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(techData)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Une erreur est survenue')
    }

    const savedTech = await response.json()
    
    // Mise à jour locale
    if (editingTech) {
      setStackTechniques(techs => 
        techs.map(t => t.id === editingTech.id ? savedTech : t)
      )
    } else {
      setStackTechniques(techs => [...techs, savedTech])
    }

    return savedTech
  }

  const handleDelete = (deletedId: string) => {
    setStackTechniques(techs => techs.filter(t => t.id !== deletedId))
  }

  return {
    stackTechniques,
    loading,
    error,
    refetch: fetchStackTechniques,
    deleteStackTechnique,
    saveStackTechnique,
    handleDelete
  }
}
