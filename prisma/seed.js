// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Données des catégories par défaut
const defaultCategories = [
  {
    name: 'Intelligence Artificielle',
    slug: 'intelligence-artificielle',
    description: 'Projets liés à l\'IA et au Machine Learning',
    sortOrder: 1,
    subCategories: [
      { name : 'Favoris', slug: 'favoris', description: 'Favoris', sortOrder: 1 },
      { name: 'Supervisée', slug: 'supervised', description: 'Apprentissage supervisé', sortOrder: 2 },
      { name: 'Non supervisée', slug: 'unsupervised', description: 'Apprentissage non supervisé', sortOrder: 3 },
      { name: 'Par renforcement', slug: 'reinforcement', description: 'Apprentissage par renforcement', sortOrder: 4 },
      { name: 'Tous', slug: 'all', description: 'Tous les projets IA', sortOrder: 5 }
    ]
  },
  {
    name: 'Applications Web',
    slug: 'applications-web',
    description: 'Projets de développement web et mobile',
    sortOrder: 2,
    subCategories: [
      { name : 'Favoris', slug: 'favoris', description: 'Favoris', sortOrder: 1 },
      { name: 'Full Stack', slug: 'full-stack', description: 'Applications complètes', sortOrder: 2 },
      { name: 'Mobile', slug: 'mobile', description: 'Applications mobiles', sortOrder: 3 },
      { name: 'Frontend', slug: 'frontend', description: 'Interfaces utilisateur', sortOrder: 4 },
      { name: 'Design', slug: 'design', description: 'Design et UX/UI', sortOrder: 5 },
      { name: 'Tous', slug: 'all', description: 'Tous les projets web', sortOrder: 6 }
    ]
  }
]

async function seedCategories() {
  console.log('🏷️ Creating categories and sub-categories...')

  const createdCategories = []

  for (const categoryData of defaultCategories) {
    const { subCategories, ...categoryInfo } = categoryData

    // Créer ou mettre à jour la catégorie
    const category = await prisma.category.upsert({
      where: { slug: categoryInfo.slug },
      update: categoryInfo,
      create: categoryInfo,
    })

    console.log(`  ✅ Category: ${category.name}`)
    createdCategories.push(category)

    // Créer ou mettre à jour les sous-catégories
    for (const subCategoryData of subCategories) {
      const subCategory = await prisma.subCategory.upsert({
        where: {
          categoryId_slug: {
            categoryId: category.id,
            slug: subCategoryData.slug
          }
        },
        update: {
          name: subCategoryData.name,
          description: subCategoryData.description,
          sortOrder: subCategoryData.sortOrder
        },
        create: {
          ...subCategoryData,
          categoryId: category.id
        }
      })

      console.log(`    ✅ Sub-category: ${subCategory.name}`)
    }
  }

  return createdCategories
}

async function main() {
  console.log('🌱 Starting complete seed...')

  // Create stack techniques
  const stackTechniques = [
    // Frontend
    { name: 'React', slug: 'react', icon: '/icons/react.svg', color: '#61DAFB', category: 'FRONTEND', description: 'A JavaScript library for building user interfaces', website: 'https://reactjs.org' },
    { name: 'Next.js', slug: 'nextjs', icon: '/icons/nextjs.svg', color: '#000000', category: 'FRONTEND', description: 'The React Framework for Production', website: 'https://nextjs.org' },
    { name: 'TypeScript', slug: 'typescript', icon: '/icons/typescript.svg', color: '#3178C6', category: 'FRONTEND', description: 'JavaScript with syntax for types', website: 'https://typescriptlang.org' },
    { name: 'Tailwind CSS', slug: 'tailwindcss', icon: '/icons/tailwind.svg', color: '#06B6D4', category: 'FRONTEND', description: 'A utility-first CSS framework', website: 'https://tailwindcss.com' },
    { name: 'Framer Motion', slug: 'framer-motion', icon: '/icons/framer.svg', color: '#0055FF', category: 'FRONTEND', description: 'A production-ready motion library for React', website: 'https://framer.com/motion' },
    { name: 'Vue.js', slug: 'vuejs', icon: '/icons/vue.svg', color: '#4FC08D', category: 'FRONTEND', description: 'The Progressive JavaScript Framework', website: 'https://vuejs.org' },
    { name: 'Angular', slug: 'angular', icon: '/icons/angular.svg', color: '#DD0031', category: 'FRONTEND', description: 'Platform for building mobile and desktop web applications', website: 'https://angular.io' },
    { name: 'Svelte', slug: 'svelte', icon: '/icons/svelte.svg', color: '#FF3E00', category: 'FRONTEND', description: 'Cybernetically enhanced web apps', website: 'https://svelte.dev' },
    
    // Backend
    { name: 'Node.js', slug: 'nodejs', icon: '/icons/nodejs.svg', color: '#339933', category: 'BACKEND', description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine', website: 'https://nodejs.org' },
    { name: 'Express.js', slug: 'expressjs', icon: '/icons/express.svg', color: '#000000', category: 'BACKEND', description: 'Fast, unopinionated, minimalist web framework for Node.js', website: 'https://expressjs.com' },
    { name: 'Python', slug: 'python', icon: '/icons/python.svg', color: '#3776AB', category: 'BACKEND', description: 'Programming language that lets you work quickly', website: 'https://python.org' },
    { name: 'Django', slug: 'django', icon: '/icons/django.svg', color: '#092E20', category: 'BACKEND', description: 'The web framework for perfectionists with deadlines', website: 'https://djangoproject.com' },
    { name: 'FastAPI', slug: 'fastapi', icon: '/icons/fastapi.svg', color: '#009688', category: 'BACKEND', description: 'Modern, fast web framework for building APIs with Python', website: 'https://fastapi.tiangolo.com' },
    
    // Database
    { name: 'PostgreSQL', slug: 'postgresql', icon: '/icons/postgresql.svg', color: '#336791', category: 'DATABASE', description: 'The world\'s most advanced open source relational database', website: 'https://postgresql.org' },
    { name: 'Prisma', slug: 'prisma', icon: '/icons/prisma.svg', color: '#2D3748', category: 'DATABASE', description: 'Next-generation Node.js and TypeScript ORM', website: 'https://prisma.io' },
    { name: 'MongoDB', slug: 'mongodb', icon: '/icons/mongodb.svg', color: '#47A248', category: 'DATABASE', description: 'The application data platform', website: 'https://mongodb.com' },
    { name: 'Redis', slug: 'redis', icon: '/icons/redis.svg', color: '#DC382D', category: 'DATABASE', description: 'The open source, in-memory data store', website: 'https://redis.io' },
    
    // DevOps
    { name: 'Docker', slug: 'docker', icon: '/icons/docker.svg', color: '#2496ED', category: 'DEVOPS', description: 'Platform for developing, shipping, and running applications', website: 'https://docker.com' },
    { name: 'AWS', slug: 'aws', icon: '/icons/aws.svg', color: '#FF9900', category: 'DEVOPS', description: 'Amazon Web Services cloud platform', website: 'https://aws.amazon.com' },
    { name: 'Vercel', slug: 'vercel', icon: '/icons/vercel.svg', color: '#000000', category: 'DEVOPS', description: 'Platform for frontend developers', website: 'https://vercel.com' },
    
    // Design
    { name: 'Figma', slug: 'figma', icon: '/icons/figma.svg', color: '#F24E1E', category: 'DESIGN', description: 'The collaborative interface design tool', website: 'https://figma.com' },
    
    // Mobile
    { name: 'React Native', slug: 'react-native', icon: '/icons/react-native.svg', color: '#61DAFB', category: 'MOBILE', description: 'Create native apps for Android and iOS using React', website: 'https://reactnative.dev' }
  ]

  console.log('📚 Creating stack techniques...')
  for (const tech of stackTechniques) {
    await prisma.stackTechnique.upsert({
      where: { slug: tech.slug },
      update: tech,
      create: tech
    })
  }

  // Seed des catégories
  const categories = await seedCategories()

  console.log('🚀 Creating sample projects...')

  // Trouver les catégories créées
  const webCategory = categories.find(cat => cat.slug === 'applications-web')
  const aiCategory = categories.find(cat => cat.slug === 'intelligence-artificielle')
  
  // Trouver les sous-catégories
  const webFullStackSubCategory = await prisma.subCategory.findFirst({
    where: { categoryId: webCategory.id, slug: 'full-stack' }
  })
  const webMobileSubCategory = await prisma.subCategory.findFirst({
    where: { categoryId: webCategory.id, slug: 'mobile' }
  })
  
  // Create sample projects
  const portfolioProject = await prisma.project.create({
    data: {
      name: 'Portfolio Website',
      slug: 'portfolio-website',
      description: 'A modern portfolio website showcasing my projects and skills. Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and beautiful design.',
      status: 'ACTIVE',
      sortOrder: 1,
      images: {
        create: [
          {
            url: '/projects/portfolio/thumbnail.jpg',
            alt: 'Portfolio website thumbnail showing the hero section',
            type: 'THUMBNAIL',
            sortOrder: 0,
            width: 600,
            height: 400
          },
          {
            url: '/projects/portfolio/hero.jpg',
            alt: 'Portfolio website hero section with animated background',
            type: 'HERO',
            sortOrder: 1,
            width: 1200,
            height: 800
          },
          {
            url: '/projects/portfolio/projects-section.jpg',
            alt: 'Portfolio website projects section showcase',
            type: 'GALLERY',
            sortOrder: 2,
            width: 1200,
            height: 800
          },
          {
            url: '/projects/portfolio/contact-section.jpg',
            alt: 'Portfolio website contact section with form',
            type: 'GALLERY',
            sortOrder: 3,
            width: 1200,
            height: 800
          }
        ]
      },
      stackTechniques: {
        create: [
          { stackTechnique: { connect: { slug: 'react' } } },
          { stackTechnique: { connect: { slug: 'nextjs' } } },
          { stackTechnique: { connect: { slug: 'typescript' } } },
          { stackTechnique: { connect: { slug: 'tailwindcss' } } },
          { stackTechnique: { connect: { slug: 'framer-motion' } } }
        ]
      },
      categories: {
        create: [
          {
            category: { connect: { id: webCategory.id } },
            subCategory: { connect: { id: webFullStackSubCategory.id } }
          }
        ]
      }
    }
  })

  const ecommerceProject = await prisma.project.create({
    data: {
      name: 'E-Commerce Platform',
      slug: 'ecommerce-platform',
      description: 'A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration. Features include real-time inventory, order tracking, and admin dashboard.',
      status: 'ACTIVE',
      sortOrder: 2,
      images: {
        create: [
          {
            url: '/projects/ecommerce/thumbnail.jpg',
            alt: 'E-commerce platform homepage',
            type: 'THUMBNAIL',
            sortOrder: 0,
            width: 600,
            height: 400
          },
          {
            url: '/projects/ecommerce/hero.jpg',
            alt: 'E-commerce platform product showcase',
            type: 'HERO',
            sortOrder: 1,
            width: 1200,
            height: 800
          },
          {
            url: '/projects/ecommerce/dashboard.jpg',
            alt: 'Admin dashboard with analytics',
            type: 'SCREENSHOT',
            sortOrder: 2,
            width: 1200,
            height: 800
          },
          {
            url: '/projects/ecommerce/cart.jpg',
            alt: 'Shopping cart and checkout process',
            type: 'GALLERY',
            sortOrder: 3,
            width: 1200,
            height: 800
          }
        ]
      },
      stackTechniques: {
        create: [
          { stackTechnique: { connect: { slug: 'nextjs' } } },
          { stackTechnique: { connect: { slug: 'typescript' } } },
          { stackTechnique: { connect: { slug: 'nodejs' } } },
          { stackTechnique: { connect: { slug: 'postgresql' } } },
          { stackTechnique: { connect: { slug: 'prisma' } } },
          { stackTechnique: { connect: { slug: 'tailwindcss' } } }
        ]
      },
      categories: {
        create: [
          {
            category: { connect: { id: webCategory.id } },
            subCategory: { connect: { id: webFullStackSubCategory.id } }
          }
        ]
      }
    }
  })

  const mobileAppProject = await prisma.project.create({
    data: {
      name: 'Task Management App',
      slug: 'task-management-app',
      description: 'A cross-platform mobile application for task and project management. Features include team collaboration, real-time sync, offline support, and intuitive drag-and-drop interface.',
      status: 'ACTIVE',
      sortOrder: 3,
      images: {
        create: [
          {
            url: '/projects/mobile-app/thumbnail.jpg',
            alt: 'Task management app interface',
            type: 'THUMBNAIL',
            sortOrder: 0,
            width: 600,
            height: 400
          },
          {
            url: '/projects/mobile-app/mockup.jpg',
            alt: 'Mobile app design mockup',
            type: 'MOCKUP',
            sortOrder: 1,
            width: 800,
            height: 1200
          },
          {
            url: '/projects/mobile-app/features.jpg',
            alt: 'App features showcase',
            type: 'GALLERY',
            sortOrder: 2,
            width: 1200,
            height: 800
          }
        ]
      },
      stackTechniques: {
        create: [
          { stackTechnique: { connect: { slug: 'react-native' } } },
          { stackTechnique: { connect: { slug: 'typescript' } } },
          { stackTechnique: { connect: { slug: 'nodejs' } } },
          { stackTechnique: { connect: { slug: 'mongodb' } } },
          { stackTechnique: { connect: { slug: 'figma' } } }
        ]
      },
      categories: {
        create: [
          {
            category: { connect: { id: webCategory.id } },
            subCategory: { connect: { id: webMobileSubCategory.id } }
          }
        ]
      }
    }
  })

  // Créer un projet IA exemple
  const aiProject = await prisma.project.create({
    data: {
      name: 'Système de Recommandation ML',
      slug: 'systeme-recommandation-ml',
      description: 'Un système de recommandation intelligent utilisant des algorithmes d\'apprentissage automatique pour personnaliser l\'expérience utilisateur. Implémenté avec Python, scikit-learn et TensorFlow.',
      status: 'ACTIVE',
      sortOrder: 4,
      images: {
        create: [
          {
            url: '/projects/ml-system/thumbnail.jpg',
            alt: 'Système ML dashboard',
            type: 'THUMBNAIL',
            sortOrder: 0,
            width: 600,
            height: 400
          },
          {
            url: '/projects/ml-system/algorithm.jpg',
            alt: 'Visualisation des algorithmes ML',
            type: 'HERO',
            sortOrder: 1,
            width: 1200,
            height: 800
          }
        ]
      },
      stackTechniques: {
        create: [
          { stackTechnique: { connect: { slug: 'python' } } },
          { stackTechnique: { connect: { slug: 'fastapi' } } },
          { stackTechnique: { connect: { slug: 'postgresql' } } }
        ]
      },
      categories: {
        create: [
          {
            category: { connect: { id: aiCategory.id } },
            subCategory: { connect: { 
              id: (await prisma.subCategory.findFirst({
                where: { categoryId: aiCategory.id, slug: 'supervised' }
              })).id 
            } }
          }
        ]
      }
    }
  })

  console.log('✅ Seed completed successfully!')
  console.log(`Created ${stackTechniques.length} stack techniques`)
  console.log(`Created ${categories.length} categories with sub-categories`)
  console.log(`Created 4 sample projects:`)
  console.log(`  - ${portfolioProject.name} (Applications Web > Full Stack)`)
  console.log(`  - ${ecommerceProject.name} (Applications Web > Full Stack)`)
  console.log(`  - ${mobileAppProject.name} (Applications Web > Mobile)`)
  console.log(`  - ${aiProject.name} (Intelligence Artificielle > Supervisée)`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
