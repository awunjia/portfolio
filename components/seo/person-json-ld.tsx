import { siteConfig } from "@/config/site";

/**
 * Schema.org Person for rich results and clearer entity signals for name queries.
 * @see https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
 */
export function PersonJsonLd() {
  const sameAs = [siteConfig.github, siteConfig.linkedin].filter(
    (u): boolean => Boolean(u && u.length > 0),
  ) as string[];

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    givenName: siteConfig.firstName,
    familyName: siteConfig.lastName,
    url: siteConfig.domain,
    jobTitle: siteConfig.role,
    email: siteConfig.email,
    sameAs,
    homeLocation: {
      "@type": "Place",
      name: `${siteConfig.city}, ${siteConfig.country}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
