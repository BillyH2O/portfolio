'use client'

import React from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex justify-center items-center gap-8">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin" className="text-xl font-bold text-foreground">
                  Admin Panel
                </Link>
              </div>
              
              {/* Navigation Links */}
              <div className="hidden sm:flex justify-center items-center gap-2">
                <Link
                  href="/admin"
                  className="border-transparent text-muted-foreground hover:text-foreground hover:border-border whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/projects"
                  className="border-transparent text-muted-foreground hover:text-foreground hover:border-border whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors"
                >
                  Projets
                </Link>
                <Link
                  href="/admin/stack-techniques"
                  className="border-transparent text-muted-foreground hover:text-foreground hover:border-border whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors"
                >
                  Technologies
                </Link>
                <Link
                  href="/admin/categories"
                  className="border-transparent text-muted-foreground hover:text-foreground hover:border-border whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors"
                >
                  Catégories
                </Link>
              </div>
            </div>
            
            {/* Right side */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/"
                className="text-primary hover:text-primary/80 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Voir le site
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
