import React from 'react'

const ProjectsEmptyState = () => (
  <div className="text-center py-20">
    <div className="text-secondary-foreground mb-4">
      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">Aucun projet trouvé</h3>
    <p className="text-secondary-foreground">Les projets seront bientôt disponibles.</p>
  </div>
)

export default ProjectsEmptyState
