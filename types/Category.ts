export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  sortOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  subCategories: SubCategory[]
}

export interface SubCategory {
  id: string
  name: string
  slug: string
  description?: string
  sortOrder: number
  isActive: boolean
  categoryId: string
  createdAt: string
  updatedAt: string
  category?: Category
}

// Forward declaration pour éviter la référence circulaire
export interface ProjectBase {
  id: string
  name: string
  description: string
  slug: string
  status: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface ProjectCategory {
  id: string
  projectId: string
  categoryId: string
  subCategoryId?: string
  createdAt: string
  project?: ProjectBase // Type plus spécifique au lieu de any
  category: Category
  subCategory?: SubCategory
}

// Types pour les formulaires
export interface CategoryFormData {
  name: string
  slug: string
  description?: string
  sortOrder: number
  isActive: boolean
}

export interface SubCategoryFormData {
  name: string
  slug: string
  description?: string
  sortOrder: number
  isActive: boolean
  categoryId: string
}

// Constantes
export const DEFAULT_CATEGORIES = [
  {
    name: 'Intelligence Artificielle',
    slug: 'intelligence-artificielle',
    description: 'Projets liés à l\'IA et au Machine Learning',
    subCategories: [
      { name: 'Tous', slug: 'all', description: 'Tous les projets IA' },
      { name: 'Supervisée', slug: 'supervised', description: 'Apprentissage supervisé' },
      { name: 'Non supervisée', slug: 'unsupervised', description: 'Apprentissage non supervisé' },
      { name: 'Par renforcement', slug: 'reinforcement', description: 'Apprentissage par renforcement' }
    ]
  },
  {
    name: 'Applications Web',
    slug: 'applications-web',
    description: 'Projets de développement web et mobile',
    subCategories: [
      { name: 'Tous', slug: 'all', description: 'Tous les projets web' },
      { name: 'Full Stack', slug: 'full-stack', description: 'Applications complètes' },
      { name: 'Mobile', slug: 'mobile', description: 'Applications mobiles' },
      { name: 'Frontend', slug: 'frontend', description: 'Interfaces utilisateur' },
      { name: 'Design', slug: 'design', description: 'Design et UX/UI' }
    ]
  }
] as const
