import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/form-contact/select"
import type { Category } from '@/types/Category'

interface SubCategorySelectorProps {
  activeCategory: string
  activeSubCategory: string
  setActiveSubCategory: (subCategorySlug: string) => void
  categories: Category[]
  getSubCategoryCount: (subCategorySlug: string) => number
}

const SubCategorySelector = ({ 
  activeCategory,
  activeSubCategory, 
  setActiveSubCategory, 
  categories,
  getSubCategoryCount 
}: SubCategorySelectorProps) => {

  const currentCategory = categories.find(cat => cat.slug === activeCategory)
  const subCategories = currentCategory?.subCategories || []

  if (subCategories.length === 0) return null

  // Créer les options pour le sélecteur
  const options = [
    {
      value: 'all',
      label: `Tous (${getSubCategoryCount('all')})`,
      name: 'Tous'
    },
    ...subCategories
      .filter(subCategory => subCategory.slug !== 'all') // Éviter les doublons avec notre option "Tous"
      .map(subCategory => ({
        value: subCategory.slug,
        label: `${subCategory.name} (${getSubCategoryCount(subCategory.slug)})`,
        name: subCategory.name
      }))
  ]

  // Trouver l'option active pour l'affichage
  const activeOption = options.find(option => option.value === activeSubCategory)

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-secondary-foreground uppercase tracking-wider whitespace-nowrap">
        Filtrer par:
      </span>
      <Select value={activeSubCategory} onValueChange={setActiveSubCategory}>
        <SelectTrigger className="w-48 bg-card border-foreground/20 text-foreground hover:bg-white/20 focus:ring-white/20 focus:border-white/20">
          <SelectValue placeholder="Sélectionner une catégorie">
            {activeOption?.name || "Sélectionner"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-card border-foreground/20 ">
          {options.map(option => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="text-foreground hover:bg-secondary-300 focus:bg-secondary-300 cursor-pointer hover:bg-white/20 focus:ring-white/20 focus:border-white/20"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SubCategorySelector
