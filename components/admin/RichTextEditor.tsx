"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'
import { useState, useEffect } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string, html: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder = "Commencez à écrire votre article..." }: RichTextEditorProps) {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3, 4]
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '', // Commencer avec du contenu vide
    immediatelyRender: false, // Fix pour l'hydratation SSR
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      const html = editor.getHTML()
      onChange(JSON.stringify(json), html)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4',
      },
    },
  })

  // Mettre à jour le contenu de l'éditeur quand le prop change
  useEffect(() => {
    if (editor && content) {
      try {
        // Si le contenu ressemble à du JSON TipTap, on le parse
        if (content.startsWith('{"type":"doc"')) {
          const parsedContent = JSON.parse(content)
          editor.commands.setContent(parsedContent)
        } else if (content.startsWith('<')) {
          // Si c'est du HTML
          editor.commands.setContent(content)
        } else {
          // Sinon, on traite comme du texte brut
          editor.commands.setContent(content)
        }
      } catch {
        // Si le parsing échoue, on utilise le contenu tel quel
        editor.commands.setContent(content)
      }
    } else if (editor && !content) {
      // Si pas de contenu, on vide l'éditeur
      editor.commands.clearContent()
    }
  }, [editor, content])

  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-md p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
      setIsImageModalOpen(false)
    }
  }

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
      setLinkUrl('')
      setIsLinkModalOpen(false)
    }
  }

  const ToolbarButton = ({ onClick, active, disabled, children, title }: {
    onClick: () => void
    active?: boolean
    disabled?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-md border text-sm font-medium transition-colors ${
        active
          ? 'bg-blue-100 border-blue-300 text-blue-700'
          : disabled
          ? 'bg-gray-100 border-gray-200 text-secondary-foreground cursor-not-allowed'
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  )

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-3">
        <div className="flex flex-wrap gap-2">
          {/* Headings */}
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              active={editor.isActive('heading', { level: 1 })}
              title="Titre 1"
            >
              H1
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              active={editor.isActive('heading', { level: 2 })}
              title="Titre 2"
            >
              H2
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              active={editor.isActive('heading', { level: 3 })}
              title="Titre 3"
            >
              H3
            </ToolbarButton>
          </div>

          {/* Text formatting */}
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive('bold')}
              title="Gras"
            >
              <strong>B</strong>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive('italic')}
              title="Italique"
            >
              <em>I</em>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              active={editor.isActive('strike')}
              title="Barré"
            >
              <s>S</s>
            </ToolbarButton>
          </div>

          {/* Lists */}
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive('bulletList')}
              title="Liste à puces"
            >
              •
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive('orderedList')}
              title="Liste numérotée"
            >
              1.
            </ToolbarButton>
          </div>

          {/* Alignment */}
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              active={editor.isActive({ textAlign: 'left' })}
              title="Aligner à gauche"
            >
              ←
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              active={editor.isActive({ textAlign: 'center' })}
              title="Centrer"
            >
              ↔
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              active={editor.isActive({ textAlign: 'right' })}
              title="Aligner à droite"
            >
              →
            </ToolbarButton>
          </div>

          {/* Media */}
          <div className="flex gap-2">
            <ToolbarButton
              onClick={() => setIsImageModalOpen(true)}
              title="Insérer une image"
            >
              🖼️
            </ToolbarButton>
            <ToolbarButton
              onClick={() => setIsLinkModalOpen(true)}
              title="Insérer un lien"
            >
              🔗
            </ToolbarButton>
          </div>

          {/* Other */}
          <div className="flex gap-2">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              active={editor.isActive('blockquote')}
              title="Citation"
            >
              “
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Ligne horizontale"
            >
              ―
            </ToolbarButton>
          </div>
        </div>
      </div>

        {/* Editor */}
        <div className="bg-white min-h-[400px] relative">
          <EditorContent editor={editor} />
          {editor.isEmpty && (
            <div className="absolute top-4 left-4 text-secondary-foreground pointer-events-none">
              {placeholder}
            </div>
          )}
        </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insérer une image</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de l&apos; image (Cloudflare, etc.)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://imagedelivery.net/..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={addImage}
                disabled={!imageUrl}
                className="px-4 py-2 bg-blue-600 text-foreground rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Insérer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insérer un lien</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL du lien
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={setLink}
                disabled={!linkUrl}
                className="px-4 py-2 bg-blue-600 text-foreground rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Insérer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
