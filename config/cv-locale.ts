import type { Locale } from "@/lib/i18n/locale";

/**
 * PDF-only copy per locale. Array order must match `siteConfig`:
 * - `experience`: same order as `siteConfig.experience` (4 rows)
 * - `education`: same order as `siteConfig.education` (3 rows)
 * - `projects`: first two entries of `siteConfig.projects` (CV shows two)
 * - `proficiency`: same order as `siteConfig.proficiency` (3 rows)
 * - `skillGroups`: five groups of skill chips (PDF trims to 10 per group)
 */
export type CvLocaleBundle = {
  role: string;
  cityCountry: string;
  profileTimezone: string;
  profileLanguages: string;
  profileAvailability: string;
  contactAddress: string;
  proficiency: readonly { label: string; percentage: number }[];
  experience: readonly {
    role: string;
    summary: string;
    location?: string;
  }[];
  education: readonly {
    school: string;
    field: string;
    summary: string;
    highlights: readonly string[];
  }[];
  projects: readonly { title: string; description: string }[];
  skillGroups: readonly (readonly string[])[];
};

/** Default skill rows for the CV (first PDF slice per group). Used as EN fallback and base for merges. */
export const CV_DEFAULT_SKILL_GROUP_ITEMS: readonly (readonly string[])[] = [
  [
    "HTML5",
    "CSS3",
    "Sass",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Svelte",
    "Tailwind CSS",
  ],
  [
    "Node.js",
    "Express",
    "NestJS",
    "PHP",
    "Laravel",
    "Eloquent",
    "Prisma",
    "PostgreSQL",
    "MySQL",
    "MariaDB",
  ],
  [
    "REST APIs",
    "GraphQL",
    "JSON validation",
    "webhooks",
    "Firebase",
    "Supabase",
    "FCM",
    "MapSDK",
    "HubSpot",
  ],
  ["C", "C++", "Arduino", "Java", "Dart", "Python", "Bash", "embedded-adjacent tooling"],
  ["Docker", "Kubernetes", "Terraform", "AWS", "Vercel", "Linux", "Git", "GitHub", "CI-friendly builds"],
] as const;

const FI: CvLocaleBundle = {
  role: "Fullstack-ohjelmistoinsinööri",
  cityCountry: "Helsinki, Suomi",
  profileTimezone: "Itä-Euroopan aika (EET)",
  profileLanguages: "englanti, suomi",
  profileAvailability:
    "Keskustelen mielelläni kokoaikaisesta tai sopimustyöstä - etä tai hybridimalli.",
  contactAddress: "Helsinki, Suomi",
  proficiency: [
    { label: "Käyttöliittymä", percentage: 65 },
    { label: "Palvelinpuoli", percentage: 80 },
    { label: "Ohjelmointi", percentage: 95 },
  ],
  experience: [
    {
      role: "Fullstack-kehittäjä",
      summary:
        "Fullstack-toimitus CRM-taustaisessa sisäisessä työkalussa asiakkaiden ja projektien hallintaan.",
      location: "Helsinki, Suomi",
    },
    {
      role: "Fullstack-kehittäjä",
      summary:
        "Yhtiön sisäisen käyttäjähallinnan ja IoT-pohjaisen läsnäolojärjestelmän rakentaminen ja ylläpito; tukena räätälöity RFID-laitteisto.",
      location: "Helsinki, Suomi",
    },
    {
      role: "Ohjelmistoinsinööri",
      summary:
        "Kokonaisvaltainen järjestelmäsuunnittelu Aeco Limited -ekosysteemille ja verkkosivustolle - skaalautuvuus ja tietoturva keskiössä.",
      location: "Douala, Kamerun",
    },
    {
      role: "Mobiilisovelluskehittäjä",
      summary:
        "Älykotialusta paikallisella kotipalvelimella ja mobiilisovelluksella yhdistettyjen laitteiden hallintaan tietosuojaa ja tietoturvaa vaalien.",
      location: "Buea, Kamerun",
    },
  ],
  education: [
    {
      school: "Itseohjautuva opiskelu - kurssit, dokumentaatio ja toteutukset",
      field: "Tekoäly ja sovellettu koneoppiminen",
      summary:
        "Järjestelmällinen itseopiskelu kokoaikatyön ohella: tutkimusartikkelit ja toimittajien dokumentaatio pieniksi kokeiksi. Painotus siinä, miten nykymallit käyttäytyvät tuotteissa, haku ja kontekstirajat, arviointi, viive ja kustannus sekä turvalliset, ylläpidettävät ominaisuudet ilman kertaluontoisia demoja.",
      highlights: [
        "LLM-sovelluskuviot: RAG, työkalut, strukturoidut tulosteet",
        "Upotukset, vektorihaku, chunkkaus ja relevanssin kompromissit",
        "Arviointi, regressiot ja valvonta tuotantoa muistuttavissa sovelluksissa",
        "Python-koneoppimispino (muistikirjat, PyTorch käytännön tasolla)",
        "Vastuullinen käyttö: yksityisyys, vuoto ja ihmisen mukana suunnittelu",
      ],
    },
    {
      school: "Novia ammattikorkeakoulu",
      field: "Insinööri (AMK), tietotekniikka",
      summary:
        "Sovellettu IT-tutkinto ohjelmistosuunnittelun ytimellä: web-pinat, rajapinnat, tietokannat ja ketterä toimitus tiimeissä. Opinnäytetyönä RFID-pohjainen läsnäolo- ja palkanlaskentajärjestelmä yritykselle, julkaistu Theseus-tietokannassa.",
      highlights: [
        "Fullstack-webkehitys ja palvelupohjainen suunnittelu",
        "REST-rajapinnat, SQL ja käytännönläheinen tietomallinnus",
        "Ketterä yhteistyö, Git-työnkulut ja koodikatselmointi",
        "Opinnäytetyö: RFID-läsnäolo, IoT-laitteisto ja palkanlaskennan automatio",
        "Opinnot englanniksi pohjoismaisessa AMK-ympäristössä",
      ],
    },
    {
      school: "Buean yliopisto",
      field: "Tietojenkäsittelytiede",
      summary:
        "Ydin CS -ohjelma diskreetistä matematiikasta ja logiikasta algoritmeihin, kieliin, järjestelmiin ja ohjelmistosuunnitteluun. Vahvisti ongelmanjakoa, toteutuskurinalaisuutta ja viestintää laboratorioiden, tenttien ja laajempien tiimikurssien kautta.",
      highlights: [
        "Algoritmit, tietorakenteet ja kompleksisuus",
        "Ohjelmointiparadigmat ja ohjelmistosuunnittelun käytäntö",
        "Tietokannat, verkot ja käyttöjärjestelmien perusteet",
        "Laskennan matemaattiset perusteet",
        "Ryhmätyöt, tekninen kirjoittaminen ja esitykset",
      ],
    },
  ],
  projects: [
    {
      title: "Portfolio-alusta",
      description:
        "Rauhallinen portfolio tyypitetystä konfiguraatiosta, App Router -malleista, Docker-paketoinnista ja CV-viennistä PDF:ksi tarvittaessa.",
    },
    {
      title: "API-työkalusto",
      description:
        "Tyypitettyjä REST-käsittelijöitä, validointia ja strukturoituja virheitä, jotta asiakkaat näkevät aina mitä tapahtui.",
    },
  ],
  skillGroups: [
    [...CV_DEFAULT_SKILL_GROUP_ITEMS[0]!],
    [...CV_DEFAULT_SKILL_GROUP_ITEMS[1]!],
    [
      "REST-rajapinnat",
      "GraphQL",
      "JSON-validointi",
      "webhookit",
      "Firebase",
      "Supabase",
      "FCM",
      "MapSDK",
      "HubSpot",
    ],
    [
      "C",
      "C++",
      "Arduino",
      "Java",
      "Dart",
      "Python",
      "Bash",
      "sulautettuun viittaavat työkalut",
    ],
    [
      "Docker",
      "Kubernetes",
      "Terraform",
      "AWS",
      "Vercel",
      "Linux",
      "Git",
      "GitHub",
      "CI-ystävälliset buildit",
    ],
  ],
};

const SV: CvLocaleBundle = {
  role: "Fullstack-mjukvaruingenjör",
  cityCountry: "Helsingfors, Finland",
  profileTimezone: "Östeuropeisk tid (EET)",
  profileLanguages: "engelska, finska",
  profileAvailability:
    "Gärna samtal om heltids- eller konsultuppdrag - distans eller hybrid.",
  contactAddress: "Helsingfors, Finland",
  proficiency: [
    { label: "Frontend", percentage: 65 },
    { label: "Backend", percentage: 80 },
    { label: "Programmering", percentage: 95 },
  ],
  experience: [
    {
      role: "Fullstackutvecklare",
      summary:
        "Fullstackleverans i ett CRM-stött internt verktyg för kund- och projekthantering.",
      location: "Helsingfors, Finland",
    },
    {
      role: "Fullstackutvecklare",
      summary:
        "Byggde och underhöll företagets interna användarhantering och en IoT-närvaroplattform med skräddarsydd RFID-hårdvara.",
      location: "Helsingfors, Finland",
    },
    {
      role: "Mjukvaruingenjör",
      summary:
        "Ledde helhetsdesign för Aeco Limited-ekosystemet och webbplatsen med skalbarhet och säkerhet i centrum.",
      location: "Douala, Kamerun",
    },
    {
      role: "Mobilapputvecklare",
      summary:
        "Utvecklade en smart hem-plattform med lokal hemserver och följeslagarapp för uppkopplade enheter med integritet och säkerhet i fokus.",
      location: "Buea, Kamerun",
    },
  ],
  education: [
    {
      school: "Självstyrd studier - kurser, dokumentation och byggen",
      field: "Artificiell intelligens och tillämpad maskininlärning",
      summary:
        "Strukturerad självstudie vid sidan av heltid: artiklar och leverantörsdokumentation till små körbara experiment. Fokus på hur moderna modeller beter sig i produkter, hämtning och kontextgränser, utvärdering, latens och kostnad samt säkra, underhållbara funktioner utan engångsdemos.",
      highlights: [
        "LLM-mönster: RAG, verktyg, strukturerade utdata",
        "Inbäddningar, vektorsökning, chunking och relevansavvägningar",
        "Utvärdering, regressionstester och övervakning i produktnära appar",
        "Python-ML-stack (t.ex. notebooks, PyTorch på praktikernivå)",
        "Ansvarsfull användning: integritet, läckage och tydlig människa-i-loopen-design",
      ],
    },
    {
      school: "Yrkeshögskolan Novia",
      field: "Ingenjör (YH), informationsteknik",
      summary:
        "Tillämpad IT-examen med mjukvaruutveckling i centrum: webbstackar, API:er, databaser och agil leverans i team. Examensarbete: RFID-baserat närvaro- och lönesystem för näringslivet, publicerat i Theseus öppna arkiv.",
      highlights: [
        "Fullstack webbutveckling och serviceorienterad design",
        "REST-API:er, SQL och pragmatisk datamodellering",
        "Agilt samarbete, Git-flöden och kodgranskning",
        "Examensarbete: RFID-närvaro, IoT-hårdvara och löneautomation",
        "Studier på engelska i en nordisk YH-miljö",
      ],
    },
    {
      school: "University of Buea",
      field: "Datavetenskap",
      summary:
        "Kärn-CS från diskret matematik och logik via algoritmer, språk, system och mjukvaruutveckling. Stärkte problemdelning, implementationsdisciplin och kommunikation genom labb, tentor och större grupparbeten.",
      highlights: [
        "Algoritmer, datastrukturer och komplexitet",
        "Paradigm och mjukvaruutvecklingspraxis",
        "Databaser, nätverk och operativsystemens grunder",
        "Matematiska grunder för datorer",
        "Gruppprojekt, teknisk skrift och presentationer",
      ],
    },
  ],
  projects: [
    {
      title: "Portföljplattform",
      description:
        "En lugn portföljsajt driven från typad konfiguration, med App Router-mönster, Docker-paketering och CV-export till PDF när någon ber om det.",
    },
    {
      title: "API-verktygslåda",
      description:
        "Typade REST-handlers, validering och strukturerade fel så att klienter alltid ser vad som hände.",
    },
  ],
  skillGroups: [
    [...CV_DEFAULT_SKILL_GROUP_ITEMS[0]!],
    [...CV_DEFAULT_SKILL_GROUP_ITEMS[1]!],
    [
      "REST-API:er",
      "GraphQL",
      "JSON-validering",
      "webhooks",
      "Firebase",
      "Supabase",
      "FCM",
      "MapSDK",
      "HubSpot",
    ],
    ["C", "C++", "Arduino", "Java", "Dart", "Python", "Bash", "inbyggdnära verktyg"],
    [
      "Docker",
      "Kubernetes",
      "Terraform",
      "AWS",
      "Vercel",
      "Linux",
      "Git",
      "GitHub",
      "CI-vänliga builds",
    ],
  ],
};

const FR: CvLocaleBundle = {
  role: "Ingénieur logiciel full-stack",
  cityCountry: "Helsinki, Finlande",
  profileTimezone: "Heure d'Europe de l'Est (EET)",
  profileLanguages: "anglais, finnois",
  profileAvailability:
    "Ouvert à échanger sur un poste à temps plein ou en contrat - remote ou hybride.",
  contactAddress: "Helsinki, Finlande",
  proficiency: [
    { label: "Frontend", percentage: 65 },
    { label: "Backend", percentage: 80 },
    { label: "Programmation", percentage: 95 },
  ],
  experience: [
    {
      role: "Développeur full-stack",
      summary:
        "Livraison full-stack sur une plateforme interne adossée au CRM pour la gestion clients et projets.",
      location: "Helsinki, Finlande",
    },
    {
      role: "Développeur full-stack",
      summary:
        "Conception et maintenance du système interne de gestion des utilisateurs et d'une plateforme de présence IoT avec matériel RFID sur mesure.",
      location: "Helsinki, Finlande",
    },
    {
      role: "Ingénieur logiciel",
      summary:
        "Pilotage de la conception de bout en bout de l'écosystème et du site Aeco Limited, avec scalabilité et sécurité au centre.",
      location: "Douala, Cameroun",
    },
    {
      role: "Développeur d'applications mobiles",
      summary:
        "Développement d'une plateforme maison intelligente avec serveur local et application compagnon pour appareils connectés, en privilégiant vie privée et sécurité.",
      location: "Buea, Cameroun",
    },
  ],
  education: [
    {
      school: "Autoformation - cours, documentation et projets",
      field: "Intelligence artificielle et apprentissage automatique appliqué",
      summary:
        "Étude structurée en parallèle d'un emploi à temps plein : articles et docs fournisseurs transformés en petites expériences exécutables. Focus sur le comportement des modèles en produit, retrieval et limites de contexte, évaluation, latence et coût, et fonctionnalités sûres et maintenables plutôt que des démos ponctuelles.",
      highlights: [
        "Motifs LLM : RAG, outils, sorties structurées",
        "Embeddings, recherche vectorielle, chunking et compromis de pertinence",
        "Évaluation, contrôles de régression et monitoring d'apps proches de la prod",
        "Stack ML Python (notebooks, PyTorch niveau praticien)",
        "Usage responsable : vie privée, fuites et conception human-in-the-loop",
      ],
    },
    {
      school: "Université des sciences appliquées Novia (UAS)",
      field: "Bachelor of Engineering, technologies de l'information",
      summary:
        "Diplôme IT appliqué centré sur le génie logiciel : stacks web, API, bases de données et livraison agile en équipe. Mémoire : système RFID de présence et de paie pour l'industrie, publié dans l'archive ouverte Theseus.",
      highlights: [
        "Développement web full-stack et conception orientée services",
        "API REST, SQL et modélisation pragmatique des données",
        "Collaboration agile, workflows Git et revue de code",
        "Mémoire : présence RFID, matériel IoT et automatisation de la paie",
        "Études en anglais dans un environnement UAS nordique",
      ],
    },
    {
      school: "University of Buea",
      field: "Informatique",
      summary:
        "Cursus CS fondamental : mathématiques discrètes et logique, algorithmes, langages, systèmes et génie logiciel. Renforcement de la décomposition de problèmes, de la discipline d'implémentation et de la communication via labs, examens et projets d'équipe.",
      highlights: [
        "Algorithmes, structures de données et complexité",
        "Paradigmes de programmation et pratique du génie logiciel",
        "Bases de données, réseaux et fondamentaux des systèmes d'exploitation",
        "Fondements mathématiques de l'informatique",
        "Projets de groupe, rédaction technique et présentations",
      ],
    },
  ],
  projects: [
    {
      title: "Plateforme portfolio",
      description:
        "Un site portfolio calme piloté par une configuration typée, avec motifs App Router, packaging Docker et export CV PDF à la demande.",
    },
    {
      title: "Boîte à outils API",
      description:
        "Handlers REST typés, validation et erreurs structurées pour que les clients sachent toujours ce qui s'est passé.",
    },
  ],
  skillGroups: [
    [...CV_DEFAULT_SKILL_GROUP_ITEMS[0]!],
    [...CV_DEFAULT_SKILL_GROUP_ITEMS[1]!],
    [
      "API REST",
      "GraphQL",
      "validation JSON",
      "webhooks",
      "Firebase",
      "Supabase",
      "FCM",
      "MapSDK",
      "HubSpot",
    ],
    ["C", "C++", "Arduino", "Java", "Dart", "Python", "Bash", "outillage proche de l'embarqué"],
    [
      "Docker",
      "Kubernetes",
      "Terraform",
      "AWS",
      "Vercel",
      "Linux",
      "Git",
      "GitHub",
      "builds adaptés au CI",
    ],
  ],
};

const DA: CvLocaleBundle = {
  role: "Fullstack softwareingeniør",
  cityCountry: "Helsinki, Finland",
  profileTimezone: "Østeuropæisk tid (EET)",
  profileLanguages: "engelsk, finsk",
  profileAvailability:
    "Åben for en snak om fuldtid eller kontrakt - remote eller hybrid.",
  contactAddress: "Helsinki, Finland",
  proficiency: [
    { label: "Frontend", percentage: 65 },
    { label: "Backend", percentage: 80 },
    { label: "Programmering", percentage: 95 },
  ],
  experience: [
    {
      role: "Fullstack-udvikler",
      summary:
        "Fullstack-levering i et CRM-understøttet internt værktøj til kunde- og projektstyring.",
      location: "Helsinki, Finland",
    },
    {
      role: "Fullstack-udvikler",
      summary:
        "Byggede og vedligeholdt virksomhedens interne brugerstyring og en IoT-tilstedeværelsesplatform med skræddersyet RFID-hardware.",
      location: "Helsinki, Finland",
    },
    {
      role: "Softwareingeniør",
      summary:
        "Ledede helhedsdesign for Aeco Limited-økosystemet og websitet med skalerbarhed og sikkerhed i centrum.",
      location: "Douala, Cameroun",
    },
    {
      role: "Mobilapp-udvikler",
      summary:
        "Udviklede en smart home-platform med lokal hjemmeserver og ledsagerapp til tilsluttede enheder med fokus på privatliv og sikkerhed.",
      location: "Buea, Cameroun",
    },
  ],
  education: [
    {
      school: "Selvstyret læring - kurser, dokumentation og builds",
      field: "Kunstig intelligens og anvendt maskinlæring",
      summary:
        "Struktureret selvstudie ved siden af fuldtid: artikler og leverandørdokumentation til små kørbare forsøg. Fokus på moderne modellers adfærd i produkter, retrieval og kontekstgrænser, evaluering, latency og omkostning samt sikre, vedligeholdelsesvenlige features uden engangsdemoer.",
      highlights: [
        "LLM-mønstre: RAG, værktøjer, strukturerede output",
        "Embeddings, vektorsøgning, chunking og relevans-afvejninger",
        "Evaluering, regressionstjek og overvågning i produktlignende apps",
        "Python ML-stack (fx notebooks, PyTorch på praktikerniveau)",
        "Ansvarlig brug: privatliv, lækage og tydelig menneske-i-loopen-design",
      ],
    },
    {
      school: "Novia University of Applied Sciences (UAS)",
      field: "Professionsbachelor, informationsteknologi",
      summary:
        "Anvendt IT-grad med software engineering som rygrad: webstacks, API'er, databaser og agil levering i teams. Bachelorprojekt: RFID-baseret fremmøde- og lønsystem til erhvervslivet, publiceret i Theseus' åbne arkiv.",
      highlights: [
        "Fullstack webudvikling og serviceorienteret design",
        "REST API'er, SQL og pragmatisk datamodellering",
        "Agilt samarbejde, Git-workflows og code review",
        "Bachelorprojekt: RFID-fremmøde, IoT-hardware og lønautomatisering",
        "Undervisning på engelsk i et nordisk UAS-miljø",
      ],
    },
    {
      school: "University of Buea",
      field: "Datalogi",
      summary:
        "Kerne-CS fra diskret matematik og logik gennem algoritmer, sprog, systemer og software engineering. Styrkede problemdeling, implementeringsdisciplin og kommunikation via labs, eksamener og større gruppearbejder.",
      highlights: [
        "Algoritmer, datastrukturer og kompleksitet",
        "Programmeringsparadigmer og software engineering-praksis",
        "Databaser, netværk og operativsystemer på fundamentalt niveau",
        "Matematiske fundamenter for computing",
        "Gruppeprojekter, teknisk skrivning og præsentationer",
      ],
    },
  ],
  projects: [
    {
      title: "Porteføljeplatform",
      description:
        "Et roligt portfolio-site drevet af typet konfiguration, med App Router-mønstre, Docker-pakning og CV-eksport til PDF når nogen beder om det.",
    },
    {
      title: "API-værktøjskasse",
      description:
        "Typede REST-handlers, validering og strukturerede fejl så klienter altid ved hvad der skete.",
    },
  ],
  skillGroups: [
    [...CV_DEFAULT_SKILL_GROUP_ITEMS[0]!],
    [...CV_DEFAULT_SKILL_GROUP_ITEMS[1]!],
    [
      "REST API'er",
      "GraphQL",
      "JSON-validering",
      "webhooks",
      "Firebase",
      "Supabase",
      "FCM",
      "MapSDK",
      "HubSpot",
    ],
    ["C", "C++", "Arduino", "Java", "Dart", "Python", "Bash", "embedded-nære værktøjer"],
    [
      "Docker",
      "Kubernetes",
      "Terraform",
      "AWS",
      "Vercel",
      "Linux",
      "Git",
      "GitHub",
      "CI-venlige builds",
    ],
  ],
};

const BUNDLES: Record<Exclude<Locale, "en">, CvLocaleBundle> = {
  fi: FI,
  sv: SV,
  fr: FR,
  da: DA,
};

export function getCvLocaleBundle(locale: Locale): CvLocaleBundle | null {
  if (locale === "en") return null;
  return BUNDLES[locale];
}
