import React from 'react'

const DashboardLoadingState = () => {
  return (
    <div className="min-h-screen bg-background px-4 sm:px-0">
      <div className="mb-8">
        <div className="h-8 bg-muted rounded animate-pulse mb-2"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card border border-border overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-md bg-muted animate-pulse w-12 h-12"></div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                  <div className="h-6 bg-muted rounded animate-pulse w-16"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions skeleton */}
      <div className="bg-card border border-border shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="h-6 bg-muted rounded animate-pulse mb-4 w-32"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card p-6 border border-border rounded-lg">
                <div className="p-3 bg-muted rounded-md animate-pulse w-12 h-12 mb-8"></div>
                <div className="h-6 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLoadingState
