import React from 'react'
import Link from 'next/link'
import type { Project } from '@/types/Project'
import AdminProjectCard from './AdminProjectCard'

interface AdminProjectsGridProps {
  projects: Project[]
  onDelete: (id: string) => void
  filter: string
}

// Composant pour l'état vide
const EmptyState = ({ filter }: { filter: string }) => (
  <div className="text-center py-12">
    <svg className="mx-auto h-12 w-12 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun projet</h3>
    <p className="mt-1 text-sm text-gray-500">
      {filter === 'ALL' 
        ? 'Commencez par créer votre premier projet.'
        : `Aucun projet avec le statut ${filter}.`
      }
    </p>
    <div className="mt-6">
      <Link
        href="/admin/projects/new"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-foreground bg-blue-600 hover:bg-blue-700"
      >
        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nouveau Projet
      </Link>
    </div>
  </div>
)

// Composant pour la grille de projets
const ProjectsGrid = ({ projects, onDelete }: { projects: Project[]; onDelete: (id: string) => void }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {projects.map((project) => (
      <AdminProjectCard
        key={project.id}
        project={project}
        onDelete={onDelete}
      />
    ))}
  </div>
)

// Composant principal
const AdminProjectsGrid = ({ projects, onDelete, filter }: AdminProjectsGridProps) => {
  if (projects.length === 0) {
    return <EmptyState filter={filter} />
  }

  return <ProjectsGrid projects={projects} onDelete={onDelete} />
}

export default AdminProjectsGrid
