import React from 'react'
import Link from 'next/link'
import type { Project } from '@/types/Project'
import ProjectCardImage from './ProjectCardImage'
import NavigationButton from '../work/button/NavigationButton'

// Composant principal
const ProjectListCard = ({ project }: { project: Project }) => {
  // Logique intégrée directement dans le composant
  const thumbnailImage = project.images.find(img => img.type === 'THUMBNAIL') || project.images[0]

  return (
    <Link href={`/projects/${project.slug}`} className="group block w-full max-w-sm mx-auto">
      <div className="border bg-blue-300/5 border-foreground/20 hover:border-foreground/30 hover:bg-blue-300/10 w-full h-[400px] backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300  flex flex-col">
        {/* Image du projet */}
        <div className="h-[200px] flex-shrink-0">
          <ProjectCardImage image={thumbnailImage} projectName={project.name} />
        </div>
        
        {/* Contenu */}
        <div className="p-4 flex flex-col flex-grow justify-between">
          {/* Titre */}
          <h3 className="text-lg font-bold text-foreground transition-colors mb-2 line-clamp-1">
            {project.name}
          </h3>
          
          {/* Description */}
          <p className="text-secondary text-sm mb-3 flex-grow overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.stackTechniques.slice(0, 3).map(({ stackTechnique }) => (
              <span
                key={stackTechnique.id}
                className="px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-500 text-xs font-medium"
              >
                {stackTechnique.name}
              </span>
            ))}
            {project.stackTechniques.length > 3 && (
              <span className="px-2 py-1 bg-gray-600/20 border border-gray-500/30 rounded-full text-secondary-foreground text-xs font-medium">
                +{project.stackTechniques.length - 3}
              </span>
            )}
          </div>
          
          {/* Bouton de navigation */}
          <div className="mt-auto">
            <NavigationButton />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectListCard
