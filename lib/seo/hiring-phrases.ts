import { siteConfig } from "@/config/site";

/**
 * Deterministic “hiring / jobs” style phrases derived from `siteConfig`.
 * Used to widen meta keywords without hand-maintaining every variant.
 */
export function buildHiringSearchPhrases(): string[] {
  const { fullName, firstName, lastName, role, city, country, githubUsername } =
    siteConfig;
  const loc = `${city} ${country}`;
  return [
    `${role} ${city}`,
    `${role} ${country}`,
    `software engineer ${city}`,
    `developer portfolio ${city}`,
    `${fullName} ${role}`,
    `${firstName} ${lastName} developer`,
    `hire ${role} ${country}`,
    `remote ${role}`,
    `${githubUsername} developer`,
    `full stack engineer ${loc}`,
    `contract software developer ${city}`,
    `European time zone developer ${lastName}`,
  ];
}
