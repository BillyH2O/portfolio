"use client"

import React from 'react'
import { ProjectForm } from '@/components/admin/project-form'
import { useProjectActions } from '@/hooks/projects/useProjectActions'

export default function NewProject() {
  const { handleCreateProject } = useProjectActions()

  return (
    <ProjectForm
      title="Nouveau Projet"
      description="Créez un nouveau projet avec ses images et technologies"
      onSubmit={handleCreateProject}
    />
  )
}
