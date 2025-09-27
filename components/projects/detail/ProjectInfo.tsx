import React from 'react'
import type { Project } from '@/types/Project'

interface ProjectInfoProps {
  project: Project
}

const ProjectInfo = ({ project }: ProjectInfoProps) => (
  <div className="flex flex-col gap-6 backdrop-blur-sm border border-foreground/10 rounded-2xl p-8 mb-16"> 
    {/* Technologies */}
    <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Technologies utilisées</h2>
        <div className="flex flex-wrap gap-2">
          {project.stackTechniques.map(({ stackTechnique }) => (
            <span
              key={stackTechnique.id}
              className="px-3 py-1 bg-blue-600/20 border border-blue-600/30 rounded-full text-blue-500 text-sm font-medium"
            >
              {stackTechnique.name}
            </span>
          ))}
        </div>
      </div>
    
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-secondary-foreground text-sm uppercase tracking-wider mb-2">Date de création</h4>
        <p className="text-foreground">
          {new Date(project.createdAt).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
      <div>
        <h4 className="text-secondary-foreground text-sm uppercase tracking-wider mb-2">Statut</h4>
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'ACTIVE' 
            ? 'bg-green-500/20 text-green-400 border border-green-600/30' 
            : 'bg-gray-500/20 text-secondary-foreground border border-gray-500/30'
        }`}>
          {project.status === 'ACTIVE' ? 'Actif' : project.status}
        </span>
      </div>
    </div>    
  </div>
)

export default ProjectInfo
