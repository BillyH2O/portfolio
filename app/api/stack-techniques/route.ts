import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const stackTechniques = await prisma.stackTechnique.findMany({
      orderBy: [
        { category: 'asc' },
        { name: 'asc' }
      ]
    })

    return NextResponse.json(stackTechniques)
  } catch (error) {
    console.error('Failed to fetch stack techniques:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stack techniques' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, icon, color, category, description, website } = body

    const stackTechnique = await prisma.stackTechnique.create({
      data: {
        name,
        slug,
        icon,
        color,
        category,
        description,
        website
      }
    })

    return NextResponse.json(stackTechnique, { status: 201 })
  } catch (error) {
    console.error('Failed to create stack technique:', error)
    return NextResponse.json(
      { error: 'Failed to create stack technique' },
      { status: 500 }
    )
  }
}
