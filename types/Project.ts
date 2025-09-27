import { StackTechnique } from './StackTechnique'
import { ProjectCategory } from './Category'

// Types pour le contenu d'article (Rich Text Editor)
export interface ArticleContent {
  type?: string
  content?: ArticleContent[]
  text?: string
  marks?: Array<{
    type: string
    attrs?: Record<string, unknown>
  }>
  attrs?: Record<string, unknown>
}

export type ArticleContentData = ArticleContent | Record<string, unknown> | null

export interface ProjectImage {
  id: string
  url: string
  alt: string
  type: 'THUMBNAIL' | 'HERO' | 'GALLERY' | 'SCREENSHOT' | 'MOCKUP'
  sortOrder: number
  width?: number
  height?: number
}

export interface ProjectStackTechnique {
  stackTechnique: StackTechnique
}

export interface Project {
  id: string
  name: string
  description: string
  slug: string
  status: string
  sortOrder: number
  createdAt: string
  updatedAt: string
  images: ProjectImage[]
  stackTechniques: ProjectStackTechnique[]
  categories?: ProjectCategory[]
  articleContent?: ArticleContentData
  articleHtml?: string
}

// Types pour les formulaires
export interface ProjectFormData {
  name: string
  description: string
  slug: string
  status: string
  sortOrder: number
  images: Omit<ProjectImage, 'id'>[]
  stackTechniques: string[] // IDs des stack techniques
  categories?: Array<{ categoryId: string; subCategoryId: string }> // Catégories et sous-catégories
  articleContent?: ArticleContentData
}

// Constantes liées aux projets
export const PROJECT_STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Actif' },
  { value: 'ARCHIVED', label: 'Archivé' },
  { value: 'DRAFT', label: 'Brouillon' }
] as const

export const IMAGE_TYPE_OPTIONS = [
  { value: 'THUMBNAIL', label: 'Miniature' },
  { value: 'HERO', label: 'Image principale' },
  { value: 'GALLERY', label: 'Galerie' },
  { value: 'SCREENSHOT', label: 'Capture d\'écran' },
  { value: 'MOCKUP', label: 'Maquette' }
] as const

export type ProjectStatus = typeof PROJECT_STATUS_OPTIONS[number]['value']
export type ImageType = typeof IMAGE_TYPE_OPTIONS[number]['value']
