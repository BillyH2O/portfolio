import { prisma } from '@/lib/db'
import { ProjectImage, ProjectStatus } from '@/types/Project'
import { NextResponse } from 'next/server'

// Types pour les paramètres de la requête PUT
interface UpdateProjectBody {
  name: string
  description: string
  images?: ProjectImage[]
  stackTechniques?: string[]
  categories?: Array<{ categoryId: string; subCategoryId: string }>
  status: ProjectStatus
  articleContent?: string
  articleHtml?: string
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params
    const project = await prisma.project.findUnique({
      where: {
        slug: resolvedParams.slug,
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
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Failed to fetch project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params
    const body: UpdateProjectBody = await request.json()
    const { name, description, images, stackTechniques, categories, status, articleContent, articleHtml } = body

    const project = await prisma.project.update({
      where: { slug: resolvedParams.slug },
      data: {
        name,
        description,
        status: status as ProjectStatus,
        articleContent: articleContent ? JSON.parse(articleContent) : null,
        articleHtml: articleHtml || null,
        ...(images && {
          images: {
            deleteMany: {},
            create: images.map((img, index: number) => ({
              url: img.url,
              alt: img.alt,
              type: img.type || 'GALLERY',
              sortOrder: index,
              width: img.width,
              height: img.height
            }))
          }
        }),
        ...(stackTechniques && {
          stackTechniques: {
            deleteMany: {},
            create: stackTechniques.map((id) => ({
              stackTechnique: { connect: { id } }
            }))
          }
        }),
        ...(categories && {
          categories: {
            deleteMany: {},
            create: categories.map((cat) => ({
              category: { connect: { id: cat.categoryId } },
              subCategory: { connect: { id: cat.subCategoryId } }
            }))
          }
        })
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

    return NextResponse.json(project)
  } catch (error) {
    console.error('Failed to update project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params
    await prisma.project.delete({
      where: { slug: resolvedParams.slug }
    })

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Failed to delete project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
