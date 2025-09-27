import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const body = await request.json()
    const { name, slug, icon, color, category, description, website } = body

    const stackTechnique = await prisma.stackTechnique.update({
      where: { id: resolvedParams.id },
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

    return NextResponse.json(stackTechnique)
  } catch (error) {
    console.error('Failed to update stack technique:', error)
    return NextResponse.json(
      { error: 'Failed to update stack technique' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    
    // Vérifier combien de projets utilisent cette technologie
    const projectsUsingTech = await prisma.projectStackTechnique.findMany({
      where: { stackTechniqueId: resolvedParams.id }
    })
    
    // Supprimer automatiquement la technologie de tous les projets qui l'utilisent
    await prisma.projectStackTechnique.deleteMany({
      where: { stackTechniqueId: resolvedParams.id }
    })

    // Puis supprimer la technologie elle-même
    await prisma.stackTechnique.delete({
      where: { id: resolvedParams.id }
    })

    const message = projectsUsingTech.length > 0 
      ? `Technologie supprimée avec succès (retirée de ${projectsUsingTech.length} projet(s))`
      : 'Technologie supprimée avec succès'

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Failed to delete stack technique:', error)
    return NextResponse.json(
      { error: 'Failed to delete stack technique' },
      { status: 500 }
    )
  }
}
