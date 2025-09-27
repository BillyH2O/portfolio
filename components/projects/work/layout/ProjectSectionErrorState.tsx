import React from 'react'
import ProjectSectionHeader from './ProjectSectionHeader'

// Composant pour l'état d'erreur de la section projets
const ProjectSectionErrorState = ({ error }: { error: string }) => {
  return (
    <div className='w-full py-40 border-b border-foreground/20'>
      <div className='flex flex-col items-center justify-center gap-[100px]'>
        <ProjectSectionHeader />
        
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Erreur de chargement</h3>
          <p className="text-secondary-foreground mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-foreground rounded-lg transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectSectionErrorState
