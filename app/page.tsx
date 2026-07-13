import { PortfolioHome } from "./portfolio-client";
import { githubUrl, portfolioUrl, projects } from "./portfolio-data";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ren Sishuo",
    alternateName: "任思硕",
    url: portfolioUrl,
    sameAs: [githubUrl],
    jobTitle: "AI Solutions Engineer",
    homeLocation: {
      "@type": "Place",
      name: "Guangzhou, China",
    },
    knowsAbout: [
      "AI agents",
      "Enterprise AI integration",
      "Dify",
      "DeepAgents",
      "Intelligent automation",
      "AI quality evaluation",
    ],
    mainEntity: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title.en,
      url: `${portfolioUrl}/projects/${project.slug}`,
      description: project.summary.en,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <PortfolioHome />
    </>
  );
}
