import React from 'react'

interface StackTechniquesHeaderProps {
  onShowForm: () => void
}

const StackTechniquesHeader = ({ onShowForm }: StackTechniquesHeaderProps) => {
  return (
    <div className="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Technologies</h1>
        <p className="mt-1 text-sm text-gray-600">
          Gérez les technologies disponibles pour vos projets
        </p>
      </div>
      <div className="mt-4 sm:mt-0">
        <button
          onClick={onShowForm}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-foreground bg-blue-600 hover:bg-blue-700"
        >
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nouvelle technologie
        </button>
      </div>
    </div>
  )
}

export default StackTechniquesHeader
