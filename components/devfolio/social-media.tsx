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

const iconBtn =
  "icon-button inline-flex h-[2.6rem] w-[2.6rem] shrink-0 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-foreground";

export function SocialMedia({ className = "" }: { className?: string }) {
  const social = siteConfig.social as SocialMediaConfig | undefined;
  if (social?.display === false) return null;

  return (
    <div
      className={`social-media-div flex flex-wrap justify-center gap-x-1 gap-y-2 text-[2em] md:justify-start ${className}`}
      aria-label="GitHub, LinkedIn, and email"
    >
      {siteConfig.github ? (
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconBtn} bg-[#333]`}
          aria-label="GitHub"
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
          aria-label="LinkedIn"
        >
          <FaLinkedin className="text-[1.3rem]" aria-hidden />
        </a>
      ) : null}
      {siteConfig.email ? (
        <a
          href={`mailto:${siteConfig.email}`}
          className={`${iconBtn} bg-[#ea4335]`}
          aria-label="Email"
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
          aria-label="GitLab"
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
          aria-label="Facebook"
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
          aria-label="Instagram"
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
          aria-label="Twitter"
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
          aria-label="Medium"
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
          aria-label="Stack Overflow"
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
          aria-label="Kaggle"
        >
          <SiKaggle className="text-[1.3rem]" aria-hidden />
        </a>
      ) : null}
    </div>
  );
}
