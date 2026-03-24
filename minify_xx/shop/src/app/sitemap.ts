import { MetadataRoute } from 'next'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://explyra.me'
  const shopUrl = `${baseUrl}/shop`
  
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: shopUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/auth`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
        url: `${baseUrl}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    },
    {
        url: `${baseUrl}/refund`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    },
    {
        url: `${baseUrl}/toc`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
    }
  ]

  // Dynamic Product Routes
  let productRoutes: MetadataRoute.Sitemap = []
  try {
    const querySnapshot = await getDocs(collection(db, 'shop_products'))
    productRoutes = querySnapshot.docs.map(doc => ({
      url: `${shopUrl}/product/${doc.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Sitemap generation error:', error)
  }

  return [...staticRoutes, ...productRoutes]
}
