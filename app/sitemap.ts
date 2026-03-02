import { MetadataRoute } from 'next';
import { getAllDocSlugs } from '@/lib/content/content-loader';

const BASE_URL = 'https://docs.lobstr.io';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllDocSlugs();

  const docPages = slugs.map((slug) => ({
    url: `${BASE_URL}/docs/${slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${BASE_URL}/docs/authentication`,
      lastModified: new Date(),
    },
    ...docPages.filter((page) => !page.url.endsWith('/docs/authentication')),
  ];
}
