import React from 'react'
import Link from 'next/link'

// Composant pour le titre et la description
const HeaderContent = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-900">Gestion des Projets</h1>
    <p className="mt-1 text-sm text-gray-600">
      Créez, modifiez et organisez vos projets
    </p>
  </div>
)

// Composant pour le bouton d'action
const NewProjectButton = () => (
  <div className="mt-4 sm:mt-0">
    <Link
      href="/admin/projects/new"
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-foreground bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Nouveau Projet
    </Link>
  </div>
)

// Composant principal
const AdminProjectsHeader = () => {
  return (
    <div className="sm:flex sm:items-center sm:justify-between mb-8">
      <HeaderContent />
      <NewProjectButton />
    </div>
  )
}

export default AdminProjectsHeader
