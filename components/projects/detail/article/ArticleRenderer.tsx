"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface ArticleRendererProps {
  content: string
  className?: string
}

export default function ArticleRenderer({ content, className = '' }: ArticleRendererProps) {
  if (!content) {
    return null
  }

  return (
    <div className={`article-content ${className}`}>
      <style jsx global>{`
        .article-content {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.7;
        }

        .article-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 2rem 0 1rem 0;
          line-height: 1.2;
        }

        .article-content h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 2rem 0 1rem 0;
          line-height: 1.3;
          border-bottom: 2px solid;
          padding-bottom: 0.5rem;
        }

        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem 0;
          line-height: 1.4;
        }

        .article-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1.25rem 0 0.5rem 0;
          line-height: 1.4;
        }

        .article-content p {
          margin: 1rem 0;
          font-size: 1.125rem;
          line-height: 1.7;
        }

        .article-content strong {
          font-weight: 600;
        }

        .article-content em {
          font-style: italic;
        }

        .article-content a {
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .article-content ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .article-content ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .article-content li {
          margin: 0.5rem 0;
          font-size: 1.125rem;
          line-height: 1.6;
        }

        .article-content ul li {
          list-style-type: disc;
        }

        .article-content ol li {
          list-style-type: decimal;
        }

        .article-content blockquote {
          margin: 2rem 0;
          padding: 1rem 1.5rem;
          border-left: 4px solid #3b82f6;
          font-style: italic;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        .article-content blockquote p {
          margin: 0;
          font-size: 1.125rem;
        }

        .article-content img {
          max-width: 100%;
          height: auto;
          margin: 2rem auto;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
          display: block;
        }

        .article-content pre {
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .article-content code {
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
          font-size: 0.875rem;
        }

        .article-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }

        .article-content hr {
          margin: 3rem 0;
          border: none;
          border-top: 2px solid;
          width: 50%;
          margin-left: auto;
          margin-right: auto;
        }

        .article-content table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .article-content th,
        .article-content td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid;
        }

        .article-content th {
          font-weight: 600;
        }

        /* Text alignment */
        .article-content [style*="text-align: center"] {
          text-align: center;
        }

        .article-content [style*="text-align: right"] {
          text-align: right;
        }

        .article-content [style*="text-align: left"] {
          text-align: left;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .article-content h1 {
            font-size: 2rem;
          }

          .article-content h2 {
            font-size: 1.75rem;
          }

          .article-content h3 {
            font-size: 1.375rem;
          }

          .article-content p,
          .article-content li {
            font-size: 1rem;
          }

          .article-content img {
            margin: 1.5rem auto;
          }

          .article-content blockquote {
            margin: 1.5rem 0;
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
      
      <div 
        className={cn(
          // Base text colors
          "text-gray-700 dark:text-gray-300",
          // Headings
          "[&_h1]:text-gray-900 [&_h1]:dark:text-white",
          "[&_h2]:text-gray-900 [&_h2]:dark:text-white [&_h2]:border-gray-200 [&_h2]:dark:border-gray-700",
          "[&_h3]:text-gray-800 [&_h3]:dark:text-white",
          "[&_h4]:text-gray-800 [&_h4]:dark:text-white",
          // Text elements
          "[&_p]:text-gray-700 [&_p]:dark:text-gray-300",
          "[&_strong]:text-gray-900 [&_strong]:dark:text-white",
          "[&_em]:text-gray-600 [&_em]:dark:text-gray-400",
          "[&_li]:text-gray-700 [&_li]:dark:text-gray-300",
          // Links
          "[&_a]:text-blue-600 [&_a]:dark:text-blue-400",
          "[&_a:hover]:text-blue-800 [&_a:hover]:dark:text-blue-300 [&_a:hover]:border-blue-600",
          // Special elements
          "[&_blockquote]:bg-gray-50 [&_blockquote]:dark:bg-white/5",
          "[&_blockquote]:text-gray-600 [&_blockquote]:dark:text-gray-400",
          "[&_pre]:bg-gray-800 [&_pre]:dark:bg-gray-900 [&_pre]:text-gray-100",
          "[&_code]:bg-gray-100 [&_code]:dark:bg-white/10",
          "[&_code]:text-gray-800 [&_code]:dark:text-gray-200",
          "[&_hr]:border-gray-200 [&_hr]:dark:border-gray-700",
          // Table elements
          "[&_th]:bg-gray-50 [&_th]:dark:bg-gray-800",
          "[&_th]:text-gray-700 [&_th]:dark:text-gray-300",
          "[&_th]:border-gray-200 [&_th]:dark:border-gray-700",
          "[&_td]:text-gray-600 [&_td]:dark:text-gray-400",
          "[&_td]:border-gray-200 [&_td]:dark:border-gray-700"
        )}
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  )
}
