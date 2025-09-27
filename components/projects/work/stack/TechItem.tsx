import React from 'react'
import Image from 'next/image'
import { StackTechnique } from '@/types/StackTechnique'

const TechItem = ({ tech }: { tech: StackTechnique }) => (
  <div className="flex items-center p-3 bg-card border-foreground/20 hover:border-foreground/30 hover:bg-blue-300/10 border rounded-lg transition-colors group">
    {tech.icon && (
      <div className="w-8 h-8 mr-3 relative">
        <Image
          src={tech.icon}
          alt={tech.name}
          fill
          className="object-contain"
        />
      </div>
    )}
    <div>
      <div className="text-foreground font-medium text-sm group-hover:text-blue-400 transition-colors">
        {tech.name}
      </div>
      {tech.description && (
        <div className="text-secondary-foreground text-xs mt-1 line-clamp-2">
          {tech.description}
        </div>
      )}
    </div>
  </div>
)

export default TechItem
