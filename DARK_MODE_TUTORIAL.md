# 🌙 Tutoriel Complet : Ajouter le Dark Mode à votre Portfolio Next.js

## 🎯 **Objectif**
Transformer votre projet avec des couleurs statiques en un système adaptatif avec dark mode et bouton toggle.

---

## 📦 **Étape 1 : Installation des dépendances**

```bash
npm install next-themes
```

---

## ⚙️ **Étape 2 : Configuration Tailwind CSS**

Votre `tailwind.config.js` doit contenir :

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // ✅ Déjà configuré
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  // ... reste de la configuration
}
```

---

## 🎨 **Étape 3 : Variables CSS pour le Dark Mode**

Dans `app/globals.css`, ajoutez les variables pour le mode sombre :

```css
:root {
  /* Variables pour le mode clair */
  --background: #ffffff;
  --foreground: #000000;
  /* ... autres variables */
}

.dark {
  /* Variables pour le mode sombre */
  --background: #0a0a0a;
  --foreground: #ffffff;
  /* ... autres variables */
}

@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## 🔧 **Étape 4 : Créer le ThemeProvider**

Créez `components/providers/ThemeProvider.tsx` :

```typescript
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
```

---

## 🎯 **Étape 5 : Créer le Toggle Button**

Créez `components/ui/ThemeToggle.tsx` :

```typescript
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/form-contact/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="w-10 h-10 p-0">
        <div className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-10 h-10 p-0 bg-background/50 border-border/50 hover:bg-accent/50 transition-all duration-300"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}
```

---

## 🏗️ **Étape 6 : Intégrer le ThemeProvider**

Dans `app/layout.tsx` :

```typescript
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 🎨 **Étape 7 : Ajouter le Toggle à votre Navbar**

Dans votre navbar :

```typescript
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// Dans votre composant navbar
<div className="flex items-center gap-2">
  <ThemeToggle />
  <Button>Contact</Button>
</div>
```

---

## 🔄 **Étape 8 : Convertir vos composants**

### **Principe de conversion :**

**Avant (couleurs statiques) :**
```typescript
<div className="bg-white text-black border-gray-200">
  <h1 className="text-gray-800">Titre</h1>
</div>
```

**Après (adaptatif) :**
```typescript
<div className="bg-white dark:bg-slate-800 text-black dark:text-foreground border-gray-200 dark:border-slate-700 transition-colors duration-300">
  <h1 className="text-gray-800 dark:text-slate-100">Titre</h1>
</div>
```

### **Classes courantes à convertir :**

| Élément | Mode Clair | Mode Sombre |
|---------|------------|-------------|
| **Arrière-plans** | `bg-white` | `dark:bg-slate-800` |
| | `bg-gray-50` | `dark:bg-slate-900` |
| | `bg-blue-50` | `dark:bg-slate-800` |
| **Textes** | `text-black` | `dark:text-foreground` |
| | `text-gray-800` | `dark:text-slate-100` |
| | `text-gray-600` | `dark:text-slate-400` |
| **Bordures** | `border-gray-200` | `dark:border-slate-700` |
| | `border-gray-300` | `dark:border-slate-600` |

### **Exemple complet de conversion :**

**Page d'accueil :**
```typescript
// Avant
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
  <h1 className="text-slate-800">Mon Portfolio</h1>
  <p className="text-slate-600">Description</p>
</div>

// Après
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500">
  <h1 className="text-slate-800 dark:text-slate-100 transition-colors duration-300">Mon Portfolio</h1>
  <p className="text-slate-600 dark:text-slate-300 transition-colors duration-300">Description</p>
</div>
```

**Formulaires :**
```typescript
// Input
<input className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-400" />

// Card
<div className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl rounded-lg">
  // Contenu
</div>
```

---

## 🎨 **Étape 9 : Bonnes Pratiques**

### **1. Transitions fluides**
Ajoutez toujours `transition-colors duration-300` pour des animations fluides :

```typescript
className="text-gray-800 dark:text-foreground transition-colors duration-300"
```

### **2. Éviter l'hydratation mismatch**
Utilisez toujours un état `mounted` dans vos composants qui utilisent `useTheme()` :

```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <div>Loading...</div>; // ou un skeleton
}
```

### **3. Tester les contrastes**
- Vérifiez la lisibilité en mode sombre
- Testez avec des outils d'accessibilité
- Utilisez des couleurs avec suffisamment de contraste

### **4. Variables CSS personnalisées**
Pour des couleurs complexes, utilisez les variables CSS :

```css
:root {
  --primary-bg: #ffffff;
  --primary-text: #000000;
}

.dark {
  --primary-bg: #1a1a1a;
  --primary-text: #ffffff;
}
```

```typescript
<div className="bg-[var(--primary-bg)] text-[var(--primary-text)]">
```

---

## 🚀 **Étape 10 : Test et Déploiement**

### **Tests à effectuer :**

1. **Fonctionnalité du toggle** ✅
2. **Persistance du thème** (rechargement de page) ✅
3. **Mode système** (suit les préférences OS) ✅
4. **Transitions fluides** ✅
5. **Accessibilité** (contraste, navigation clavier) ✅

### **Commandes utiles :**

```bash
# Démarrer en développement
npm run dev

# Build pour production
npm run build

# Prévisualiser la build
npm run start
```

---

## 🎯 **Résultats Attendus**

Après avoir suivi ce tutoriel, votre site aura :

- ✅ **Toggle button** fonctionnel dans la navbar
- ✅ **Thème persistant** (sauvegardé dans localStorage)
- ✅ **Mode système** qui suit les préférences de l'OS
- ✅ **Transitions fluides** entre les thèmes
- ✅ **Design cohérent** en mode clair et sombre
- ✅ **Accessibilité** préservée

---

## 🔧 **Dépannage**

### **Le toggle ne fonctionne pas**
- Vérifiez que le ThemeProvider enveloppe votre app
- Assurez-vous d'avoir `"use client"` dans vos composants

### **Hydratation mismatch**
- Utilisez l'état `mounted` dans vos composants
- Ajoutez `suppressHydrationWarning={true}` si nécessaire

### **Couleurs ne changent pas**
- Vérifiez que `darkMode: ["class"]` est dans tailwind.config.js
- Assurez-vous d'utiliser les classes `dark:` correctement

### **Thème ne persiste pas**
- Le localStorage est automatiquement géré par next-themes
- Vérifiez que vous n'avez pas de conflits avec d'autres scripts

---

## 🎉 **Félicitations !**

Votre portfolio supporte maintenant le dark mode avec un toggle élégant ! 

**Prochaines étapes possibles :**
- Ajouter plus de thèmes (ex: thème coloré)
- Créer des animations plus complexes
- Ajouter des préférences utilisateur avancées


