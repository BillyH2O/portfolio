import React from 'react'

// Hook pour gérer les paramètres de route asynchrones
export const useRouteParams = (params: Promise<{ slug: string }>) => {
  const [slug, setSlug] = React.useState<string>('')

  React.useEffect(() => {
    params.then(resolved => setSlug(resolved.slug))
  }, [params])

  return slug
}
