import React from 'react'
import ProjectListCard from '@/components/projects/maxi-list/ProjectListCard'
import type { Project } from '@/types/Project'

interface ProjectsGridProps {
  projects: Project[]
}

const ProjectsGrid = ({ projects }: ProjectsGridProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
    {projects.map((project) => (
      <ProjectListCard key={project.id} project={project} />
    ))}
  </div>
)

export default ProjectsGrid
