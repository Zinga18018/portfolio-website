import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://yogeshkuchimanchi.com/', priority: 1 },
    { url: 'https://yogeshkuchimanchi.com/research/women-safety/', priority: 0.8 },
  ]
}
