import Hero from "@/components/sections/Hero";
import Brands from "@/components/sections/Brands";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export default function Home() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.brand,
        url: SITE.url,
        description: SITE.description,
        founder: { "@id": `${SITE.url}/#person` },
        sameAs: [SITE.social.linkedin, SITE.social.twitter, SITE.social.github, SITE.social.youtube, SITE.social.fiverr],
      },
      {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: SITE.founder,
        url: SITE.founderUrl,
        jobTitle: "Founder, SkynetLabs",
        worksFor: { "@id": `${SITE.url}/#organization` },
        sameAs: [SITE.social.linkedin, SITE.social.twitter, SITE.social.github],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.brand,
        publisher: { "@id": `${SITE.url}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.url}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#service`,
        name: SITE.brand,
        url: SITE.url,
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: "Worldwide",
        serviceType: ["AI Automation", "n8n Workflow", "WordPress Development", "AEO/SEO", "Chatbot Development"],
      },
    ],
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <Hero />
      <Brands />
      <Stats />
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
