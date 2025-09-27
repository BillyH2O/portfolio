import React from 'react'

interface DashboardErrorStateProps {
  error: string
  onRetry: () => void
}

const DashboardErrorState = ({ error, onRetry }: DashboardErrorStateProps) => {
  return (
    <div className="min-h-screen bg-background px-4 sm:px-0">
      <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-md p-4">
        <div className="flex">
          <svg className="h-5 w-5 text-red-400 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Erreur de chargement</h3>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
            <div className="mt-4">
              <button
                onClick={onRetry}
                className="bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-800 dark:text-red-200 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardErrorState
