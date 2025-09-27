import React from 'react'
import Link from 'next/link'

interface ProjectBreadcrumbProps {
  projectName: string
}

const ProjectBreadcrumb = ({ projectName }: ProjectBreadcrumbProps) => (
  <nav className="mb-8">
    <div className="flex items-center space-x-2 text-sm">
      <Link href="/" className="text-secondary-foreground hover:text-foreground transition-colors">
        Accueil
      </Link>
      <span className="text-gray-500">/</span>
      <Link href="/projects" className="text-secondary-foreground hover:text-foreground transition-colors">
        Projets
      </Link>
      <span className="text-gray-500">/</span>
      <span className="text-foreground">{projectName}</span>
    </div>
  </nav>
)

export default ProjectBreadcrumb
