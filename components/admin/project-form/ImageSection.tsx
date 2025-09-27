import React from 'react'
import Image from 'next/image'
import type { ProjectFormData, ProjectImage } from '@/types/Project'
import { IMAGE_TYPE_OPTIONS } from '@/types/Project'

interface ImageSectionProps {
  formData: ProjectFormData
  onAddImage: () => void
  onRemoveImage: (index: number) => void
  onUpdateImage: (index: number, field: keyof ProjectImage, value: string | number) => void
}

const ImageSection = ({ formData, onAddImage, onRemoveImage, onUpdateImage }: ImageSectionProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Images</h2>
        <button
          type="button"
          onClick={onAddImage}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
        >
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Ajouter une image
        </button>
      </div>

      {formData.images.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 text-sm text-gray-500">Aucune image ajoutée</p>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.images.map((image, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Image {index + 1}</span>
                <button
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">URL Cloudflare *</label>
                  <input
                    type="url"
                    required
                    value={image.url}
                    onChange={(e) => onUpdateImage(index, 'url', e.target.value)}
                    placeholder="https://imagedelivery.net/..."
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={image.type}
                    onChange={(e) => onUpdateImage(index, 'type', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {IMAGE_TYPE_OPTIONS.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Alt text</label>
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => onUpdateImage(index, 'alt', e.target.value)}
                    placeholder="Description de l'image"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Largeur (px)</label>
                  <input
                    type="number"
                    value={image.width || ''}
                    onChange={(e) => onUpdateImage(index, 'width', parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hauteur (px)</label>
                  <input
                    type="number"
                    value={image.height || ''}
                    onChange={(e) => onUpdateImage(index, 'height', parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              {/* Preview */}
              {image.url && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aperçu</label>
                  <div className="relative w-32 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.alt || 'Preview'}
                      fill
                      className="object-cover"
                      onError={() => {
                        console.error('Erreur de chargement de l\'image:', image.url)
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageSection
