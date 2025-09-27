import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useScrollTo = () => {
  const router = useRouter()

  // Gérer le scroll au chargement de la page si il y a un hash
  useEffect(() => {
    const hash = window.location.hash.slice(1) // Enlever le #
    if (hash) {
      // Attendre que la page soit chargée avant de scroller
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    // Si on est sur la page d'accueil, on fait un scroll smooth
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    } else {
      // Si on n'est pas sur la page d'accueil, on navigue d'abord puis on scroll
      router.push(`/#${sectionId}`)
    }
  }

  const navigateToProjects = () => {
    router.push('/projects')
  }

  return { scrollToSection, navigateToProjects }
}
