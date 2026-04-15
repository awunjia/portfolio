import { siteConfig } from "@/config/site";
import { buildHiringSearchPhrases } from "@/lib/seo/hiring-phrases";

/** Primary meta description: name, role, pitch, and availability for hiring-related queries. */
export function siteMetaDescription(): string {
  return `${siteConfig.fullName} - ${siteConfig.role}. ${siteConfig.tagline} ${siteConfig.profile.availability}`;
}

/** Keywords for branded and name-order searches (deduped). */
export function siteMetaKeywords(): string[] {
  const { fullName, firstName, lastName, role, city, country, githubUsername } =
    siteConfig;
  const raw = [
    fullName,
    `${firstName} ${lastName}`,
    `${lastName} ${firstName}`,
    firstName,
    lastName,
    "Awunjia",
    role,
    `${city} ${country}`,
    `${city} developer`,
    "Helsinki software engineer",
    "full-stack engineer portfolio",
    "Next.js developer Finland",
    "TypeScript portfolio",
    "remote software engineer Europe",
    "contract developer Helsinki",
    "full-stack developer for hire",
    "Laravel engineer",
    "Flutter developer jobs",
    "hire full-stack developer",
    "software engineer portfolio Finland",
    ...(githubUsername ? [`@${githubUsername}`, githubUsername] : []),
  ];
  return [
    ...new Set([
      ...raw.map((s) => s.trim()).filter(Boolean),
      ...buildHiringSearchPhrases().map((s) => s.trim()),
    ]),
  ];
}
