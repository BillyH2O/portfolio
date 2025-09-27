import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Récupérer toutes les sous-catégories d'une catégorie
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const { id } = resolvedParams

    const subCategories = await prisma.subCategory.findMany({
      where: { 
        categoryId: id,
        isActive: true 
      },
      include: {
        category: true,
        _count: {
          select: {
            projects: true
          }
        }
      },
      orderBy: { sortOrder: 'asc' }
    })

    return NextResponse.json(subCategories)
  } catch (error) {
    console.error('Error fetching sub-categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sub-categories' },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle sous-catégorie
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const { id: categoryId } = resolvedParams
    const body = await request.json()
    const { name, slug, description, sortOrder, isActive } = body

    // Vérifier si la catégorie parent existe
    const parentCategory = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!parentCategory) {
      return NextResponse.json(
        { error: 'Parent category not found' },
        { status: 404 }
      )
    }

    // Vérifier si le slug existe déjà dans cette catégorie
    const existingSubCategory = await prisma.subCategory.findUnique({
      where: {
        categoryId_slug: {
          categoryId,
          slug
        }
      }
    })

    if (existingSubCategory) {
      return NextResponse.json(
        { error: 'Une sous-catégorie avec ce slug existe déjà dans cette catégorie' },
        { status: 409 }
      )
    }

    const subCategory = await prisma.subCategory.create({
      data: {
        name,
        slug,
        description,
        sortOrder: sortOrder || 0,
        isActive: isActive ?? true,
        categoryId
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

    return NextResponse.json(subCategory, { status: 201 })
  } catch (error) {
    console.error('Error creating sub-category:', error)
    return NextResponse.json(
      { error: 'Failed to create sub-category' },
      { status: 500 }
    )
  }
}
