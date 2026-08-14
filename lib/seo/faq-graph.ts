import type { FAQPage, Graph, Question } from "schema-dts";
import { siteConfig } from "@/config/site";
import { getBaseUrl } from "@/lib/base-url";
import { PERSON_ENTITY_ID } from "@/lib/seo-entity-ids";
import { DEFAULT_LOCALE } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";

const FAQ_ENTITY_ID = `${siteConfig.domain}/#faq`;

type FaqItem = { question: string; answer: string };

function faqItems(): FaqItem[] {
  const thesis = siteConfig.education.find((e) => e.thesis)?.thesis;
  const employer = siteConfig.experience[0]?.company;
  const base = getBaseUrl();
  const contactUrl = `${base}${localizedPath(DEFAULT_LOCALE, "/contact")}`;
  const aboutUrl = `${base}${localizedPath(DEFAULT_LOCALE, "/about")}`;
  const skillsUrl = `${base}${localizedPath(DEFAULT_LOCALE, "/skills")}`;
  const educationUrl = `${base}${localizedPath(DEFAULT_LOCALE, "/education")}`;

  return [
    {
      question: `Who is ${siteConfig.fullName}?`,
      answer: `${siteConfig.fullName} is a ${siteConfig.role} based in ${siteConfig.city}, ${siteConfig.country}. ${siteConfig.tagline}`,
    },
    {
      question: `What technologies does ${siteConfig.firstName} work with?`,
      answer: `Day-to-day work spans ${siteConfig.skills.slice(0, 12).join(", ")}, and related full-stack web, API, and mobile tooling. See ${skillsUrl} for the full stack groupings.`,
    },
    {
      question: `Is ${siteConfig.firstName} available for hire?`,
      answer: `${siteConfig.profile.availability} Reach out via ${contactUrl} or ${siteConfig.email}.`,
    },
    {
      question: `Where did ${siteConfig.firstName} study?`,
      answer: thesis
        ? `${siteConfig.firstName} completed ${siteConfig.degree} at ${siteConfig.school}. Bachelor's thesis (${thesis.year}): "${thesis.title}" - ${thesis.url}.`
        : `${siteConfig.firstName} studied ${siteConfig.degree} at ${siteConfig.school}. Details: ${educationUrl}.`,
    },
    {
      question: `How can I contact ${siteConfig.fullName}?`,
      answer: `Use the contact form at ${contactUrl} or email ${siteConfig.email}. Professional profiles: ${siteConfig.github} and ${siteConfig.linkedin}.`,
    },
    ...(employer
      ? [
          {
            question: `Where does ${siteConfig.firstName} work?`,
            answer: `${siteConfig.firstName} currently works as ${siteConfig.experience[0]!.role} at ${employer}. Full timeline: ${aboutUrl}.`,
          },
        ]
      : []),
  ];
}

function questionNode(item: FaqItem, index: number): Question {
  return {
    "@type": "Question",
    "@id": `${FAQ_ENTITY_ID}/q${index + 1}`,
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  };
}

/** FAQPage JSON-LD for answer engines and rich results. */
export function buildFaqSeoGraph(): Graph {
  const items = faqItems();
  const faqPage: FAQPage = {
    "@type": "FAQPage",
    "@id": FAQ_ENTITY_ID,
    url: `${getBaseUrl()}/en`,
    mainEntity: items.map((_, i) => ({ "@id": `${FAQ_ENTITY_ID}/q${i + 1}` })),
    about: { "@id": PERSON_ENTITY_ID },
    inLanguage: "en",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [faqPage, ...items.map((item, i) => questionNode(item, i))],
  };
}
