import React from 'react'
import { StackTechnique } from '@/types/StackTechnique'
import TechItem from './TechItem'

interface TechCategoryProps {
  techs: StackTechnique[]
  label: string
}

const TechCategory = ({ techs, label }: TechCategoryProps) => (
  <div>
    <h4 className="text-lg font-semibold text-secondary mb-3">
      {label}
    </h4>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {techs.map((tech) => (
        <TechItem key={tech.id} tech={tech} />
      ))}
    </div>
  </div>
)

export default TechCategory
