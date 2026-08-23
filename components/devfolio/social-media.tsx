"use client";

/**
 * Circular social icons - DeveloperFolio SocialMedia.scss
 * https://github.com/saadpasta/developerFolio/blob/master/src/components/socialMedia/SocialMedia.scss
 *
 * Inline SVGs (not react-icons) so Turbopack does not load multi‑MB icon barrels on every home refresh.
 */
import { siteConfig, type SocialMediaConfig } from "@/config/site";
import { useI18n } from "@/components/providers/i18n-provider";

const iconBtn =
  "icon-button inline-flex h-[2.6rem] w-[2.6rem] shrink-0 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-foreground";

function IconGithub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconEmail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function IconGitlab({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 0 0-.867 0L16.418 9.45H7.582L4.919 1.263a.455.455 0 0 0-.867 0L1.388 9.452.046 13.587a.924.924 0 0 0 .331 1.023L12 23.054l11.623-8.443a.92.92 0 0 0 .332-1.024" />
    </svg>
  );
}

export function SocialMedia({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  const social = siteConfig.social as SocialMediaConfig | undefined;
  if (social?.display === false) return null;

  return (
    <div
      className={`social-media-div flex flex-wrap justify-center gap-x-1 gap-y-2 text-[2em] md:justify-start ${className}`}
      aria-label={t("social.ariaGroup")}
    >
      {siteConfig.github ? (
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconBtn} bg-[#333]`}
          aria-label={t("social.github")}
        >
          <IconGithub className="h-[1.3rem] w-[1.3rem]" />
        </a>
      ) : null}
      {siteConfig.linkedin ? (
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconBtn} bg-[#0e76a8]`}
          aria-label={t("social.linkedin")}
        >
          <IconLinkedin className="h-[1.3rem] w-[1.3rem]" />
        </a>
      ) : null}
      {siteConfig.email ? (
        <a
          href={`mailto:${siteConfig.email}`}
          className={`${iconBtn} bg-[#ea4335]`}
          aria-label={t("social.email")}
        >
          <IconEmail className="h-[1.3rem] w-[1.3rem]" />
        </a>
      ) : null}
      {social?.gitlab ? (
        <a
          href={social.gitlab}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconBtn} bg-[#fca326]`}
          aria-label={t("social.gitlab")}
        >
          <IconGitlab className="h-[1.3rem] w-[1.3rem]" />
        </a>
      ) : null}
    </div>
  );
}
