import React from 'react'

// Composant pour le bouton de navigation
const NavigationButton = () => (
  <div className="mt-6 flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
    <span className="text-sm font-medium">Voir le projet</span>
    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
)

export default NavigationButton
