"use client"

import React from 'react'
import { ProjectEditForm } from '@/components/admin/project-form'
import { useProjectActions } from '@/hooks/projects/useProjectActions'

export default function EditProject({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params)
  const { handleUpdateProject } = useProjectActions()

  return (
    <ProjectEditForm
      slug={resolvedParams.slug}
      onSubmit={(formData) => handleUpdateProject(resolvedParams.slug, formData)}
    />
  )
}
