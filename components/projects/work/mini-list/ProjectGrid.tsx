import React from 'react'
import { Project } from '@/types/Project'
import ProjectCard from './ProjectCard'
import EmptyState from './EmptyState'

interface ProjectGridProps {
  projects: Project[]
  activeCategory: string
  setActiveCategory: (category: string) => void
}

const ProjectGrid = ({ projects, activeCategory, setActiveCategory}: ProjectGridProps) => {
  if (projects.length === 0) {
    return <EmptyState activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
  }

  return (
    <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-9 items-center justify-center justify-items-start">
      {projects.map((project) => {
        const thumbnailImage = project.images.find(img => img.type === 'THUMBNAIL') || project.images[0]
        
        return (
          <ProjectCard
            key={project.id}
            title={project.name}
            description={project.description}
            image={thumbnailImage?.url || '/placeholder-project.jpg'}
            slug={project.slug}
          />
        )
      })}
    </div>
  )
}

export default ProjectGrid