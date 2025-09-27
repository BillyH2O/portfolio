import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Hook personnalisé pour la navigation dans l'interface d'administration
 */
export const useAdminNavigation = () => {
  const router = useRouter()

  // Navigation vers les pages de projets
  const navigateToProjects = useCallback(() => {
    router.push('/admin/projects')
  }, [router])

  const navigateToNewProject = useCallback(() => {
    router.push('/admin/projects/new')
  }, [router])

  const navigateToEditProject = useCallback((slug: string) => {
    router.push(`/admin/projects/${slug}/edit`)
  }, [router])

  // Navigation vers les pages de technologies
  const navigateToStackTechniques = useCallback(() => {
    router.push('/admin/stack-techniques')
  }, [router])

  // Navigation générale
  const navigateToAdmin = useCallback(() => {
    router.push('/admin')
  }, [router])

  const navigateBack = useCallback(() => {
    router.back()
  }, [router])

  // Fonction générique pour naviguer vers n'importe quelle route
  const navigateTo = useCallback((path: string) => {
    router.push(path)
  }, [router])

  // Fonction pour remplacer l'URL actuelle
  const replaceTo = useCallback((path: string) => {
    router.replace(path)
  }, [router])

  return {
    // Navigation spécifique aux projets
    navigateToProjects,
    navigateToNewProject,
    navigateToEditProject,
    
    // Navigation spécifique aux technologies
    navigateToStackTechniques,
    
    // Navigation générale
    navigateToAdmin,
    navigateBack,
    navigateTo,
    replaceTo,
    
    // Accès direct au router pour des cas avancés
    router
  }
}
