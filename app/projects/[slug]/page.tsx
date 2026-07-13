import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "../../portfolio-client";
import { getProject, portfolioUrl, projects } from "../../portfolio-data";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const canonical = `${portfolioUrl}/projects/${project.slug}`;
  return {
    title: `${project.title.en} | Ren Sishuo`,
    description: project.summary.en,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: `${project.title.en} | Ren Sishuo`,
      description: project.summary.en,
      images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Ren Sishuo AI Solutions Engineer portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title.en} | Ren Sishuo`,
      description: project.summary.en,
      images: ["/og.png"],
    },
  };
}

export default async function ProjectCase({ params }: CasePageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title.en,
    alternateName: project.title.zh,
    url: `${portfolioUrl}/projects/${project.slug}`,
    description: project.summary.en,
    creator: {
      "@type": "Person",
      name: "Ren Sishuo",
      jobTitle: "AI Solutions Engineer",
    },
    keywords: project.tags.join(", "),
    image: project.media.map((item) => `${portfolioUrl}${item.src}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <CaseStudyPage project={project} />
    </>
  );
}
