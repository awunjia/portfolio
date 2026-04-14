import { siteConfig } from "@/config/site";

/** Primary meta description: leads with the full name for name searches. */
export function siteMetaDescription(): string {
  return `${siteConfig.fullName} - ${siteConfig.role}. ${siteConfig.tagline}`;
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
    ...(githubUsername ? [`@${githubUsername}`, githubUsername] : []),
  ];
  return [...new Set(raw.map((s) => s.trim()).filter(Boolean))];
}
