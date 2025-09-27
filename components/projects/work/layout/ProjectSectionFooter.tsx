import React from 'react'
import { useRouter } from 'next/navigation'
import ActionButton from '@/components/ui/ActionButton'
import { ArrowRightIcon } from '@/components/ui/icons'

// Composant pour le pied de section avec le lien vers tous les projets
const ProjectSectionFooter = () => {
  const router = useRouter()

  const handleViewAllProjects = () => {
    router.push('/projects')
  }

  return (
    <ActionButton
      onClick={handleViewAllProjects}
      icon={<ArrowRightIcon />}
      iconPosition="right"
      variant="default"
      colorMode="green"
    >
      Voir tout
    </ActionButton>
  )
}

export default ProjectSectionFooter
