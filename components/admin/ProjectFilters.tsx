import React from 'react'

type ProjectStatus = 'ALL' | 'ACTIVE' | 'DRAFT' | 'ARCHIVED'

interface ProjectFiltersProps {
  filter: ProjectStatus
  setFilter: (filter: ProjectStatus) => void
  statusCounts: Record<ProjectStatus, number>
}

// Composant pour un bouton de filtre
const FilterButton = ({ 
  status, 
  count, 
  isActive, 
  onClick 
}: { 
  status: ProjectStatus
  count: number
  isActive: boolean
  onClick: () => void 
}) => {
  const getLabel = (status: ProjectStatus) => {
    const labels = {
      ALL: 'Tous',
      ACTIVE: 'ACTIVE',
      DRAFT: 'DRAFT',
      ARCHIVED: 'ARCHIVED'
    }
    return labels[status]
  }

  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
        isActive
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {getLabel(status)} ({count})
    </button>
  )
}

// Composant principal
const ProjectFilters = ({ filter, setFilter, statusCounts }: ProjectFiltersProps) => {
  return (
    <div className="mb-6">
      <nav className="flex space-x-8" aria-label="Tabs">
        {Object.entries(statusCounts).map(([status, count]) => (
          <FilterButton
            key={status}
            status={status as ProjectStatus}
            count={count}
            isActive={filter === status}
            onClick={() => setFilter(status as ProjectStatus)}
          />
        ))}
      </nav>
    </div>
  )
}

export default ProjectFilters
