import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  loadDocContent,
  getAllDocSlugs,
  loadNavigation,
} from '@/lib/content/content-loader';
import ThreeColumnLayout from '@/components/layout/ThreeColumnLayout';
import Sidebar from '@/components/layout/Sidebar';
import DocContent from '@/components/layout/DocContent';
import CodeColumn from '@/components/layout/CodeColumn';
import { codeToHtml } from 'shiki';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

/**
 * Generate static params for all documentation pages
 * This enables static generation at build time
 */
export async function generateStaticParams() {
  const slugs = await getAllDocSlugs();
  // Split each slug by '/' to create the array format needed for catch-all routes
  return slugs.map((slug) => ({ slug: slug.split('/') }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  // Join the slug array back into a path string
  const slugPath = Array.isArray(slug) ? slug.join('/') : slug;

  try {
    const content = await loadDocContent(slugPath);

    return {
      title: content.seo.title,
      description: content.seo.description,
      alternates: {
        canonical: `https://docs.lobstr.io/docs/${slugPath}`,
      },
      openGraph: {
        title: content.seo.title,
        description: content.seo.description,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: content.seo.title,
        description: content.seo.description,
      },
    };
  } catch (error) {
    return {
      title: 'Page Not Found - Lobstr.io API Documentation',
      description: 'The requested documentation page could not be found.',
    };
  }
}

/**
 * Dynamic documentation page
 */
export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  // Join the slug array back into a path string
  const slugPath = Array.isArray(slug) ? slug.join('/') : slug;

  try {
    const content = await loadDocContent(slugPath);
    const navigation = await loadNavigation();

    // Language to Shiki language mapping
    const langMap: Record<string, string> = {
      curl: 'bash',
      python: 'python',
      javascript: 'javascript',
      typescript: 'typescript',
      go: 'go',
      ruby: 'ruby',
      php: 'php',
      java: 'java',
      csharp: 'csharp',
      rust: 'rust',
      node: 'javascript',
    };

    // Generate syntax-highlighted HTML for all language examples
    const highlightedLanguages = await Promise.all(
      content.examples.languages.map(async (example) => ({
        language: example.language,
        label: example.label,
        code: example.code,
        html: await codeToHtml(example.code || '# No example available', {
          lang: langMap[example.language] || 'text',
          theme: 'github-light',
        }),
      }))
    );

    // Generate syntax-highlighted HTML for all responses
    const highlightedResponses = await Promise.all(
      content.examples.responses.map(async (response) => ({
        status: response.status,
        body: response.body,
        html: await codeToHtml(response.body || '{}', {
          lang: 'json',
          theme: 'github-light',
        }),
      }))
    );

    const highlightedCode = {
      languages: highlightedLanguages,
      responses: highlightedResponses,
    };

    return (
      <ThreeColumnLayout
        sidebar={<Sidebar navigation={navigation} />}
        codeColumn={<CodeColumn examples={content.examples} highlightedCode={highlightedCode} />}
      >
        <DocContent content={content} />
      </ThreeColumnLayout>
    );
  } catch (error) {
    notFound();
  }
}
