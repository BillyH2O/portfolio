import React from 'react'
import Link from 'next/link'
import type { ProjectFormData } from '@/types/Project'
import type { StackTechnique } from '@/types/StackTechnique'  

interface StackTechniqueSectionProps {
  formData: ProjectFormData
  stackTechniques: StackTechnique[]
  onToggle: (techId: string) => void
}

const StackTechniqueSection = ({ formData, stackTechniques, onToggle }: StackTechniqueSectionProps) => {
  // Group stack techniques by category
  const stackTechsByCategory = stackTechniques.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = []
    }
    acc[tech.category].push(tech)
    return acc
  }, {} as Record<string, StackTechnique[]>)

  // Labels des catégories
  const categoryLabelsRecord: Record<string, string> = {
    'FRONTEND': 'Frontend',
    'BACKEND': 'Backend', 
    'DATABASE': 'Base de données',
    'DEVOPS': 'DevOps',
    'DESIGN': 'Design',
    'MOBILE': 'Mobile',
    'OTHER': 'Autres'
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Technologies utilisées</h2>
      
      {Object.keys(stackTechsByCategory).length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">Aucune technologie disponible</p>
          <Link
            href="/admin/stack-techniques"
            className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
          >
            Ajouter des technologies
            <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(stackTechsByCategory).map(([category, techs]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                {categoryLabelsRecord[category] || category}
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {techs.map((tech) => (
                  <label
                    key={tech.id}
                    className="relative flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.stackTechniques.includes(tech.id)}
                      onChange={() => onToggle(tech.id)}
                      className="sr-only"
                    />
                    <div className={`flex-1 flex items-center ${
                      formData.stackTechniques.includes(tech.id)
                        ? 'text-blue-900 bg-blue-50 border-blue-200'
                        : 'text-gray-900'
                    }`}>
                      <span className="text-sm font-medium">{tech.name}</span>
                    </div>
                    {formData.stackTechniques.includes(tech.id) && (
                      <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StackTechniqueSection
