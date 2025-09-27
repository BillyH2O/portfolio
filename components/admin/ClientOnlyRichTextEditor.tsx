"use client"

import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

// Import dynamique pour éviter les problèmes SSR
const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-gray-300 rounded-md p-4">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  )
})

type RichTextEditorProps = ComponentProps<typeof RichTextEditor>

export default function ClientOnlyRichTextEditor(props: RichTextEditorProps) {
  return <RichTextEditor {...props} />
}
