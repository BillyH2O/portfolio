import React from 'react'
import { CategoryCard } from './CategoryCard'
import type { Category } from '@/types/Category'

type Props = {
    setActiveCategory: (category: string) => void
    categories: Category[]
}

const CategoryButtons = ({ setActiveCategory, categories }: Props) => {
  
    const handleCategoryClick = (categorySlug: string) => {
        setActiveCategory(categorySlug)
        console.log(categorySlug)
    }

    // Configuration des couleurs et images pour chaque catégorie
    const getCategoryConfig = (categorySlug: string) => {
        switch (categorySlug) {
            case 'intelligence-artificielle':
                return {
                    image: "/blue.png",
                    image_shine: "/shine_blue.png", 
                    color: "0ea5e9",
                    description: "ML, DL, Chatbot, Automatisation"
                }
            case 'applications-web':
                return {
                    image: "/yellow.png",
                    image_shine: "/shine_yellow.png",
                    color: "D7C10D", 
                    description: "UX, UI, Site internet, Full-stack, SAAS"
                }
            default:
                return {
                    image: "/blue.png",
                    image_shine: "/shine_blue.png",
                    color: "6366f1",
                    description: "Projets divers"
                }
        }
    }

  return (
    <div className='flex flex-col md:flex-row gap-32 md:gap-20 overflow-visible'>
        {categories.map(category => {
            const config = getCategoryConfig(category.slug)
            return (
                <CategoryCard 
                    key={category.id}
                    onClick={() => handleCategoryClick(category.slug)} 
                    label={category.name} 
                    image={config.image}
                    image_shine={config.image_shine}
                    description={config.description}
                    color={config.color}
                />
            )
        })}
    </div>
  )
}

export default CategoryButtons