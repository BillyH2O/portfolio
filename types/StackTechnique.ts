// Type centralisé pour StackTechnique
export interface StackTechnique {
  id: string
  name: string
  slug: string
  category: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS' | 'DESIGN' | 'MOBILE' | 'OTHER'
  icon?: string
  color?: string
  description?: string
  website?: string
}

export const STACK_TECHNIQUE_CATEGORIES = [
  { value: 'FRONTEND' as const, label: 'Frontend' },
  { value: 'BACKEND' as const, label: 'Backend' },
  { value: 'DATABASE' as const, label: 'Base de données' },
  { value: 'DEVOPS' as const, label: 'DevOps' },
  { value: 'DESIGN' as const, label: 'Design' },
  { value: 'MOBILE' as const, label: 'Mobile' },
  { value: 'OTHER' as const, label: 'Autres' }
] as const

export type StackTechniqueCategory = typeof STACK_TECHNIQUE_CATEGORIES[number]['value']
