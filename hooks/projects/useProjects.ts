import { useState, useEffect, useCallback } from 'react'
import { Project } from '@/types/Project'

// Hook pour récupérer tous les projets
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects`, {
        cache: 'no-store'
      })
      
      if (!res.ok) {
        throw new Error('Failed to fetch projects')
      }
      
      const data = await res.json()
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

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  }
}

// Hook pour récupérer un projet spécifique
export const useProject = (slug: string) => {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProject = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/projects/${slug}`, {
        cache: 'no-store'
      })
      
      if (!res.ok) {
        if (res.status === 404) {
          setError('Project not found')
        } else {
          throw new Error('Failed to fetch project')
        }
        return
      }
      
      const data = await res.json()
      setProject(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setProject(null)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    if (slug) {
      fetchProject()
    }
  }, [slug, fetchProject])

  return {
    project,
    loading,
    error,
    refetch: fetchProject
  }
}
