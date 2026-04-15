import type { Graph, Occupation, OrganizationLeaf, Person, WebSite } from "schema-dts";
import { siteConfig } from "@/config/site";
import { getBaseUrl } from "@/lib/base-url";
import { PERSON_ENTITY_ID, WEBSITE_ENTITY_ID } from "@/lib/seo-entity-ids";
import { siteMetaDescription } from "@/lib/seo";

const PRIMARY_OCCUPATION_ID = `${siteConfig.domain}/#primary-occupation`;

function slugIdPart(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function currentEmployerOrg(): { org: OrganizationLeaf; id: string } | null {
  const job = siteConfig.experience[0];
  if (!job?.company) return null;
  const id = `${siteConfig.domain}/#org-${slugIdPart(job.company)}`;
  const org: OrganizationLeaf = {
    "@type": "Organization",
    "@id": id,
    name: job.company,
    ...(job.companyUrl ? { url: job.companyUrl } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: job.location?.split("-")[0]?.trim() ?? siteConfig.city,
      addressCountry: siteConfig.country,
    },
  };
  return { org, id };
}

function primaryOccupation(): Occupation {
  return {
    "@type": "Occupation",
    "@id": PRIMARY_OCCUPATION_ID,
    name: siteConfig.role,
    occupationLocation: {
      "@type": "City",
      name: siteConfig.city,
      containedInPlace: {
        "@type": "Country",
        name: siteConfig.country,
      },
    },
    skills: siteConfig.skills.slice(0, 24).map((s) => ({ "@type": "DefinedTerm" as const, name: s })),
  };
}

function personNode(employerRef: string | undefined): Person {
  const base = getBaseUrl();
  const imageUrl = new URL(siteConfig.profile.avatarSrc, `${base}/`).toString();
  const sameAs = [siteConfig.github, siteConfig.linkedin].filter(Boolean) as string[];

  return {
    "@type": "Person",
    "@id": PERSON_ENTITY_ID,
    name: siteConfig.fullName,
    alternateName: [
      `${siteConfig.firstName} ${siteConfig.lastName}`,
      `${siteConfig.lastName} ${siteConfig.firstName}`,
      siteConfig.lastName,
      `@${siteConfig.githubUsername}`,
    ],
    givenName: siteConfig.firstName,
    familyName: siteConfig.lastName,
    url: siteConfig.domain,
    image: { "@type": "ImageObject", url: imageUrl },
    jobTitle: siteConfig.role,
    hasOccupation: { "@id": PRIMARY_OCCUPATION_ID },
    ...(employerRef ? { worksFor: { "@id": employerRef } } : {}),
    description: `${siteConfig.tagline} ${siteConfig.profile.availability}`,
    email: siteConfig.email,
    sameAs,
    knowsAbout: [...siteConfig.skills],
    knowsLanguage: siteConfig.profile.languages.split(",").map((s) => s.trim()).filter(Boolean),
    homeLocation: {
      "@type": "Place",
      name: `${siteConfig.city}, ${siteConfig.country}`,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.domain}/` },
  };
}

function websiteNode(): WebSite {
  const contactUrl = `${siteConfig.domain}/contact`;
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ENTITY_ID,
    url: siteConfig.domain,
    name: siteConfig.fullName,
    description: siteMetaDescription(),
    inLanguage: ["en", "fi", "sv", "da"],
    publisher: { "@id": PERSON_ENTITY_ID },
    potentialAction: {
      "@type": "CommunicateAction",
      name: "Contact regarding work opportunities",
      target: {
        "@type": "EntryPoint",
        urlTemplate: contactUrl,
      },
    },
  };
}

/** Single @graph for the root layout: Person, Occupation, employer Organization (if any), WebSite. */
export function buildRootSeoGraph(): Graph {
  const employer = currentEmployerOrg();
  const graph: (Person | WebSite | Occupation | OrganizationLeaf)[] = [
    primaryOccupation(),
    personNode(employer?.id),
    websiteNode(),
  ];
  if (employer) graph.splice(1, 0, employer.org);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
