import type { Locale } from "@/lib/i18n/locale";

export type CvPdfStrings = {
  documentTitle: string;
  documentSubject: string;
  attachmentBasename: string;
  sections: {
    summary: string;
    coreSkills: string;
    experience: string;
    education: string;
    highlightedProjects: string;
    availability: string;
  };
  summaryParagraphs: [string, string];
  contactPhone: string;
  contactAddress: string;
  contactLanguages: string;
  linkWebsite: string;
  skillGroupTitles: readonly string[];
};

const EN: CvPdfStrings = {
  documentTitle: "CV",
  documentSubject: "Curriculum vitae",
  attachmentBasename: "Curriculum-Vitae",
  sections: {
    summary: "Summary",
    coreSkills: "Core skills",
    experience: "Experience",
    education: "Education",
    highlightedProjects: "Highlighted projects",
    availability: "Availability",
  },
  summaryParagraphs: [
    "I build web and mobile products with a calm, collaborative style and a focus on maintainable delivery.",
    "I enjoy learning new tools quickly, adapting to different teams, and improving step by step with each project.",
  ],
  contactPhone: "Phone",
  contactAddress: "Address",
  contactLanguages: "Languages",
  linkWebsite: "Website",
  skillGroupTitles: [
    "Frontend - web and mobile UI",
    "Backend - services and data",
    "API integration",
    "Programming",
    "Cloud, containers, and delivery",
  ],
};

const FI: CvPdfStrings = {
  documentTitle: "Ansioluettelo",
  documentSubject: "Ansioluettelo",
  attachmentBasename: "Ansioluettelo",
  sections: {
    summary: "Tiivistelmä",
    coreSkills: "Osaamisalueet",
    experience: "Työkokemus",
    education: "Koulutus",
    highlightedProjects: "Valitut projektit",
    availability: "Saatavuus",
  },
  summaryParagraphs: [
    "Rakennan verkko- ja mobiilituotteita rauhallisella, yhteistyöhön sopivalla tyylillä ja painotuksena ylläpidettävä toimitus.",
    "Nautin uusien työkalujen nopeasta oppimisesta, eri tiimeihin sopeutumisesta ja askeittaisesta paranemisesta projektista toiseen.",
  ],
  contactPhone: "Puhelin",
  contactAddress: "Osoite",
  contactLanguages: "Kielet",
  linkWebsite: "Verkkosivusto",
  skillGroupTitles: [
    "Frontend - verkko- ja mobiilikäyttöliittymät",
    "Palvelinpuoli - palvelut ja data",
    "API-integraatiot",
    "Ohjelmointi",
    "Pilvi, kontit ja toimitus",
  ],
};

const SV: CvPdfStrings = {
  documentTitle: "CV",
  documentSubject: "Meritförteckning",
  attachmentBasename: "CV",
  sections: {
    summary: "Sammanfattning",
    coreSkills: "Kärnfärdigheter",
    experience: "Arbetslivserfarenhet",
    education: "Utbildning",
    highlightedProjects: "Utvalda projekt",
    availability: "Tillgänglighet",
  },
  summaryParagraphs: [
    "Jag bygger webb- och mobilprodukter med ett lugnt, samarbetsinriktat arbetssätt och fokus på leveranser som går att underhålla.",
    "Jag lär mig gärna nya verktyg snabbt, anpassar mig till olika team och förbättrar steg för steg i varje projekt.",
  ],
  contactPhone: "Telefon",
  contactAddress: "Adress",
  contactLanguages: "Språk",
  linkWebsite: "Webbplats",
  skillGroupTitles: [
    "Frontend - webb och mobilgränssnitt",
    "Backend - tjänster och data",
    "API-integration",
    "Programmering",
    "Moln, containrar och leverans",
  ],
};

const DA: CvPdfStrings = {
  documentTitle: "CV",
  documentSubject: "Curriculum vitae",
  attachmentBasename: "CV",
  sections: {
    summary: "Resumé",
    coreSkills: "Kernekompetencer",
    experience: "Erhvervserfaring",
    education: "Uddannelse",
    highlightedProjects: "Udvalgte projekter",
    availability: "Tilgængelighed",
  },
  summaryParagraphs: [
    "Jeg bygger web- og mobilprodukter med en rolig, samarbejdsorienteret stil og fokus på leverancer, der er nemme at vedligeholde.",
    "Jeg lærer gerne nye værktøjer hurtigt, tilpasser mig forskellige teams og forbedrer trin for trin i hvert projekt.",
  ],
  contactPhone: "Telefon",
  contactAddress: "Adresse",
  contactLanguages: "Sprog",
  linkWebsite: "Website",
  skillGroupTitles: [
    "Frontend - web og mobil UI",
    "Backend - services og data",
    "API-integration",
    "Programmering",
    "Cloud, containere og leverance",
  ],
};

export function getCvPdfStrings(locale: Locale): CvPdfStrings {
  switch (locale) {
    case "fi":
      return FI;
    case "sv":
      return SV;
    case "da":
      return DA;
    default:
      return EN;
  }
}
