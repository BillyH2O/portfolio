import React from 'react'
import TechCard from './TechCard'
import { StackTechnique, STACK_TECHNIQUE_CATEGORIES } from '@/types/StackTechnique'

interface TechGridProps {
  filteredTechs: StackTechnique[]
  filter: string
  onDelete: (id: string) => Promise<void>
  onEdit: (tech: StackTechnique) => void
  onShowForm: () => void
}

const EmptyState = ({ filter, onShowForm }: { filter: string; onShowForm: () => void }) => (
  <div className="text-center py-12">
    <svg className="mx-auto h-12 w-12 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune technologie</h3>
    <p className="mt-1 text-sm text-gray-500">
      {filter === 'ALL' 
        ? 'Commencez par ajouter votre première technologie.'
        : `Aucune technologie dans la catégorie ${STACK_TECHNIQUE_CATEGORIES.find(c => c.value === filter)?.label}.`
      }
    </p>
    <div className="mt-6">
      <button
        onClick={onShowForm}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-foreground bg-blue-600 hover:bg-blue-700"
      >
        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Nouvelle technologie
      </button>
    </div>
  </div>
)

const TechGrid = ({ filteredTechs, filter, onDelete, onEdit, onShowForm }: TechGridProps) => {
  if (filteredTechs.length === 0) {
    return <EmptyState filter={filter} onShowForm={onShowForm} />
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredTechs.map((tech) => (
        <TechCard
          key={tech.id}
          tech={tech}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default TechGrid
