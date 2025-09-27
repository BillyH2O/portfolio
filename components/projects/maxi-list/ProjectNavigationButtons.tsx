import React from 'react'
import { useRouter } from 'next/navigation'
import ActionButton from '@/components/ui/ActionButton'
import { HomeIcon, GridIcon } from '@/components/ui/icons'

interface ProjectNavigationButtonsProps {
  showBackToProjects?: boolean
  showBackToHome?: boolean
  variant?: 'default' | 'light'
  className?: string
}

const ProjectNavigationButtons = ({ 
  showBackToProjects = false,
  showBackToHome = false,
  variant = 'default',
  className = ''
}: ProjectNavigationButtonsProps) => {
  const router = useRouter()

  const handleBackToProjects = () => {
    router.push('/projects')
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {showBackToProjects && (
        <ActionButton
          onClick={handleBackToProjects}
          icon={<GridIcon />}
          iconPosition="left"
          variant={variant}
        >
          Tous les projets
        </ActionButton>
      )}
      
      {showBackToHome && (
        <ActionButton
          onClick={handleBackToHome}
          icon={<HomeIcon />}
          iconPosition="left"
          variant={variant}
        >
          Retour à l&apos;accueil
        </ActionButton>
      )}
    </div>
  )
}

export default ProjectNavigationButtons
