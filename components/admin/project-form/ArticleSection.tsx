import React from 'react'
import ClientOnlyRichTextEditor from '@/components/admin/ClientOnlyRichTextEditor'
import type { ProjectFormData } from '@/types/Project'

interface ArticleSectionProps {
  formData: ProjectFormData
  onChange: (content: string, html: string) => void
}

const ArticleSection = ({ formData, onChange }: ArticleSectionProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Article détaillé</h2>
      <p className="text-sm text-gray-600 mb-4">
        Rédigez un article complet pour expliquer votre projet. Vous pouvez ajouter des titres, du texte formaté, des images et des liens.
      </p>
      
      <ClientOnlyRichTextEditor
        content={formData.articleContent ? JSON.stringify(formData.articleContent) : ''}
        onChange={onChange}
        placeholder="Commencez à écrire votre article... Expliquez le contexte, les défis rencontrés, les solutions apportées, les technologies utilisées en détail..."
      />
    </div>
  )
}

export default ArticleSection
