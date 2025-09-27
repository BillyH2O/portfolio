import React from 'react'
import Link from 'next/link'

interface QuickActionCardProps {
  href: string
  title: string
  description: string
  icon: React.ReactNode
  bgColor: string
  textColor: string
}

const QuickActionCard = ({ 
  href, 
  title, 
  description, 
  icon, 
  bgColor, 
  textColor 
}: QuickActionCardProps) => {
  return (
    <Link
      href={href}
      className="relative group bg-card p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 border border-border rounded-lg hover:shadow-md transition-shadow"
    >
      <div>
        <span className={`rounded-lg inline-flex p-3 ${bgColor} ${textColor} ring-4 ring-card`}>
          {icon}
        </span>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium text-foreground">
          <span className="absolute inset-0" aria-hidden="true" />
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </Link>
  )
}

export default QuickActionCard
