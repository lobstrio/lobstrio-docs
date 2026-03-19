import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE_URL = 'https://docs.lobstr.io';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
