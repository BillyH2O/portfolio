import React from 'react'
import type { Project } from '@/types/Project'

interface ProjectHeaderProps {
  project: Project
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => (
  <div className="text-center mb-16">
    <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
      {project.name}
    </h1>
    <p className="text-xl text-foreground max-w-4xl mx-auto leading-relaxed">
      {project.description}
    </p>
  </div>
)

export default ProjectHeader
