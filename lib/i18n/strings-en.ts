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
  "footer.legalCookies": "Cookie policy",
  "footer.legalPrivacy": "Privacy & GDPR",
  "footer.legalTerms": "Terms of use",
  "footer.cookieSettings": "Cookie settings",

  "theme.toggle": "Toggle dark mode",

  "a11y.backToTop": "Back to top",

  "home.ariaOverview": "Overview",
  "home.role": "Full-stack software engineer",
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
  "home.proficiency.frontend": "Frontend",
  "home.proficiency.backend": "Backend",
  "home.proficiency.programming": "Programming",
  "home.delivery.mobileTitle": "Mobile apps",
  "home.delivery.mobileBody":
    "Flutter work when a native-feeling mobile client is the right fit - thoughtful UX and builds that stay practical to ship.",
  "home.delivery.webTitle": "Web apps and dashboards",
  "home.delivery.webBody":
    "Web apps and dashboards with Next.js, REST or GraphQL APIs, auth, and views that stay readable when data piles up.",
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
  "home.techMarqueeAria": "Technology stack",

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
  "profile.degreeLine": "Information Technology",
  "profile.spokenLanguagesValue": "English, Finnish",
  "profile.timezoneValue": "Eastern European Time (EET)",
  "profile.availabilityPitch":
    "Happy to chat about full-time or contract work - remote or hybrid.",

  "social.ariaGroup": "GitHub, LinkedIn, and email",
  "social.github": "GitHub",
  "social.linkedin": "LinkedIn",
  "social.email": "Email",
  "social.gitlab": "GitLab",
  "social.facebook": "Facebook",
  "social.instagram": "Instagram",
  "social.twitter": "Twitter",
  "social.medium": "Medium",
  "social.stackoverflow": "Stack Overflow",
  "social.kaggle": "Kaggle",

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
  "form.turnstileError":
    "The security check did not load (code {code}). Cloudflare treats localhost and 127.0.0.1 as different hosts: add both in the widget if you use either. Try another browser, disable extensions (ad blockers), and pause VPNs. Error 300* can also mean the challenge could not finish in this environment.",
  "form.turnstileRetry": "Try security check again",
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
  "form.errorDetailsPrefix": "Details:",

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
  "about.bio":
    "I like turning fuzzy requirements into software that feels steady - clear structure where it helps, tests where they earn their keep, and UX that stays kind to both users and whoever opens the repo next.",

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
  "skills.stack.languagesWeb.title": "Languages & web foundations",
  "skills.stack.languagesWeb.description":
    "The languages, markup, and styling layers I reach for when shaping product UI.",
  "skills.stack.frontendUi.title": "Frontend frameworks & UI delivery",
  "skills.stack.frontendUi.description":
    "How I like to structure UI work - components, SPA or SSR stacks, state, and build tooling that stays approachable.",
  "skills.stack.backendApis.title": "Backend, APIs & application data",
  "skills.stack.backendApis.description":
    "Services, ORMs, and integration patterns - from friendly monoliths to smaller modular APIs.",
  "skills.stack.datastores.title": "Datastores & caching",
  "skills.stack.datastores.description":
    "Relational and document models, migrations, and light caching when a page needs a little extra air.",
  "skills.stack.mobileRealtime.title": "Mobile & real-time client",
  "skills.stack.mobileRealtime.description":
    "Flutter apps with reactive state, maps, push messaging, and Supabase or Firebase when the product calls for it.",
  "skills.stack.cloudPlatform.title": "Cloud, containers & platform",
  "skills.stack.cloudPlatform.description":
    "Packaging, orchestration, IaC, and hosting choices that keep deploys boring in a good way.",

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
  "proj.cardCode": "Code",
  "proj.cardLive": "Live site",
  "proj.ariaTechnologies": "Technologies",
  "proj.items.portfolio.title": "Portfolio platform",
  "proj.items.portfolio.description":
    "A calm portfolio site driven from typed config, with App Router patterns, Docker packaging, and a CV export when someone asks for a PDF.",
  "proj.items.apiToolkit.title": "API toolkit",
  "proj.items.apiToolkit.description":
    "Typed REST handlers, validation, and structured errors so clients always know what happened.",

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
  "oss.reposEmpty": "No public repositories found for this account.",
  "oss.repoArchived": "Archived",
  "oss.repoFork": "Fork",
  "oss.repoNoDescription": "No description on GitHub yet.",
  "oss.repoStars": "{count} stars",
  "oss.repoForks": "{count} forks",
  "oss.repoUpdated": "Updated {date}",
  "oss.repoOpen": "Repository",
  "oss.repoWebsite": "Website",
  "oss.repoTopicsAria": "Topics",

  "github.statsAria": "GitHub statistics",
  "github.statsTitle": "GitHub at a glance",
  "github.statsIntro":
    "Public counts for {handle} - cached for about an hour so the page stays snappy.",
  "github.openProfile": "Open GitHub profile",
  "github.statRepos": "Public repositories",
  "github.statFollowers": "Followers",
  "github.statFollowing": "Following",

  "meta.home.title": "Overview",
  "meta.home.description": "{name} - {role}. {tagline}",
  "meta.skills.title": "Skills",
  "meta.skills.description": "A relaxed tour of tools and stacks for {name} - {role}.",
  "meta.skills.ogDescription": "{tagline}",
  "meta.education.title": "Education",
  "meta.education.description":
    "Education for {name} - {degree} at {school}, and prior studies.",
  "meta.education.ogDescription": "{degree}, {school}",
  "meta.about.title": "Work experience",
  "meta.about.description":
    "A friendly walk through work experience for {name} - mostly full-stack web, Laravel, and a little Flutter IoT.",
  "meta.about.ogDescription": "{bio}",
  "meta.contact.title": "Contact",
  "meta.contact.description": "A simple way to reach {name} - leave a note from this page.",
  "meta.projects.title": "Projects",
  "meta.projects.description":
    "A small set of projects by {name}, kept in site configuration.",
  "meta.oss.title": "Open Source",
  "meta.oss.description": "Public GitHub repositories from {name}.",
  "meta.oss.ogDescription": "Repositories from {handle} on GitHub.",

  "meta.keywords":
    "Awunjia Serge, Serge Awunjia, hire developer Finland, remote full-stack developer, contract software engineer Europe, Helsinki software engineer, Finland full-stack developer, Laravel developer jobs, Next.js developer, Flutter developer, TypeScript engineer, open to work developer, software engineer available, Novia UAS Vaasa, University of Buea computer science, GitHub awunjia, LinkedIn Awunjia Serge, Groweo, Sbotech, portfolio website",

  "seo.hiringMetaLine":
    "Open to full-time, contract, and remote-friendly software engineering roles.",

  "meta.legal.cookiesTitle": "Cookie policy",
  "meta.legal.cookiesDescription":
    "How this portfolio uses cookies and similar technologies, including on the contact form where applicable.",
  "meta.legal.privacyTitle": "Privacy & GDPR",
  "meta.legal.privacyDescription":
    "How personal data is processed, your rights under the GDPR, and how to contact us or request deletion.",
  "meta.legal.termsTitle": "Terms of use",
  "meta.legal.termsDescription": "Terms governing use of this website and its contact features.",

  "cookies.bannerTitle": "Cookies & your privacy",
  "cookies.bannerBody":
    "We use essential cookies to remember your consent. If you allow preferences, we remember your theme and language. You can change your choice anytime.",
  "cookies.acceptAll": "Accept all",
  "cookies.rejectNonEssential": "Reject non-essential",
  "cookies.managePreferences": "Manage preferences",
  "cookies.savePreferences": "Save choices",
  "cookies.close": "Close",
  "cookies.necessaryTitle": "Strictly necessary",
  "cookies.necessaryBody":
    "Required to operate the site and remember your consent. These cannot be switched off.",
  "cookies.necessaryStatus": "Always on",
  "cookies.preferencesTitle": "Preferences",
  "cookies.preferencesBody":
    "Remembers your theme (light/dark) and language selection so the site feels familiar when you return.",
  "cookies.statisticsTitle": "Statistics (optional)",
  "cookies.statisticsBody":
    "No analytics cookies are active on this site today. If that changes, this switch will control them.",
  "cookies.legalIntro": "Read the",
  "cookies.and": "and",
  "cookies.themeLockedHint":
    "Enable preference cookies in the privacy banner to save your theme choice.",
};
