import React from 'react'
import ArticleRenderer from '@/components/projects/detail/article/ArticleRenderer'

interface ProjectArticleProps {
  articleHtml?: string
}

const ProjectArticle = ({ articleHtml }: ProjectArticleProps) => {
  if (!articleHtml) return null

  return (
    <div className="bg-card/10 backdrop-blur-sm border border-black/10 rounded-2xl p-8 mb-16">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-black mb-8 text-center">
          À propos de ce projet
        </h3>
        <ArticleRenderer 
          content={articleHtml}
          className="max-w-none"
        />
      </div>
    </div>
  )
}

export default ProjectArticle
