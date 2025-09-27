"use client"

import React from 'react'
import { useAdminProjects } from '@/hooks/admin/useAdminProjects'
import AdminProjectsHeader from '@/components/admin/AdminProjectsHeader'
import ProjectFilters from '@/components/admin/ProjectFilters'
import AdminProjectsGrid from '@/components/admin/AdminProjectsGrid'
import AdminErrorState from '@/components/admin/AdminErrorState'
import { Loader } from '@/components/ui/Loader'

// Composant principal refactorisé
export default function AdminProjects() {
  const {
    projects,
    loading,
    error,
    filter,
    setFilter,
    statusCounts,
    handleDelete
  } = useAdminProjects()

  // États de chargement et d'erreur
  if (loading) {
    return <Loader/>
  }

  if (error) {
    return <AdminErrorState error={error} />
  }

  // Interface principale
  return (
    <div className="px-4 sm:px-0">
      <AdminProjectsHeader />
      
      <ProjectFilters 
        filter={filter}
        setFilter={setFilter}
        statusCounts={statusCounts}
      />

      <AdminProjectsGrid 
        projects={projects}
        onDelete={handleDelete}
        filter={filter}
      />
    </div>
  )
}
