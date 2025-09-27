import { useState, useEffect } from 'react'

// Types pour les stats
export interface AdminStats {
  totalProjects: number
  activeProjects: number
  totalTechnologies: number
  totalImages: number
}

/**
 * Hook pour récupérer les statistiques du dashboard admin
 */
export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalProjects: 0,
    activeProjects: 0,
    totalTechnologies: 0,
    totalImages: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      const [projectsRes, stackRes] = await Promise.all([
        fetch('/api/projects', { cache: 'no-store' }),
        fetch('/api/stack-techniques', { cache: 'no-store' })
      ])

      if (!projectsRes.ok || !stackRes.ok) {
        throw new Error('Failed to fetch stats')
      }

      const projects = await projectsRes.json()
      const stackTechniques = await stackRes.json()

      const totalImages = projects.reduce((acc: number, project: { images: unknown[] }) => acc + project.images.length, 0)

      setStats({
        totalProjects: projects.length,
        activeProjects: projects.filter((p: { status: string }) => p.status === 'ACTIVE').length,
        totalTechnologies: stackTechniques.length,
        totalImages
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setStats({
        totalProjects: 0,
        activeProjects: 0,
        totalTechnologies: 0,
        totalImages: 0
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  }
}
