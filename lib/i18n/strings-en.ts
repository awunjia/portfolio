/** English UI strings - source of truth for translation keys. */
export const englishMessages: Record<string, string> = {
  "nav.home": "Home",
  "nav.skills": "Skills",
  "nav.education": "Education",
  "nav.work": "Work experience",
  "nav.opensource": "Open Source",
  "nav.contact": "Contact",
  "nav.menuOpen": "Open menu",
  "nav.menuClose": "Close menu",
  "nav.primary": "Primary",

  "lang.menu": "Language",
  "lang.en": "English",
  "lang.fi": "Finnish",
  "lang.sv": "Swedish",
  "lang.da": "Danish",

  "footer.tagline": "Built with care in Helsinki.",

  "theme.toggle": "Toggle dark mode",

  "a11y.backToTop": "Back to top",

  "home.ariaOverview": "Overview",
  "home.tagline":
    "I'm a full-stack engineer who enjoys calm, maintainable web and mobile work. I mostly work with Node.js, PHP, and Flutter, from APIs and data layers to interfaces people can actually use, and I like pairing with product, design, and teammates along the way.",
  "home.sayHello": "Say hello",
  "home.downloadCv": "Download CV",
  "home.sectionStackTitle": "Technical stack",
  "home.sectionStackSubtitle": "Tools I reach for often in day-to-day product work.",
  "home.skillsLink": "Full skills page",
  "home.skillsLinkSuffix": "- stacks, groupings, and a bit more context.",
  "home.sectionProficiencyTitle": "Skills emphasis",
  "home.sectionProficiencySubtitle":
    "Rough self-ratings - useful as a conversation starter, not a scorecard.",
  "home.sectionDeliveryTitle": "Delivery focus",
  "home.sectionDeliverySubtitle": "The kinds of web and mobile work I tend to lean into.",
  "home.ctaTitle": "Hiring or just curious?",
  "home.ctaBody":
    "If you share the role, seniority, stack, and timeline, I will reply with availability and a few relevant notes when I can - usually within a couple of business days.",
  "home.ctaButton": "Reach out",
  "home.builtTitle": "Built and deployed with",
  "home.builtIntro":
    "This site is a small Next.js app on a VPS behind Dokploy, with Cloudflare out front for TLS and a little extra peace of mind. Nothing fancy - just a simple setup I am comfortable maintaining.",
  "home.cardStackTitle": "Application stack",
  "home.cardStackBody":
    "Next.js App Router, TypeScript, React, Tailwind CSS, and a few API routes for things like contact mail and CV export.",
  "home.cardHostTitle": "Hosting and delivery",
  "home.cardHostBody":
    "Packaged with Docker on a VPS and released through Dokploy so deploys stay predictable and easy to roll back if needed.",
  "home.cardSecurityTitle": "Security and edge",
  "home.cardSecurityBody":
    "Cloudflare sits in front for DNS and TLS, plus sensible defaults for edge traffic so the app stays reachable and a bit safer by default.",
  "home.cardSeoTitle": "SEO and crawlability",
  "home.cardSeoBody":
    "Basic metadata, canonical URLs, robots.txt, and sitemap.xml are in place so search engines can index the public pages without much fuss.",

  "profile.heading": "At a glance",
  "profile.basedIn": "Based in",
  "profile.languages": "Languages",
  "profile.timezone": "Timezone",
  "profile.availability": "Availability",
  "profile.phone": "Phone",
  "profile.email": "Email",
  "profile.revealPhone": "Reveal phone number",
  "profile.hidePhone": "Hide phone number",
  "profile.portraitAlt": "{name} portrait",

  "contact.eyebrow": "Hello",
  "contact.title": "Contact",
  "contact.intro":
    "Whether you are hiring, following up on an application, or just saying hello, you are welcome to leave a message (and an optional CV or document). You can also email me directly at {email}.",

  "form.name": "Name",
  "form.email": "Email",
  "form.message": "Message",
  "form.attachment": "Attachment (optional)",
  "form.attachmentHelp": "PDF, Word, images, or text - up to {size} MB.",
  "form.security": "Please complete the quick security check when you are ready.",
  "form.hint": "I read everything that lands here and usually reply within a few business days.",
  "form.send": "Send message",
  "form.sending": "Sending…",
  "form.success": "Thanks - your message is on its way.",
  "form.required": "required",
  "form.fileTooLarge": "Attachment is too large. Maximum size is {size} MB.",
  "form.selectedFile": "Selected: {name}",
  "form.networkError":
    "Network hiccup - your message may not have gone through. Check your connection and try again when you can.",
  "form.genericError": "Something went sideways on our side - try again in a moment.",

  "notFound.title": "Page not found",
  "notFound.body":
    "That URL does not match anything here - maybe it moved, or the link was mistyped.",
  "notFound.home": "Go home",

  "about.eyebrow": "Background",
  "about.title": "Work experience",
  "about.sectionTitle": "What I've been up to",
  "about.sectionSubtitle":
    "Recent roles, newest first - happy to go deeper in conversation.",
  "about.techAria": "Technologies at {company}",

  "skills.eyebrow": "Toolkit",
  "skills.title": "Skills & stacks",
  "skills.intro":
    "Tools and platforms I use in real projects, grouped by how they tend to show up in delivery - not a certification wall.",
  "skills.stacksTitle": "Technology stacks",
  "skills.stacksSubtitle": "Grouped by layer - the same lists you see on the home page.",
  "skills.emphasisTitle": "Emphasis",
  "skills.emphasisSubtitle":
    "Self-assessed comfort levels - best read next to a CV or chat.",
  "skills.stackAria": "Technologies: {title}",

  "edu.eyebrow": "Learning",
  "edu.title": "Education",
  "edu.intro":
    "A gentle tour of degrees and programs, with the most recent first. Day-to-day work lives on",
  "edu.workLink": "Work experience",
  "edu.sectionTitle": "Schools and programs",
  "edu.sectionSubtitle": "Studies and courses, newest first.",
  "edu.highlightsAria": "Focus areas at {school}",

  "proj.title": "Projects",
  "proj.intro1": "Everything here is edited in",
  "proj.intro2":
    "- tweak titles, descriptions, and stacks whenever you like.",
  "proj.sectionTitle": "All projects",
  "proj.sectionSubtitle":
    "A mix of work samples and side experiments - nothing is hidden behind marketing copy.",

  "oss.eyebrow": "GitHub",
  "oss.title": "Open source",
  "oss.introBefore": "A live list of public repositories from",
  "oss.introAfter":
    ", pulled straight from the GitHub API when you load the page.",
  "oss.errorTitle": "Repositories did not load this time",
  "oss.errorHintBefore": "If you are the site owner, adding",
  "oss.errorHintAfter":
    "usually helps with rate limits. A classic PAT or a fine-grained token with read access to public repos is enough.",
  "oss.viewGithub": "View profile on GitHub",
  "oss.reposHeading": "Repositories ({count})",
  "oss.reposBody":
    "Sorted by last push, including forks and archived repos when they still feel worth listing.",
};
