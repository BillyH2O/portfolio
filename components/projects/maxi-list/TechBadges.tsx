import React from 'react'
import { StackTechnique } from '@/types/StackTechnique'

// Composant pour les technologies
const TechBadges = ({ techs }: { techs: StackTechnique[] }) => (
  <div className="space-y-3">
    <div className="flex flex-wrap gap-2">
      {techs.map((tech) => (
        <span
          key={tech.id}
          className="px-3 py-1 text-xs rounded-full border border-foreground/20 text-foreground bg-white/5 hover:bg-white/10 transition-colors"
          style={{ borderColor: tech.color || 'rgba(255,255,255,0.2)' }}
        >
          {tech.name}
        </span>
      ))}
    </div>
  </div>
)

export default TechBadges
