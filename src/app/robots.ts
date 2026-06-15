import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/personal-analysis/', '/api/'],
    },
    sitemap: 'https://futureousai.com/sitemap.xml',
  };
}
