import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import fs from "node:fs";
import path from "node:path";
import {
  CV_DEFAULT_SKILL_GROUP_ITEMS,
  getCvLocaleBundle,
} from "@/config/cv-locale";
import { siteConfig } from "@/config/site";
import { getBaseUrl } from "@/lib/base-url";
import { getCvPdfStrings } from "@/lib/i18n/cv-copy";
import type { Locale } from "@/lib/i18n/locale";

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: path.join(
        process.cwd(),
        "node_modules/@fontsource/montserrat/files/montserrat-latin-400-normal.woff",
      ),
      fontWeight: 400,
    },
    {
      src: path.join(
        process.cwd(),
        "node_modules/@fontsource/montserrat/files/montserrat-latin-500-normal.woff",
      ),
      fontWeight: 500,
    },
    {
      src: path.join(
        process.cwd(),
        "node_modules/@fontsource/montserrat/files/montserrat-latin-700-normal.woff",
      ),
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 30,
    paddingHorizontal: 28,
    fontFamily: "Montserrat",
    fontSize: 9.2,
    color: "#1f2937",
    lineHeight: 1.42,
    backgroundColor: "#ffffff",
  },
  hero: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
  },
  heroContent: {
    flex: 1,
    paddingRight: 14,
  },
  avatarBox: {
    width: 76,
    height: 76,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  avatarPlaceholder: {
    fontSize: 8,
    color: "#6b7280",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  name: {
    fontSize: 21,
    fontWeight: 700,
    marginBottom: 8,
    lineHeight: 1.15,
    color: "#111827",
  },
  role: {
    fontSize: 11,
    fontWeight: 500,
    color: "#55198b",
    marginBottom: 10,
    lineHeight: 1.25,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
    marginBottom: 4,
  },
  contactItem: {
    fontSize: 9.2,
    color: "#55198b",
    textDecoration: "none",
  },
  muted: {
    fontSize: 9.1,
    color: "#6b7280",
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    color: "#111827",
    marginTop: 7,
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 2,
  },
  body: {
    fontSize: 9,
    color: "#374151",
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 5,
    gap: 8,
  },
  expTitle: {
    fontWeight: 700,
    fontSize: 9.8,
    color: "#111827",
    flex: 1,
  },
  expMeta: {
    fontSize: 8.8,
    color: "#6b7280",
    textAlign: "right",
    maxWidth: 150,
  },
  company: {
    fontSize: 9.2,
    color: "#4b5563",
    marginTop: 1,
    fontWeight: 500,
  },
  bullet: {
    flexDirection: "row",
    marginTop: 2,
    paddingLeft: 2,
  },
  bulletDot: {
    width: 8,
    fontSize: 8.6,
    color: "#6b7280",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#4b5563",
    lineHeight: 1.35,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    marginTop: 3,
  },
  chip: {
    fontSize: 7.2,
    paddingHorizontal: 5,
    paddingVertical: 1.8,
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
    borderRadius: 3,
  },
  skillGroup: {
    marginTop: 3,
  },
  skillGroupTitle: {
    fontSize: 8.4,
    fontWeight: 700,
    color: "#374151",
  },
  skillGroupBody: {
    marginTop: 1,
    fontSize: 8.3,
    color: "#4b5563",
    lineHeight: 1.35,
  },
  projectTitle: {
    fontWeight: 700,
    fontSize: 9.4,
    marginTop: 4,
    color: "#111827",
  },
  compactBlock: {
    marginBottom: 5,
  },
});

/** Keep skill blocks shorter so page 1 stays on one A4 sheet with experience. */
const CV_SKILL_ITEMS_PER_GROUP = 10;

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bullet} wrap={false}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

export function CvPdfDocument({ locale = "en" }: { locale?: Locale }) {
  const cfg = siteConfig;
  const copy = getCvPdfStrings(locale);
  const bundle = getCvLocaleBundle(locale);
  const placeholders = cfg.cvPlaceholders;
  const baseUrl = getBaseUrl();
  const avatarPath = cfg.profile.avatarSrc
    ? path.join(process.cwd(), "public", cfg.profile.avatarSrc.replace(/^\//, ""))
    : "";
  const avatarSrc = avatarPath && fs.existsSync(avatarPath) ? avatarPath : undefined;
  const avatarFallback = cfg.profile.avatarSrc ? `${baseUrl}${cfg.profile.avatarSrc}` : undefined;
  const initials = `${cfg.firstName[0] ?? ""}${cfg.lastName[0] ?? ""}`.toUpperCase();

  const shorten = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength - 1).trimEnd()}...` : text;

  const groupedSkills = copy.skillGroupTitles.map((title, i) => {
    const baseItems = bundle?.skillGroups[i] ?? CV_DEFAULT_SKILL_GROUP_ITEMS[i]!;
    return {
      title,
      items: [...baseItems].slice(0, CV_SKILL_ITEMS_PER_GROUP),
    };
  });
  const [cvSummary, cvGrowthMindset] = copy.summaryParagraphs;

  const experienceForCv = cfg.experience.map((job, i) => {
    const row = bundle?.experience[i];
    if (!row) return job;
    return {
      ...job,
      role: row.role,
      summary: row.summary,
      ...(row.location !== undefined ? { location: row.location } : {}),
    };
  });
  const compactExperience = experienceForCv.map((job) => ({
    ...job,
    summary: shorten(job.summary, 125),
    techStack: job.techStack?.slice(0, 5),
  }));
  const experiencePage1 = compactExperience.slice(0, 2);
  const experiencePage2 = compactExperience.slice(2);

  const educationForCv = cfg.education.map((edu, i) => {
    const row = bundle?.education[i];
    if (!row) return edu;
    return {
      ...edu,
      school: row.school,
      field: row.field,
      summary: row.summary,
      highlights: [...row.highlights],
    };
  });
  const compactEducation = educationForCv.map((edu) => ({
    ...edu,
    summary: shorten(edu.summary, 115),
    highlights: edu.highlights?.slice(0, 2).map((item) => shorten(item, 62)),
  }));

  const projectsForCv = cfg.projects.slice(0, 2).map((project, i) => {
    const row = bundle?.projects[i];
    if (!row) return project;
    return { ...project, title: row.title, description: row.description };
  });
  const compactProjects = projectsForCv.map((project) => ({
    ...project,
    description: shorten(project.description, 118),
    techStack: project.techStack.slice(0, 5),
  }));

  const proficiencyForCv = cfg.proficiency.map((p, i) => {
    const row = bundle?.proficiency[i];
    return row ? { ...p, label: row.label, percentage: row.percentage } : p;
  });

  const roleDisplay = bundle?.role ?? cfg.role;
  const cityCountryDisplay = bundle?.cityCountry ?? `${cfg.city}, ${cfg.country}`;
  const timezoneDisplay = bundle?.profileTimezone ?? cfg.profile.timezone;
  const languagesDisplay = bundle?.profileLanguages ?? cfg.profile.languages;
  const availabilityDisplay = bundle?.profileAvailability ?? cfg.profile.availability;
  const addressDisplay = bundle?.contactAddress ?? placeholders.address;

  return (
    <Document
      title={`${copy.documentTitle} - ${cfg.fullName}`}
      author={cfg.fullName}
      subject={copy.documentSubject}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.name}>{cfg.fullName}</Text>
            <Text style={styles.role}>{roleDisplay}</Text>
            <View style={styles.contactRow}>
              <Link src={`mailto:${cfg.email}`} style={styles.contactItem}>
                {cfg.email}
              </Link>
              <Link src={cfg.github} style={styles.contactItem}>
                GitHub
              </Link>
              <Link src={cfg.linkedin} style={styles.contactItem}>
                LinkedIn
              </Link>
              <Link src={cfg.domain} style={styles.contactItem}>
                {copy.linkWebsite}
              </Link>
            </View>
            <Text style={styles.muted}>{cityCountryDisplay}</Text>
            <Text style={[styles.muted, { marginTop: 2 }]}>{timezoneDisplay}</Text>
            <Text style={[styles.muted, { marginTop: 4 }]}>
              {copy.contactPhone}: {placeholders.phone} - {copy.contactAddress}:{" "}
              {addressDisplay}
            </Text>
            <Text style={[styles.muted, { marginTop: 2 }]}>
              {copy.contactLanguages}: {languagesDisplay}
            </Text>
          </View>
          <View style={styles.avatarBox}>
            {avatarSrc ? (
              // react-pdf `Image` is not a DOM `<img>` - alt is unsupported here
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={avatarSrc} style={styles.avatar} />
            ) : avatarFallback ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={avatarFallback} style={styles.avatar} />
            ) : (
              <Text style={styles.avatarPlaceholder}>{initials}</Text>
            )}
          </View>
        </View>

        <Text style={styles.sectionTitle}>{copy.sections.summary}</Text>
        <Text style={styles.body}>{cvSummary}</Text>
        <Text style={[styles.body, { marginTop: 4 }]}>{cvGrowthMindset}</Text>

        <Text style={styles.sectionTitle}>{copy.sections.coreSkills}</Text>
        {groupedSkills.map((group) => (
          <View key={group.title} style={styles.skillGroup}>
            <Text style={styles.skillGroupTitle}>{group.title}</Text>
            <Text style={styles.skillGroupBody}>{group.items.join(" - ")}</Text>
          </View>
        ))}
        <View style={styles.chips}>
          {proficiencyForCv.map((p) => (
            <Text key={p.label} style={styles.chip}>
              {p.label}: {p.percentage}%
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{copy.sections.experience}</Text>
        {experiencePage1.map((job) => (
          <View key={`${job.company}-${job.period}`} style={styles.compactBlock}>
            <View style={styles.expHeader}>
              <Text style={styles.expTitle}>{job.role}</Text>
              <Text style={styles.expMeta}>{job.period}</Text>
            </View>
            <Text style={styles.company}>
              {job.company}
              {job.location ? ` · ${job.location}` : ""}
            </Text>
            <Text style={[styles.body, { marginTop: 3 }]}>{job.summary}</Text>
            {job.techStack && job.techStack.length > 0 ? (
              <View style={styles.chips}>
                {job.techStack.map((t) => (
                  <Text key={t} style={styles.chip}>
                    {t}
                  </Text>
                ))}
              </View>
            ) : null}
          </View>
        ))}
      </Page>

      <Page size="A4" style={styles.page}>
        {experiencePage2.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>{copy.sections.experience}</Text>
            {experiencePage2.map((job) => (
              <View key={`${job.company}-${job.period}`} style={styles.compactBlock}>
                <View style={styles.expHeader}>
                  <Text style={styles.expTitle}>{job.role}</Text>
                  <Text style={styles.expMeta}>{job.period}</Text>
                </View>
                <Text style={styles.company}>
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </Text>
                <Text style={[styles.body, { marginTop: 3 }]}>{job.summary}</Text>
                {job.techStack && job.techStack.length > 0 ? (
                  <View style={styles.chips}>
                    {job.techStack.map((t) => (
                      <Text key={t} style={styles.chip}>
                        {t}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </>
        ) : null}
        <Text style={styles.sectionTitle}>{copy.sections.education}</Text>
        {compactEducation.map((edu) => (
          <View
            key={`${edu.school}-${edu.period}`}
            style={{ marginBottom: 6 }}
          >
            <View style={styles.expHeader}>
              <Text style={styles.expTitle}>{edu.field}</Text>
              <Text style={styles.expMeta}>{edu.period}</Text>
            </View>
            <Text style={styles.company}>
              {edu.school} · {edu.location}
            </Text>
            <Text style={[styles.body, { marginTop: 4 }]}>{edu.summary}</Text>
            {edu.highlights?.map((h) => (
              <Bullet key={h}>{h}</Bullet>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>{copy.sections.highlightedProjects}</Text>
        {compactProjects.map((p) => (
          <View key={p.title} style={{ marginBottom: 6 }}>
            <Text style={styles.projectTitle}>{p.title}</Text>
            <Text style={styles.body}>{p.description}</Text>
            <View style={styles.chips}>
              {p.techStack.map((t) => (
                <Text key={t} style={styles.chip}>
                  {t}
                </Text>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>{copy.sections.availability}</Text>
        <Text style={styles.body}>{availabilityDisplay}</Text>
      </Page>
    </Document>
  );
}
