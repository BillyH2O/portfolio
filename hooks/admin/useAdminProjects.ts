import { useState, useEffect } from 'react'
import type { Project } from '@/types/Project'

type ProjectStatus = 'ALL' | 'ACTIVE' | 'DRAFT' | 'ARCHIVED'

// Hook pour gérer les projets dans l'admin
export const useAdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<ProjectStatus>('ALL')

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects')
      if (!response.ok) throw new Error('Failed to fetch projects')
      const data = await response.json()
      setProjects(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = (deletedId: string) => {
    setProjects(projects.filter(p => p.id !== deletedId))
  }

  const filteredProjects = projects.filter(project => {
    if (filter === 'ALL') return true
    return project.status === filter
  })

  const statusCounts = {
    ALL: projects.length,
    ACTIVE: projects.filter(p => p.status === 'ACTIVE').length,
    DRAFT: projects.filter(p => p.status === 'DRAFT').length,
    ARCHIVED: projects.filter(p => p.status === 'ARCHIVED').length
  }

  return {
    projects: filteredProjects,
    loading,
    error,
    filter,
    setFilter,
    statusCounts,
    handleDelete,
    refetch: fetchProjects
  }
}

// Hook pour gérer la suppression d'un projet
export const useProjectDeletion = (project: Project, onDelete: (id: string) => void) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le projet "${project.name}" ?`)) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/projects/${project.slug}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        onDelete(project.id)
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Erreur lors de la suppression')
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    isDeleting,
    handleDelete
  }
}
