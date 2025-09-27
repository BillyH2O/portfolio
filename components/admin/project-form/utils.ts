/**
 * Génère un slug à partir d'un titre
 * @param title Le titre à convertir en slug
 * @returns Le slug généré
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Supprime les caractères spéciaux
    .replace(/[\s_-]+/g, '-') // Remplace les espaces et underscores par des tirets
    .replace(/^-+|-+$/g, '') // Supprime les tirets en début et fin
}

/**
 * Valide un slug
 * @param slug Le slug à valider
 * @returns True si le slug est valide
 */
export const validateSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}

/**
 * Nettoie et valide un slug
 * @param slug Le slug à nettoyer
 * @returns Le slug nettoyé et valide
 */
export const sanitizeSlug = (slug: string): string => {
  const cleaned = generateSlug(slug)
  return cleaned || 'untitled'
}
