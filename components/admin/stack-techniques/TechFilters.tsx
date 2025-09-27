import React from 'react'
import { STACK_TECHNIQUE_CATEGORIES, StackTechnique } from '@/types/StackTechnique'

interface TechFiltersProps {
  filter: string
  onFilterChange: (filter: string) => void
  stackTechniques: StackTechnique[]
}

const TechFilters = ({ filter, onFilterChange, stackTechniques }: TechFiltersProps) => {
  const categoryCount = (category: string) => {
    if (category === 'ALL') return stackTechniques.length
    return stackTechniques.filter(t => t.category === category).length
  }

  return (
    <div className="mb-6">
      <nav className="flex space-x-8" aria-label="Tabs">
        <button
          onClick={() => onFilterChange('ALL')}
          className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
            filter === 'ALL'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Toutes ({categoryCount('ALL')})
        </button>
        {STACK_TECHNIQUE_CATEGORIES.map(category => (
          <button
            key={category.value}
            onClick={() => onFilterChange(category.value)}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              filter === category.value
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {category.label} ({categoryCount(category.value)})
          </button>
        ))}
      </nav>
    </div>
  )
}

export default TechFilters
