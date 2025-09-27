import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/types/Project'
import { useProjectDeletion } from '@/hooks/admin/useAdminProjects'

interface AdminProjectCardProps {
  project: Project
  onDelete: (id: string) => void
}

// Hook pour les données de la card
const useAdminProjectCard = (project: Project) => {
  const thumbnailImage = project.images.find(img => img.type === 'THUMBNAIL') || project.images[0]

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIVE: 'bg-green-100 text-green-800',
      DRAFT: 'bg-yellow-100 text-yellow-800',
      ARCHIVED: 'bg-gray-100 text-gray-800'
    }
    return styles[status as keyof typeof styles] || styles.DRAFT
  }

  return {
    thumbnailImage,
    getStatusBadge
  }
}

// Composant pour l'image du projet
const ProjectImage = ({ image }: { image?: { url: string; alt: string } }) => {
  if (!image) {
    return (
      <div className="bg-gray-200 flex items-center justify-center h-full">
        <svg className="h-12 w-12 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <Image
      src={image.url}
      alt={image.alt}
      fill
      className="object-cover"
    />
  )
}

// Composant pour le header de la card
const ProjectHeader = ({ project, getStatusBadge }: { project: Project; getStatusBadge: (status: string) => string }) => (
  <div className="flex items-center justify-between mb-2">
    <h3 className="text-lg font-medium text-gray-900 truncate">{project.name}</h3>
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(project.status)}`}>
      {project.status}
    </span>
  </div>
)

// Composant pour les technologies
const TechBadges = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap gap-1 mb-4">
    {project.stackTechniques.slice(0, 3).map(({ stackTechnique }) => (
      <span
        key={stackTechnique.id}
        className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
      >
        {stackTechnique.name}
      </span>
    ))}
    {project.stackTechniques.length > 3 && (
      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
        +{project.stackTechniques.length - 3}
      </span>
    )}
  </div>
)

// Composant pour les informations du projet
const ProjectInfo = ({ project }: { project: Project }) => (
  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
    <span>{project.images.length} image(s)</span>
    <span>Ordre: {project.sortOrder}</span>
  </div>
)

// Composant pour les boutons d'action
const ActionButtons = ({ 
  project, 
  isDeleting, 
  onDelete 
}: { 
  project: Project
  isDeleting: boolean
  onDelete: () => void 
}) => (
  <div className="flex space-x-2">
    <Link
      href={`/admin/projects/${project.slug}/edit`}
      className="flex-1 bg-blue-600 text-foreground text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
    >
      Modifier
    </Link>
    <Link
      href={`/projects/${project.slug}`}
      target="_blank"
      className="flex-1 bg-gray-600 text-foreground text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
    >
      Voir
    </Link>
    <button
      onClick={onDelete}
      disabled={isDeleting}
      className="bg-red-600 text-foreground py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
    >
      {isDeleting ? '...' : 'Suppr.'}
    </button>
  </div>
)

// Composant principal
const AdminProjectCard = ({ project, onDelete }: AdminProjectCardProps) => {
  const { thumbnailImage, getStatusBadge } = useAdminProjectCard(project)
  const { isDeleting, handleDelete } = useProjectDeletion(project, onDelete)

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="aspect-w-16 aspect-h-9 relative h-48">
        <ProjectImage image={thumbnailImage} />
      </div>
      
      <div className="p-6">
        <ProjectHeader project={project} getStatusBadge={getStatusBadge} />
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        
        <TechBadges project={project} />
        
        <ProjectInfo project={project} />
        
        <ActionButtons 
          project={project}
          isDeleting={isDeleting}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default AdminProjectCard
