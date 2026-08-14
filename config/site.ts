export type SiteProject = {
  /** When set, UI uses `proj.items.{key}.*` strings */
  i18nKey?: "portfolio" | "apiToolkit" | "iotAttendance" | "smartHome";
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
  /** Short outcome-flavoured bullets - rendered next to the summary on the About page. */
  highlights?: string[];
};

export type EducationThesis = {
  title: string;
  /** Permanent public URL (e.g. Theseus handle) */
  url: string;
  year: string;
  /** Short professional abstract for the education page */
  summary: string;
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
  /** Published thesis / final project when relevant */
  thesis?: EducationThesis;
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
   * Add `public/images/portrait.jpg` (or change path) - initials show if the image is missing.
   */
  profile: {
    avatarSrc: "/images/portrait.jpg",
    timezone: "Eastern European Time (EET)",
    languages: "English, Finnish",
    availability:
      "Happy to chat about full-time or contract work - remote or hybrid.",
  },
  email: "contact@awunjia.com",
  github: "https://github.com/awunjia",
  linkedin: "https://www.linkedin.com/in/awunjia-serge-atabong/",
  social: {
    display: true,
  } satisfies SocialMediaConfig,
  domain: "https://awunjia.com",
  /**
   * Static résumé PDF served from `public/` (path is URL, not filesystem).
   * Place your file at `public` + this path, e.g. `public/cv/Awunjia_Serge_Resume.pdf`.
   */
  cvDownloadPath: "/cv/Awunjia_Serge_Resume.pdf",
  /** Suggested filename when the browser saves the file. */
  cvDownloadFilename: "Awunjia_Serge_Resume.pdf",
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
    "MariaDB",
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
    "Webhooks",
    "JSON Schema",
    "HubSpot",
    "Python",
    "Dart",
    "Java",
    "C",
    "C++",
    "Arduino",
    "Bash",
  ],
  /**
   * Grouped for the /skills page (every entry in `skills` should appear exactly once).
   */
  skillStacks: [
    {
      i18nKey: "languagesWeb",
      title: "Programming languages",
      description:
        "Languages I write in day-to-day - from product code to scripts and the occasional microcontroller.",
      tools: [
        "TypeScript",
        "JavaScript",
        "PHP",
        "Python",
        "Dart",
        "Java",
        "C",
        "C++",
        "Arduino",
        "Bash",
      ],
    },
    {
      i18nKey: "frontendUi",
      title: "Frontend frameworks & UI delivery",
      description:
        "Markup, styling, and component frameworks I use to shape interfaces that stay readable for designers, developers, and the people who actually use them.",
      tools: [
        "HTML5",
        "CSS3",
        "Sass",
        "Tailwind CSS",
        "React",
        "Next.js",
        "Vue.js",
        "Svelte",
        "Redux",
        "Vite",
        "Webpack",
      ],
    },
    {
      i18nKey: "backendApis",
      title: "Backend, APIs & integrations",
      description:
        "Services, ORMs, and integration patterns - typed REST or GraphQL, validated payloads, webhooks, and third-party platforms like HubSpot when the product calls for it.",
      tools: [
        "Node.js",
        "Express",
        "NestJS",
        "Laravel",
        "Eloquent",
        "Prisma",
        "GraphQL",
        "REST APIs",
        "Webhooks",
        "JSON Schema",
        "HubSpot",
      ],
    },
    {
      i18nKey: "datastores",
      title: "Datastores & caching",
      description:
        "Relational and document models, migrations, and light caching when a page needs a little extra air.",
      tools: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Redis"],
    },
    {
      i18nKey: "mobileRealtime",
      title: "Mobile, IoT & real-time clients",
      description:
        "Flutter apps with reactive state, maps, push messaging, and Firebase or Supabase backends - close kin to the embedded and smart-home work that started my career.",
      tools: ["Flutter", "GetX", "Firebase", "Supabase", "FCM", "MapSDK"],
    },
    {
      i18nKey: "cloudPlatform",
      title: "Cloud, containers & delivery",
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
        "This site - a calm, typed-config-driven Next.js app with App Router patterns, multi-locale i18n, Docker packaging, and a static résumé visitors can grab in one click.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Docker"],
      githubUrl: "https://github.com/awunjia",
      liveUrl: "https://awunjia.com",
      images: [],
    },
    {
      i18nKey: "apiToolkit",
      title: "API toolkit",
      description:
        "Typed REST handlers, runtime validation, and structured errors so clients - human or machine - always know exactly what happened.",
      techStack: ["TypeScript", "Zod", "Node.js"],
      githubUrl: "https://github.com/awunjia",
      liveUrl: undefined,
      images: [],
    },
    {
      i18nKey: "iotAttendance",
      title: "IoT attendance platform",
      description:
        "Custom-built RFID readers paired with a Laravel attendance API and an internal admin dashboard. Hardware, firmware, server, and UI co-designed so the staff check-in flow stays a one-second tap.",
      techStack: ["Laravel", "PHP", "MySQL", "C++", "Arduino", "RFID", "IoT", "Linux"],
      images: [],
    },
    {
      i18nKey: "smartHome",
      title: "Smart-home platform",
      description:
        "A privacy-first smart-home stack: a local home-server gateway over MQTT bridging Bluetooth, Wi-Fi, and Zigbee devices, plus a Flutter companion app for setup, automations, and everyday control.",
      techStack: [
        "Flutter",
        "Dart",
        "C++",
        "MQTT",
        "Mosquitto",
        "Bluetooth",
        "Wi-Fi",
        "Zigbee",
        "Firebase",
      ],
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
        "Shipping features end-to-end on a CRM-backed internal platform that helps the team manage customers, deals, and project delivery. I work across the Laravel monolith, the Vue front-end, and the AWS-hosted MariaDB layer, with HubSpot and LLM helpers sprinkled in where they earn their keep.",
      techStack: [
        "Laravel",
        "Vue",
        "MariaDB",
        "AWS",
        "HubSpot",
        "Bootstrap",
        "HTML5",
        "CSS3",
        "LLM",
      ],
      highlights: [
        "CRM workflows and customer / project views maintained as the company scales",
        "HubSpot sync and webhook plumbing kept reliable and easy to debug",
        "LLM-assisted helpers added where they cut real toil, not as showpieces",
        "AWS + MariaDB ops and small data migrations handled with care",
      ],
    },
    {
      role: "Full-stack developer",
      company: "Sbotech Oy",
      companyUrl: "https://sbotech.fi",
      period: "Dec 2023 - Jan 2025",
      location: "Helsinki - Finland",
      summary:
        "Designed and maintained an internal user-management system and an IoT attendance platform backed by custom-designed RFID hardware - bridging Laravel services, the database, and firmware running on the readers themselves.",
      techStack: [
        "Laravel",
        "PHP",
        "MySQL",
        "IoT",
        "RFID",
        "C++",
        "Arduino",
        "Linux",
      ],
      highlights: [
        "Custom RFID readers (C++ / Arduino) talking to a Laravel attendance API",
        "Role-based user-management portal for internal staff and admins",
        "Hardware + software co-design: enclosure, firmware, server, dashboard",
        "Linux deployment and on-site debugging when the physical world misbehaved",
      ],
    },
    {
      role: "Software Engineer",
      company: "Aeco Limited",
      companyUrl: "https://aecolimited.com",
      period: "Nov 2022 - Jun 2023",
      location: "Douala - Cameroon",
      summary:
        "Led end-to-end system design for the Aeco Limited ecosystem and website, with scalability, security, and search visibility set as priorities from day one.",
      techStack: [
        "Node.js",
        "React",
        "Next.js",
        "HTML5",
        "CSS3",
        "JavaScript",
        "jQuery",
        "Bootstrap",
        "SEO",
        "Google Analytics",
      ],
      highlights: [
        "Architecture and delivery of the Aeco web ecosystem (marketing + product)",
        "Next.js front-end with sensible SEO defaults and analytics hooked up properly",
        "Security baseline and auth flows treated as features, not afterthoughts",
        "Mentored teammates on Node.js patterns and code-review habits",
      ],
    },
    {
      role: "Mobile App Developer",
      company: "Wicon Technologies",
      companyUrl: "https://wiconltd.com",
      period: "Mar 2019 - Oct 2022",
      location: "Buea - Cameroon",
      summary:
        "Built a privacy-first smart-home platform: a local home server paired with a Flutter companion app to manage connected devices over Bluetooth, Wi-Fi, and Zigbee without sending everything to the cloud.",
      techStack: [
        "Flutter",
        "Dart",
        "C++",
        "MQTT",
        "Mosquitto",
        "Bluetooth",
        "Wi-Fi",
        "Zigbee",
        "Firebase",
      ],
      highlights: [
        "Local home-server gateway (MQTT / Mosquitto) bridging Zigbee, Wi-Fi, BLE",
        "Flutter app for setup, automations, and day-to-day device control",
        "Privacy-by-default architecture: data stays on the home network",
        "Firmware-friendly C++ glue for the more constrained device side",
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
      school: "Novia University of Applied Sciences (UAS)",
      schoolUrl: "https://www.novia.fi",
      period: "Aug 2023 – Apr 2025",
      location: "Vaasa, Finland",
      field: "Bachelor of Engineering, Information Technology",
      summary:
        "Applied IT degree with a software-engineering spine: web stacks, APIs, databases, and agile delivery in team settings. Capstone work delivered an end-to-end RFID attendance and payroll platform for industry, published in the Theseus open repository.",
      highlights: [
        "Full-stack web development and service-oriented design",
        "REST APIs, SQL, and pragmatic data modelling",
        "Agile collaboration, Git workflows, and code review habits",
        "Industry thesis: RFID attendance, IoT hardware, and payroll automation",
        "Studies in English within a Nordic UAS environment",
      ],
      thesis: {
        title: "RFID-Based Employee Management System for Sbotech Oy",
        url: "https://www.theseus.fi/handle/10024/894399",
        year: "2025",
        summary:
          "Designed and built an automated attendance and payroll system for Sbotech Oy: NodeMCU RFID readers stream check-in and check-out events over Wi-Fi into a Laravel and MySQL web application, with configurable pay rates, overtime, and weekend or holiday compensation for HR and employees.",
      },
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
