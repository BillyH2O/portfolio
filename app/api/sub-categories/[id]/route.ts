import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Récupérer une sous-catégorie spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const { id } = resolvedParams

    const subCategory = await prisma.subCategory.findUnique({
      where: { id },
      include: {
        category: true,
        _count: {
          select: {
            projects: true
          }
        }
      }
    })

    if (!subCategory) {
      return NextResponse.json(
        { error: 'Sub-category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(subCategory)
  } catch (error) {
    console.error('Error fetching sub-category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sub-category' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour une sous-catégorie
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const { id } = resolvedParams
    const body = await request.json()
    const { name, slug, description, sortOrder, isActive, categoryId } = body

    // Vérifier si la sous-catégorie existe
    const existingSubCategory = await prisma.subCategory.findUnique({
      where: { id }
    })

    if (!existingSubCategory) {
      return NextResponse.json(
        { error: 'Sub-category not found' },
        { status: 404 }
      )
    }

    // Vérifier si le slug existe déjà dans cette catégorie (sauf pour la sous-catégorie actuelle)
    if (slug !== existingSubCategory.slug) {
      const slugExists = await prisma.subCategory.findUnique({
        where: {
          categoryId_slug: {
            categoryId: categoryId || existingSubCategory.categoryId,
            slug
          }
        }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'Une sous-catégorie avec ce slug existe déjà dans cette catégorie' },
          { status: 409 }
        )
      }
    }

    const subCategory = await prisma.subCategory.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        sortOrder,
        isActive,
        ...(categoryId && { categoryId })
      },
      include: {
        category: true,
        _count: {
          select: {
            projects: true
          }
        }
      }
    })

    return NextResponse.json(subCategory)
  } catch (error) {
    console.error('Error updating sub-category:', error)
    return NextResponse.json(
      { error: 'Failed to update sub-category' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une sous-catégorie
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const { id } = resolvedParams

    // Vérifier si la sous-catégorie existe
    const existingSubCategory = await prisma.subCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            projects: true
          }
        }
      }
    })

    if (!existingSubCategory) {
      return NextResponse.json(
        { error: 'Sub-category not found' },
        { status: 404 }
      )
    }

    // Vérifier s'il y a des projets associés
    if (existingSubCategory._count.projects > 0) {
      return NextResponse.json(
        { error: 'Cannot delete sub-category with associated projects' },
        { status: 409 }
      )
    }

    await prisma.subCategory.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Sub-category deleted successfully' })
  } catch (error) {
    console.error('Error deleting sub-category:', error)
    return NextResponse.json(
      { error: 'Failed to delete sub-category' },
      { status: 500 }
    )
  }
}
