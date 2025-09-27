# Admin Hooks

Ce dossier contient les hooks personnalisés pour l'interface d'administration.

## Hooks de Navigation

### useAdminNavigation

Hook pour gérer la navigation dans l'interface d'administration de manière centralisée et type-safe.

```tsx
import { useAdminNavigation } from '@/hooks/useAdminNavigation'

const { navigateToProjects, navigateToNewProject } = useAdminNavigation()
```

## Hooks d'API

### useProjectAPI

Hook de bas niveau pour les appels API liés aux projets.

```tsx
import { useProjectAPI } from '@/hooks/useProjectAPI'

const { createProject, updateProject, getProject } = useProjectAPI()
```

**Méthodes:**
- `createProject(formData)` - Créer un nouveau projet
- `updateProject(slug, formData)` - Mettre à jour un projet
- `getProject(slug)` - Récupérer un projet par slug
- `deleteProject(slug)` - Supprimer un projet
- `getProjects()` - Récupérer tous les projets

### useStackTechniqueAPI

Hook de bas niveau pour les appels API liés aux technologies.

```tsx
import { useStackTechniqueAPI } from '@/hooks/useStackTechniqueAPI'

const { getStackTechniques, createStackTechnique } = useStackTechniqueAPI()
```

**Méthodes:**
- `getStackTechniques()` - Récupérer toutes les technologies
- `createStackTechnique(data)` - Créer une nouvelle technologie
- `updateStackTechnique(id, data)` - Mettre à jour une technologie
- `deleteStackTechnique(id)` - Supprimer une technologie

## Hooks d'Actions

### useProjectActions

Hook de haut niveau qui combine API calls, navigation et gestion d'erreurs pour les projets.

```tsx
import { useProjectActions } from '@/hooks/useProjectActions'

export default function ProjectPage() {
  const { handleCreateProject, handleUpdateProject, isLoading } = useProjectActions()

  return (
    <ProjectForm onSubmit={handleCreateProject} />
  )
}
```

**Méthodes:**
- `handleCreateProject(formData)` - Créer un projet avec navigation automatique
- `handleUpdateProject(slug, formData)` - Mettre à jour avec navigation
- `handleDeleteProject(slug, name?)` - Supprimer avec confirmation
- `isLoading` - État de chargement global
- `error` - Erreur éventuelle
- `clearError()` - Réinitialiser l'état d'erreur

## Architecture

```
Hooks de haut niveau (Actions)
    ↓
Hooks d'API (API calls)
    ↓  
Hooks de navigation
```

### Avantages

1. **Séparation des responsabilités** : API, navigation et actions séparées
2. **Réutilisabilité** : Hooks composables et modulaires
3. **Type Safety** : Types TypeScript partout
4. **Gestion d'erreurs centralisée** : Erreurs gérées automatiquement
5. **Pages ultra-clean** : Logique déplacée dans les hooks
6. **Testabilité** : Chaque hook testable indépendamment
