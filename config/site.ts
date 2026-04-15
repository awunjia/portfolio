export type SiteProject = {
  /** When set, UI uses `proj.items.{key}.*` strings */
  i18nKey?: "portfolio" | "apiToolkit";
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  summary: string;
  /** Company site (shown as a link on the About page) */
  companyUrl?: string;
  location?: string;
  techStack?: string[];
};

export type EducationItem = {
  school: string;
  period: string;
  location: string;
  /** Degree, major, or program name */
  field: string;
  schoolUrl?: string;
  /** What you focused on, outcomes, thesis, internships, etc. */
  summary: string;
  /** Course areas, methods, tools, or notable modules */
  highlights?: string[];
};

export type SkillStack = {
  /** Key for `skills.stack.{key}.title` / `.description` */
  i18nKey:
    | "languagesWeb"
    | "frontendUi"
    | "backendApis"
    | "datastores"
    | "mobileRealtime"
    | "cloudPlatform";
  title: string;
  /** One line: what this group covers in your work */
  description: string;
  tools: readonly string[];
};

export type ProficiencyBar = {
  label: string;
  /** Key under `home.proficiency.*` in UI strings */
  i18nKey: "frontend" | "backend" | "programming";
  /** 0–100 */
  percentage: number;
};

/** Optional extras - DeveloperFolio-style social bar */
export type SocialMediaConfig = {
  display?: boolean;
  gitlab?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  medium?: string;
  stackoverflow?: string;
  kaggle?: string;
};

export const siteConfig = {
  fullName: "Awunjia Serge",
  firstName: "Serge",
  lastName: "Awunjia",
  age: 24,
  /** Primary / most recent (also used on the home profile card) */
  school: "Novia University of Applied Sciences (UAS)",
  degree: "Information Technology",
  city: "Helsinki",
  country: "Finland",
  /**
   * Professional snapshot for the home profile section.
   * Add `public/images/avatar.jpg` (or change path) - initials show if the image is missing.
   */
  profile: {
    avatarSrc: "/images/avatar.jpg",
    timezone: "Eastern European Time (EET)",
    languages: "English, Finnish",
    availability:
      "Happy to chat about full-time or contract work - remote or hybrid.",
  },
  email: "sawunjia@gmail.com",
  github: "https://github.com/awunjia",
  linkedin: "https://www.linkedin.com/in/awunjia-serge-atabong/",
  social: {
    display: true,
  } satisfies SocialMediaConfig,
  domain: "https://awunjia.com",
  /** GET route that builds a PDF from this file (see `lib/cv-document.tsx`). */
  cvDownloadPath: "/api/cv",
  /**
   * Shown on the generated CV until you add real contact details in config.
   */
  cvPlaceholders: {
    phone: "+358 45 8620 0977",
    address:
      "Helsinki - Finland",
  },
  /** GitHub username for optional stats section */
  githubUsername: "awunjia",
  role: "Full-stack software engineer",
  tagline:
    "I'm a full-stack engineer who enjoys calm, maintainable web and mobile work. I mostly work with Node.js, PHP, and Flutter, from APIs and data layers to interfaces people can actually use, and I like pairing with product, design, and teammates along the way.",
  bio: "I like turning fuzzy requirements into software that feels steady - clear structure where it helps, tests where they earn their keep, and UX that stays kind to both users and whoever opens the repo next.",
  /** DeveloperFolio-style proficiency meters (skillProgress) */
  proficiency: [
    { label: "Frontend", i18nKey: "frontend", percentage: 65 },
    { label: "Backend", i18nKey: "backend", percentage: 80 },
    { label: "Programming", i18nKey: "programming", percentage: 95 },
  ] satisfies ProficiencyBar[],
  skills: [
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Sass",
    "React",
    "Next.js",
    "Vue.js",
    "Svelte",
    "Node.js",
    "PHP",
    "Laravel",
    "Tailwind CSS",
    "Vite",
    "Webpack",
    "Prisma",
    "Redux",
    "GitHub",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Eloquent",
    "Redis",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Git",
    "AWS",
    "Firebase",
    "FCM",
    "Flutter",
    "GetX",
    "MapSDK",
    "GraphQL",
    "NGINX",
    "Express",
    "NestJS",
    "Supabase",
    "Vercel",
    "Linux",
    "REST APIs",
  ],
  /**
   * Grouped for the /skills page (every entry in `skills` should appear exactly once).
   */
  skillStacks: [
    {
      i18nKey: "languagesWeb",
      title: "Languages & web foundations",
      description:
        "The languages, markup, and styling layers I reach for when shaping product UI.",
      tools: [
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Sass",
        "PHP",
      ],
    },
    {
      i18nKey: "frontendUi",
      title: "Frontend frameworks & UI delivery",
      description:
        "How I like to structure UI work - components, SPA or SSR stacks, state, and build tooling that stays approachable.",
      tools: [
        "React",
        "Next.js",
        "Vue.js",
        "Svelte",
        "Tailwind CSS",
        "Redux",
        "Vite",
        "Webpack",
      ],
    },
    {
      i18nKey: "backendApis",
      title: "Backend, APIs & application data",
      description:
        "Services, ORMs, and integration patterns - from friendly monoliths to smaller modular APIs.",
      tools: [
        "Node.js",
        "Express",
        "NestJS",
        "Laravel",
        "Eloquent",
        "Prisma",
        "GraphQL",
        "REST APIs",
      ],
    },
    {
      i18nKey: "datastores",
      title: "Datastores & caching",
      description:
        "Relational and document models, migrations, and light caching when a page needs a little extra air.",
      tools: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    },
    {
      i18nKey: "mobileRealtime",
      title: "Mobile & real-time client",
      description:
        "Flutter apps with reactive state, maps, push messaging, and Supabase or Firebase when the product calls for it.",
      tools: ["Flutter", "GetX", "Firebase", "Supabase", "FCM", "MapSDK"],
    },
    {
      i18nKey: "cloudPlatform",
      title: "Cloud, containers & platform",
      description:
        "Packaging, orchestration, IaC, and hosting choices that keep deploys boring in a good way.",
      tools: [
        "Docker",
        "Kubernetes",
        "Terraform",
        "AWS",
        "NGINX",
        "Vercel",
        "Linux",
        "Git",
        "GitHub",
      ],
    },
  ] satisfies readonly SkillStack[],
  projects: [
    {
      i18nKey: "portfolio",
      title: "Portfolio platform",
      description:
        "A calm portfolio site driven from typed config, with App Router patterns, Docker packaging, and a CV export when someone asks for a PDF.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: "https://awunjia.com",
      images: [],
    },
    {
      i18nKey: "apiToolkit",
      title: "API toolkit",
      description:
        "Typed REST handlers, validation, and structured errors so clients always know what happened.",
      techStack: ["TypeScript", "Zod", "Node.js"],
      githubUrl: "https://github.com",
      liveUrl: undefined,
      images: [],
    },
  ] satisfies SiteProject[],
  experience: [
    {
      role: "Full-stack developer",
      company: "Groweo Oy",
      companyUrl: "https://groweo.com",
      period: "10 Feb 2025 - Present",
      location: "Helsinki - Finland",
      summary:
        "Full-stack delivery on a CRM-backed internal tool for managing customers and projects.",
      techStack: [
        "Laravel",
        "AWS",
        "MariaDB",
        "Vue",
        "Bootstrap",
        "HTML5",
        "CSS",
        "CRM",
        "LLM"
      ],
    },
    {
      role: "Full-stack developer",
      company: "Sbotech Oy",
      companyUrl: "https://sbotech.fi",
      period: "Dec 2023 - Jan 2025",
      location: "Helsinki - Finland",
      summary:
        "Built and maintained the company's internal user management system and an IoT attendance platform backed by custom-designed RFID hardware.",
      techStack: [
        "Laravel",
        "IoT",
        "RFID",
        "Hardware",
        "Custom",
        "Design",
        "Attendance",
        "System",
        "C++"
      ],
    },
    {
      role: "Software Engineer",
      company: "Aeco Limited",
      companyUrl: "https://aecolimited.com",
      period: "Nov 2022 - Jun 2023",
      location: "Douala - Cameroon",
      summary:
        "Led end-to-end system design for the Aeco Limited ecosystem and website, with scalability and security as core priorities.",
      techStack: [
        "Node.js",
        "React js",
        "Next Js",
        "HTML5",
        "CSS3",
        "JavaScript",
        "jQuery",
        "Bootstrap",
        "SEO",
        "Google Analytics",
      ],
    },
    {
      role: "Mobile App Developer",
      company: "Wicon Technologies",
      companyUrl: "https://wiconltd.com",
      period: "Mar 2019 - Oct 2022",
      location: "Buea - Cameroon",
      summary:
        "Developed a smart home platform with a local home server and companion mobile app to manage connected devices while preserving privacy and security.",
      techStack: [
        "Flutter",
        "IoT",
        "Bluetooth",
        "WiFi",
        "Zigbee",
        "MQTT",
        "Mosquitto",
        "C++",
        "Firebase"
      ],
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      school: "Self-directed - courses, documentation, and build projects",
      period: " Aug 2025 – Nov 2025",
      location: "Remote",
      field: "Artificial intelligence & applied machine learning",
      summary:
        "Structured self-study alongside full-time work: turning papers and vendor docs into small, runnable experiments. Focus on how modern models behave in real products, retrieval and context limits, evaluation, latency and cost, and on shipping safe, maintainable features rather than one-off demos.",
      highlights: [
        "LLM application patterns: RAG, tool use, structured outputs",
        "Embeddings, vector search, chunking, and relevance trade-offs",
        "Evaluation, regression checks, and monitoring in production-shaped apps",
        "Python ML stack (e.g. notebooks, PyTorch at a practitioner level)",
        "Responsible use: privacy, leakage, and clear human-in-the-loop design",
      ],
    },
    {
      school: "Novia University of Applied Science (UAS)",
      period: "Aug 2023 – Apr 2025",
      location: "Vaasa, Finland",
      field: "Information Technology",
      summary:
        "Applied IT degree with a software-engineering spine: web stacks, APIs, databases, and agile delivery in team settings. Emphasis on version control, testing, readable architecture, and multidisciplinary projects that mirror how industry ships features.",
      highlights: [
        "Full-stack web development and service-oriented design",
        "REST APIs, SQL, and pragmatic data modelling",
        "Agile collaboration, Git workflows, and code review habits",
        "Thesis-oriented work and professional-style reporting",
        "Studies in English within a Nordic UAS environment",
      ],
    },
    {
      school: "University of Buea",
      period: "2018 – 2022",
      location: "Buea, Cameroon",
      field: "Computer Science",
      summary:
        "Core CS curriculum from discrete math and logic through algorithms, languages, systems, and software engineering. Strengthened problem decomposition, implementation discipline, and communication through labs, exams, and larger team coursework.",
      highlights: [
        "Algorithms, data structures, and complexity",
        "Programming paradigms and software engineering practice",
        "Databases, networks, and operating systems fundamentals",
        "Mathematical foundations for computing",
        "Group projects, technical writing, and presentations",
      ],
    },
  ] satisfies EducationItem[],
} as const;

export type SiteConfig = typeof siteConfig;
