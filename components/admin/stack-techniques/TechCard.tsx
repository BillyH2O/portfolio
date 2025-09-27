import React, { useState } from 'react'
import { StackTechnique, STACK_TECHNIQUE_CATEGORIES } from '@/types/StackTechnique'
import Image from 'next/image'

interface TechCardProps {
  tech: StackTechnique
  onDelete: (id: string) => Promise<void>
  onEdit: (tech: StackTechnique) => void
}

const TechCard = ({ tech, onDelete, onEdit }: TechCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${tech.name}" ?`)) {
      return
    }

    setIsDeleting(true)
    try {
      await onDelete(tech.id)
    } catch (error) {
      console.error('Error deleting tech:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la suppression'
      alert(errorMessage)
    } finally {
      setIsDeleting(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      FRONTEND: 'bg-blue-100 text-blue-800',
      BACKEND: 'bg-green-100 text-green-800',
      DATABASE: 'bg-purple-100 text-purple-800',
      DEVOPS: 'bg-yellow-100 text-yellow-800',
      DESIGN: 'bg-pink-100 text-pink-800',
      MOBILE: 'bg-indigo-100 text-indigo-800',
      OTHER: 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || colors.OTHER
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          {tech.icon && (
            <Image
              src={tech.icon}
              alt={tech.name}
              className="w-8 h-8 mr-3 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          )}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{tech.name}</h3>
            <p className="text-sm text-gray-500">{tech.slug}</p>
          </div>
        </div>
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(tech.category)}`}>
          {STACK_TECHNIQUE_CATEGORIES.find(c => c.value === tech.category)?.label || tech.category}
        </span>
      </div>

      {tech.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tech.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {tech.color && (
            <div
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: tech.color }}
              title={`Couleur: ${tech.color}`}
            />
          )}
          {tech.website && (
            <a
              href={tech.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Site web
            </a>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(tech)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Modifier
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
          >
            {isDeleting ? '...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TechCard
