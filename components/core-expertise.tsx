"use client";

import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { useI18n } from "@/components/providers/i18n-provider";

type TechItem = {
  id: string;
  name: string;
  /** Simple Icons slug for https://cdn.simpleicons.org/{slug} */
  slug?: string;
  color?: string;
  /** Invert the icon in dark mode (for near-black brand marks). */
  invertInDark?: boolean;
  /** Local React icon when Simple Icons CDN has no slug (e.g. OpenAI). */
  Icon?: IconType;
};

type ExpertiseGroupId =
  | "backend"
  | "frontend"
  | "data"
  | "cloudDevops"
  | "iot"
  | "ai";

type ExpertiseGroup = {
  id: ExpertiseGroupId;
  items: TechItem[];
};

const EXPERTISE_GROUPS: ExpertiseGroup[] = [
  {
    id: "backend",
    items: [
      { id: "node", name: "Node.js", slug: "nodedotjs", color: "339933" },
      { id: "laravel", name: "Laravel", slug: "laravel", color: "FF2D20" },
      { id: "express", name: "Express", slug: "express", color: "000000", invertInDark: true },
      { id: "nestjs", name: "NestJS", slug: "nestjs", color: "E0234E" },
      { id: "rest", name: "REST APIs" },
    ],
  },
  {
    id: "frontend",
    items: [
      { id: "ts", name: "TypeScript", slug: "typescript", color: "3178C6" },
      { id: "react", name: "React", slug: "react", color: "61DAFB" },
      { id: "next", name: "Next.js", slug: "nextdotjs", color: "000000", invertInDark: true },
      { id: "flutter", name: "Flutter", slug: "flutter", color: "02569B" },
    ],
  },
  {
    id: "data",
    items: [
      { id: "postgres", name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
      { id: "mysql", name: "MySQL", slug: "mysql", color: "4479A1" },
      { id: "mongo", name: "MongoDB", slug: "mongodb", color: "47A248" },
      { id: "redis", name: "Redis", slug: "redis", color: "DC382D" },
      { id: "supabase", name: "Supabase", slug: "supabase", color: "3ECF8E" },
    ],
  },
  {
    id: "cloudDevops",
    items: [
      { id: "docker", name: "Docker", slug: "docker", color: "2496ED" },
      { id: "k8s", name: "Kubernetes", slug: "kubernetes", color: "326CE5" },
      { id: "terraform", name: "Terraform", slug: "terraform", color: "844FBA" },
      // AWS was removed from cdn.simpleicons.org; use react-icons instead.
      { id: "aws", name: "AWS", Icon: FaAws, color: "FF9900" },
    ],
  },
  {
    id: "iot",
    items: [
      { id: "rpi", name: "Raspberry Pi", slug: "raspberrypi", color: "A22846" },
      { id: "arduino", name: "Arduino", slug: "arduino", color: "00878F" },
      { id: "esp32", name: "ESP32", slug: "espressif", color: "E7352C" },
      { id: "mqtt", name: "MQTT", slug: "mqtt", color: "660066" },
      { id: "cpp", name: "C++", slug: "cplusplus", color: "00599C" },
    ],
  },
  {
    id: "ai",
    items: [
      // OpenAI was removed from cdn.simpleicons.org; use react-icons instead.
      { id: "openai", name: "OpenAI", Icon: SiOpenai, color: "412991" },
      { id: "langchain", name: "LangChain", slug: "langchain", color: "1C3C3C", invertInDark: true },
      { id: "huggingface", name: "Hugging Face", slug: "huggingface", color: "FFD21E" },
      { id: "pytorch", name: "PyTorch", slug: "pytorch", color: "EE4C2C" },
      { id: "ollama", name: "Ollama", slug: "ollama", color: "000000", invertInDark: true },
    ],
  },
];

function TechTile({ tech }: { tech: TechItem }) {
  const { name, slug, color, invertInDark, Icon } = tech;
  const iconSrc =
    !Icon && slug ? `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}` : null;

  return (
    <li className="flex w-[4rem] flex-col items-center gap-1.5 sm:w-[4.5rem]" title={name}>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface/80 shadow-sm ring-1 ring-border dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12">
        {Icon ? (
          <Icon
            aria-hidden
            className={`h-7 w-7 sm:h-8 sm:w-8${invertInDark ? " dark:invert" : ""}`}
            style={color ? { color: `#${color}` } : undefined}
          />
        ) : iconSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconSrc}
            alt=""
            width={32}
            height={32}
            className={`h-7 w-7 object-contain sm:h-8 sm:w-8${invertInDark ? " dark:invert" : ""}`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="text-[10px] font-semibold tracking-tight text-accent" aria-hidden>
            API
          </span>
        )}
      </span>
      <span className="max-w-[4.5rem] text-center text-[10px] font-medium leading-tight text-muted sm:text-xs">
        {name}
      </span>
    </li>
  );
}

export function CoreExpertise() {
  const { t } = useI18n();

  return (
    <div
      className="grid min-w-0 grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2"
      aria-label={t("home.expertiseAria")}
    >
      {EXPERTISE_GROUPS.map((group) => (
        <div key={group.id} className="min-w-0">
          <h3 className="text-sm font-semibold tracking-wide text-foreground">
            {t(`home.expertise.${group.id}`)}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-4 sm:gap-x-4">
            {group.items.map((tech) => (
              <TechTile key={tech.id} tech={tech} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
