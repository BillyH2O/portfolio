import { prisma } from '@/lib/db'
import { ProjectImage } from '@/types/Project'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        status: 'ACTIVE'
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        stackTechniques: {
          include: {
            stackTechnique: true
          },
          orderBy: {
            stackTechnique: {
              category: 'asc'
            }
          }
        },
        categories: {
          include: {
            category: true,
            subCategory: true
          }
        }
      },
      orderBy: { sortOrder: 'asc' }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, slug, images, stackTechniques, categories, articleContent, articleHtml } = body

    const project = await prisma.project.create({
      data: {
        name,
        description,
        slug,
        articleContent: articleContent ? JSON.parse(articleContent) : null,
        articleHtml: articleHtml || null,
        images: images ? {
          create: images.map((img: ProjectImage, index: number) => ({
            url: img.url,
            alt: img.alt,
            type: img.type || 'GALLERY',
            sortOrder: index,
            width: img.width,
            height: img.height
          }))
        } : undefined,
        stackTechniques: stackTechniques ? {
          create: stackTechniques.map((id: string) => ({
            stackTechnique: { connect: { id } }
          }))
        } : undefined,
        categories: categories ? {
          create: categories.map((cat: { categoryId: string; subCategoryId: string }) => ({
            category: { connect: { id: cat.categoryId } },
            subCategory: { connect: { id: cat.subCategoryId } }
          }))
        } : undefined
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        stackTechniques: {
          include: {
            stackTechnique: true
          }
        },
        categories: {
          include: {
            category: true,
            subCategory: true
          }
        }
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
