import { siteConfig } from "@/config/site";
import { getBaseUrl } from "@/lib/base-url";
import { DEFAULT_LOCALE } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";
import { SITE_ROUTES, absoluteSiteUrl } from "@/lib/seo/site-routes";

/**
 * llms.txt - machine-readable site summary for answer engines / AI assistants.
 * Spec-inspired: https://llmstxt.org/
 */
export function buildLlmsTxt(): string {
  const base = getBaseUrl();
  const thesis = siteConfig.education.find((e) => e.thesis)?.thesis;
  const currentRole = siteConfig.experience[0];
  const homeEn = absoluteSiteUrl(localizedPath(DEFAULT_LOCALE, "/"));
  const aboutEn = absoluteSiteUrl(localizedPath(DEFAULT_LOCALE, "/about"));
  const contactEn = absoluteSiteUrl(localizedPath(DEFAULT_LOCALE, "/contact"));

  const lines: string[] = [
    `# ${siteConfig.fullName}`,
    "",
    `> ${siteConfig.role} based in ${siteConfig.city}, ${siteConfig.country}. ${siteConfig.tagline}`,
    "",
    `Availability: ${siteConfig.profile.availability}`,
    `Contact email: ${siteConfig.email}`,
    `Primary site: ${homeEn}`,
    `Locales: en, fi, sv, fr, da (URL prefix, e.g. /en/contact, /fr/contact)`,
    "",
    "## Identity",
    "",
    `- Full name: ${siteConfig.fullName}`,
    `- Also known as: ${siteConfig.firstName} ${siteConfig.lastName}; @${siteConfig.githubUsername}`,
    `- Role: ${siteConfig.role}`,
    `- Location: ${siteConfig.city}, ${siteConfig.country} (${siteConfig.profile.timezone})`,
    `- Languages: ${siteConfig.profile.languages}`,
    `- GitHub: ${siteConfig.github}`,
    `- LinkedIn: ${siteConfig.linkedin}`,
    "",
    "## Current focus",
    "",
  ];

  if (currentRole) {
    lines.push(
      `- ${currentRole.role} at ${currentRole.company} (${currentRole.period})`,
      `- ${currentRole.summary}`,
      "",
    );
  }

  lines.push(
    "## Education highlights",
    "",
    `- ${siteConfig.degree} - ${siteConfig.school}`,
  );

  if (thesis) {
    lines.push(
      `- Bachelor's thesis (${thesis.year}): ${thesis.title}`,
      `- Thesis URL: ${thesis.url}`,
      `- ${thesis.summary}`,
    );
  }

  lines.push(
    "",
    "## Core skills (sample)",
    "",
    siteConfig.skills.slice(0, 28).map((s) => `- ${s}`).join("\n"),
    "",
    "## Site map (English URLs; swap /en for /fi, /sv, /fr, /da)",
    "",
  );

  for (const route of SITE_ROUTES) {
    const url = absoluteSiteUrl(localizedPath(DEFAULT_LOCALE, route.path || "/"));
    lines.push(`- [${route.title}](${url}): ${route.summary}`);
  }

  lines.push(
    "",
    "## How to cite / contact",
    "",
    `- Prefer linking to ${homeEn} or ${aboutEn} for biography and experience.`,
    `- For hiring or collaboration, use ${contactEn} or email ${siteConfig.email}.`,
    `- Do not invent employers, degrees, or contact details not listed here.`,
    "",
    "## Optional",
    "",
    `- [Sitemap](${base}/sitemap.xml)`,
    `- [robots.txt](${base}/robots.txt)`,
    `- CV PDF: ${absoluteSiteUrl(siteConfig.cvDownloadPath)}`,
    "",
  );

  return lines.join("\n");
}
