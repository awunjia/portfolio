"use client";

import Link from "next/link";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import type { ProjectView } from "@/lib/projects";
import { useI18n } from "@/components/providers/i18n-provider";

type ProjectCardProps = {
  project: ProjectView;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const cover = project.images[0];
  const logo = project.logo;
  const showWordmark = project.coverWordmark;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{
        duration: 0.4,
        delay: reduceMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/30">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 bg-gradient-to-br from-accent/20 via-skills/10 to-transparent"
              aria-hidden
            />
            {showWordmark ? (
              <p
                className="devfolio-logo absolute inset-x-3 top-1/2 -translate-y-1/2 text-center text-2xl leading-tight text-foreground sm:text-3xl"
                aria-hidden
              >
                {siteConfig.fullName}
              </p>
            ) : logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt=""
                className="absolute left-1/2 top-1/2 max-h-[72%] w-auto max-w-[88%] -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : null}
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="flex flex-wrap gap-2" aria-label={t("proj.ariaTechnologies")}>
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-skills/30 bg-skills/10 px-2.5 py-0.5 text-xs font-medium text-card-subtitle dark:text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          {project.githubUrl ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-link underline-offset-4 hover:underline"
            >
              {t("proj.cardCode")}
              <HiOutlineArrowTopRightOnSquare className="size-3.5 shrink-0" aria-hidden />
            </Link>
          ) : (
            <span />
          )}
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-link underline-offset-4 hover:underline"
            >
              {t("proj.cardLive")}
              <HiOutlineArrowTopRightOnSquare className="size-3.5 shrink-0" aria-hidden />
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
