"use client";

/**
 * Circular social icons — DeveloperFolio SocialMedia.scss
 * https://github.com/saadpasta/developerFolio/blob/master/src/components/socialMedia/SocialMedia.scss
 */
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaGitlab,
  FaMedium,
  FaStackOverflow,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { SiKaggle } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { siteConfig, type SocialMediaConfig } from "@/config/site";
import { useI18n } from "@/components/providers/i18n-provider";

const iconBtn =
  "icon-button inline-flex h-[2.6rem] w-[2.6rem] shrink-0 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-foreground";

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
          <FaGithub className="text-[1.3rem]" aria-hidden />
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
          <FaLinkedin className="text-[1.3rem]" aria-hidden />
        </a>
      ) : null}
      {siteConfig.email ? (
        <a
          href={`mailto:${siteConfig.email}`}
          className={`${iconBtn} bg-[#ea4335]`}
          aria-label={t("social.email")}
        >
          <MdEmail className="text-[1.3rem]" aria-hidden />
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
          <FaGitlab className="text-[1.3rem]" aria-hidden />
        </a>
      ) : null}
      {social?.facebook ? (
        <a
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconBtn} bg-[#3b5998]`}
          aria-label={t("social.facebook")}
        >
          <FaFacebook className="text-[1.3rem]" aria-hidden />
        </a>
      ) : null}
      {social?.instagram ? (
        <a
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconBtn} bg-[#c13584]`}
          aria-label={t("social.instagram")}
        >
          <FaInstagram className="text-[1.3rem]" aria-hidden />
        </a>
      ) : null}
      {social?.twitter ? (
        <a
          href={social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconBtn} bg-[#1da1f2]`}
          aria-label={t("social.twitter")}
        >
          <FaTwitter className="text-[1.3rem]" aria-hidden />
        </a>
      ) : null}
      {social?.medium ? (
        <a
          href={social.medium}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconBtn} bg-black`}
          aria-label={t("social.medium")}
        >
          <FaMedium className="text-[1.3rem]" aria-hidden />
        </a>
      ) : null}
      {social?.stackoverflow ? (
        <a
          href={social.stackoverflow}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconBtn} bg-[#f48024]`}
          aria-label={t("social.stackoverflow")}
        >
          <FaStackOverflow className="text-[1.3rem]" aria-hidden />
        </a>
      ) : null}
      {social?.kaggle ? (
        <a
          href={social.kaggle}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconBtn} bg-[#20beff]`}
          aria-label={t("social.kaggle")}
        >
          <SiKaggle className="text-[1.3rem]" aria-hidden />
        </a>
      ) : null}
    </div>
  );
}
