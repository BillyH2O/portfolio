"use client"

import React, { useState } from 'react'
import { useStack } from '@/hooks/admin/useStack'
import {
  StackTechniquesHeader,
  TechFilters,
  TechGrid,
  TechForm,
  StackTechniquesErrorState
} from '@/components/admin/stack-techniques'
import { StackTechnique } from '@/types/StackTechnique'
import { Loader } from '@/components/ui/Loader'

export default function AdminStackTechniques() {
  const { stackTechniques, loading, error, refetch, saveStackTechnique, deleteStackTechnique } = useStack()
  const [filter, setFilter] = useState<string>('ALL')
  const [editingTech, setEditingTech] = useState<StackTechnique | null>(null)
  const [showForm, setShowForm] = useState(false)

  const filteredTechs = stackTechniques.filter(tech => {
    if (filter === 'ALL') return true
    return tech.category === filter
  })

  const handleSave = async (techData: Partial<StackTechnique>) => {
    try {
      await saveStackTechnique(techData, editingTech || undefined)
        setEditingTech(null)
        setShowForm(false)
    } catch (error) {
      console.error('Error saving tech:', error)
      alert('Erreur lors de la sauvegarde')
    }
  }


  if (loading) {
    return <Loader />
  }

  if (error) {
    return <StackTechniquesErrorState error={error} onRetry={refetch} />
  }

  return (
    <div className="px-4 sm:px-0">
      <StackTechniquesHeader onShowForm={() => setShowForm(true)} />
      
      <TechFilters 
        filter={filter}
        onFilterChange={setFilter}
        stackTechniques={stackTechniques}
      />

      <TechGrid
        filteredTechs={filteredTechs}
        filter={filter}
        onDelete={async (id: string) => {
          await deleteStackTechnique(id)
        }}
        onEdit={(tech) => {
          setEditingTech(tech)
          setShowForm(true)
        }}
        onShowForm={() => setShowForm(true)}
      />

      {showForm && (
        <TechForm
          tech={editingTech || undefined}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false)
            setEditingTech(null)
          }}
        />
      )}
    </div>
  )
}
