"use client";

import type { IconType } from "react-icons";
import { FaAws, FaDatabase } from "react-icons/fa";
import { MdOutlineCloudQueue } from "react-icons/md";
import {
  SiCss,
  SiDart,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGooglemaps,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiKubernetes,
  SiLaravel,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiRedux,
  SiSass,
  SiSupabase,
  SiSvelte,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
  SiWebpack,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { useReducedMotion } from "framer-motion";

export type TechMarqueeItem = {
  id: string;
  name: string;
  /** Official / brand hex (Simple Icons); omit when `monochrome` */
  color?: string;
  Icon: IconType;
  /** Dark logo — use black + dark:invert for contrast on tiles */
  monochrome?: boolean;
};

/** Row 1 — scrolls left */
export const TECH_MARQUEE_ROW_LEFT: TechMarqueeItem[] = [
  { id: "ts", name: "TypeScript", color: "#3178C6", Icon: SiTypescript },
  { id: "js", name: "JavaScript", color: "#F7DF1E", Icon: SiJavascript },
  { id: "html5", name: "HTML5", color: "#E34F26", Icon: SiHtml5 },
  { id: "css", name: "CSS3", color: "#1572B6", Icon: SiCss },
  { id: "sass", name: "Sass", color: "#CC6699", Icon: SiSass },
  { id: "react", name: "React", color: "#61DAFB", Icon: SiReact },
  { id: "next", name: "Next.js", monochrome: true, Icon: SiNextdotjs },
  { id: "vue", name: "Vue.js", color: "#4FC08D", Icon: SiVuedotjs },
  { id: "svelte", name: "Svelte", color: "#FF3E00", Icon: SiSvelte },
  { id: "node", name: "Node.js", color: "#339933", Icon: SiNodedotjs },
  { id: "php", name: "PHP", color: "#777BB4", Icon: SiPhp },
  { id: "laravel", name: "Laravel", color: "#FF2D20", Icon: SiLaravel },
  { id: "tailwind", name: "Tailwind CSS", color: "#06B6D4", Icon: SiTailwindcss },
  { id: "vite", name: "Vite", color: "#646CFF", Icon: SiVite },
  { id: "webpack", name: "Webpack", color: "#8DD6F9", Icon: SiWebpack },
  { id: "prisma", name: "Prisma", color: "#5A67D8", Icon: SiPrisma },
  { id: "redux", name: "Redux", color: "#764ABC", Icon: SiRedux },
  { id: "github", name: "GitHub", monochrome: true, Icon: SiGithub },
];

/** Row 2 — scrolls right */
export const TECH_MARQUEE_ROW_RIGHT: TechMarqueeItem[] = [
  { id: "postgres", name: "PostgreSQL", color: "#336791", Icon: SiPostgresql },
  { id: "mysql", name: "MySQL", color: "#4479A1", Icon: SiMysql },
  { id: "mongo", name: "MongoDB", color: "#47A248", Icon: SiMongodb },
  {
    id: "eloquent",
    name: "Eloquent",
    color: "#FF2D20",
    Icon: FaDatabase,
  },
  { id: "redis", name: "Redis", color: "#DC382D", Icon: SiRedis },
  { id: "docker", name: "Docker", color: "#2496ED", Icon: SiDocker },
  { id: "k8s", name: "Kubernetes", color: "#326CE5", Icon: SiKubernetes },
  { id: "terraform", name: "Terraform", color: "#7B42BC", Icon: SiTerraform },
  { id: "git", name: "Git", color: "#F05032", Icon: SiGit },
  { id: "aws", name: "AWS", color: "#FF9900", Icon: FaAws },
  { id: "firebase", name: "Firebase", color: "#FFCA28", Icon: SiFirebase },
  { id: "flutter", name: "Flutter", color: "#02569B", Icon: SiFlutter },
  { id: "getx", name: "GetX", color: "#0175C2", Icon: SiDart },
  {
    id: "fcm",
    name: "FCM",
    color: "#FFCA28",
    Icon: MdOutlineCloudQueue,
  },
  { id: "mapsdk", name: "MapSDK", color: "#4285F4", Icon: SiGooglemaps },
  { id: "graphql", name: "GraphQL", color: "#E10098", Icon: SiGraphql },
  { id: "nginx", name: "NGINX", color: "#009639", Icon: SiNginx },
  { id: "express", name: "Express", monochrome: true, Icon: SiExpress },
  { id: "nestjs", name: "NestJS", color: "#E0234E", Icon: SiNestjs },
  { id: "supabase", name: "Supabase", color: "#3ECF8E", Icon: SiSupabase },
  { id: "vercel", name: "Vercel", monochrome: true, Icon: SiVercel },
  { id: "linux", name: "Linux", color: "#FCC624", Icon: SiLinux },
  { id: "rest", name: "REST APIs", color: "#09D3AC", Icon: TbApi },
];

function TechTile({ tech }: { tech: TechMarqueeItem }) {
  const { Icon, name, monochrome } = tech;
  return (
    <div
      className="flex w-[4rem] shrink-0 flex-col items-center gap-1.5 sm:w-[4.75rem]"
      title={name}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface/80 shadow-sm ring-1 ring-border dark:bg-white/[0.06] dark:ring-white/10 sm:h-14 sm:w-14">
        <Icon
          className={
            monochrome
              ? "h-8 w-8 text-black dark:invert sm:h-9 sm:w-9"
              : "h-8 w-8 sm:h-9 sm:w-9"
          }
          style={monochrome || !tech.color ? undefined : { color: tech.color }}
          aria-hidden
        />
      </span>
      <span className="max-w-[5rem] text-center text-[10px] font-medium leading-tight text-muted sm:text-xs">
        {name}
      </span>
    </div>
  );
}

const marqueeGapClass = "gap-4 sm:gap-5 md:gap-6";
const staticGridGapClass = "gap-x-5 gap-y-6 px-1 sm:gap-x-6";

function MarqueeRow({
  items,
  direction,
}: {
  items: TechMarqueeItem[];
  direction: "left" | "right";
}) {
  const reduceMotion = useReducedMotion();
  const loop = reduceMotion ? items : [...items, ...items];

  return (
    <div className="marquee-fade-x relative min-w-0 overflow-hidden py-2">
      <div
        className={
          reduceMotion
            ? `flex w-full flex-wrap justify-center ${staticGridGapClass}`
            : `flex w-max shrink-0 flex-nowrap ${marqueeGapClass} ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`
        }
      >
        {loop.map((tech, i) => (
          <TechTile key={`${tech.id}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="min-w-0 space-y-1.5 md:space-y-3" aria-label="Technology stack">
      <MarqueeRow items={TECH_MARQUEE_ROW_LEFT} direction="left" />
      <MarqueeRow items={TECH_MARQUEE_ROW_RIGHT} direction="right" />
    </div>
  );
}
