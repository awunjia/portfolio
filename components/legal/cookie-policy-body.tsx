import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LegalArticle } from "@/components/legal/legal-article";

export function CookiePolicyBody() {
  const domain = siteConfig.domain.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <LegalArticle>
      <h1>Cookie policy</h1>
      <p>
        This policy explains how <strong>{siteConfig.fullName}</strong> (“we”, “us”) uses cookies and
        similar technologies on <strong>{domain}</strong> (the “site”). It is designed to align with
        the EU ePrivacy rules and the GDPR transparency requirements. Last updated: 15 April 2026.
      </p>

      <h2>1. Who is responsible?</h2>
      <p>
        The controller for personal data collected through the site is{" "}
        <strong>{siteConfig.fullName}</strong>, reachable at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. For data-protection requests,
        including deletion, you may also contact <a href="mailto:gdpr@awunjia.com">gdpr@awunjia.com</a>.
      </p>

      <h2>2. What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device. We also use similar technologies such as
        local storage where they serve the same purpose (for example remembering your interface choices).
      </p>

      <h2>3. How we ask for consent</h2>
      <p>
        On your first visit, we show a consent layer. You can accept all optional categories, reject
        non-essential processing, or open “Manage preferences” to choose separately. You can reopen
        settings at any time via the “Cookie settings” link in the site footer.
      </p>

      <h2>4. Categories we use</h2>

      <h3>4.1 Strictly necessary</h3>
      <p>
        These technologies are required to run the site and remember your consent choice. They are not
        used for advertising. They include:
      </p>
      <ul>
        <li>
          <strong>Consent cookie</strong> (<code>cc_consent</code>) — stores your choices (version,
          preferences, statistics flags) for up to 180 days so we do not ask you on every visit.
        </li>
      </ul>

      <h3>4.2 Preference cookies and storage</h3>
      <p>If you enable “Preferences”, we may store:</p>
      <ul>
        <li>
          <strong>Theme</strong> — light or dark mode via <code>next-themes</code> (typically under the
          key <code>portfolio-theme</code> in your browser&apos;s local storage).
        </li>
        <li>
          <strong>Language</strong> — your selected UI language (local storage and a first-party cookie
          so server-rendered metadata can follow your choice where possible).
        </li>
      </ul>
      <p>If you reject non-essential options, we do not persist these choices and defaults apply.</p>

      <h3>4.3 Statistics</h3>
      <p>
        Optional analytics are <strong>not active</strong> on this site at the time of writing. If that
        changes, this policy will be updated and the consent layer will control loading of any new
        scripts.
      </p>

      <h2>5. Cloudflare Turnstile (contact form)</h2>
      <p>
        When you use the contact form and a site key is configured, <strong>Cloudflare Turnstile</strong>{" "}
        may load. Turnstile processes technical data (such as browser characteristics and interaction
        signals) to distinguish humans from automated abuse. We rely on{" "}
        <strong>legitimate interests</strong> (Article 6(1)(f) GDPR) to protect the site and inboxes from
        spam, balanced against your rights. Cloudflare acts as a processor; see Cloudflare&apos;s
        privacy documentation for details of their processing and any transfers outside the EEA.
      </p>

      <h2>6. Retention</h2>
      <ul>
        <li>Consent cookie: up to 180 days, then renewed only if you continue using the site.</li>
        <li>Preference data: kept until you clear it, withdraw consent, or we update the site.</li>
        <li>
          Contact form: when you write to us, we may process your name, email, message, uploaded files, and
          technical data such as your IP address as explained in the{" "}
          <Link href="/legal/privacy">Privacy &amp; GDPR notice</Link>. We use that information only to
          reply; we do not sell it to third parties.
        </li>
      </ul>

      <h2>7. Withdrawing consent</h2>
      <p>
        Use “Cookie settings” in the footer to change or withdraw optional categories. You can also
        delete cookies in your browser settings. Withdrawing consent does not affect the lawfulness of
        processing carried out before withdrawal.
      </p>

      <h2>8. Updates</h2>
      <p>
        We may update this policy when our site or partners change. Material changes will be reflected
        here and, where appropriate, in the consent layer.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about cookies: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <br />
        Data protection / GDPR requests: <a href="mailto:gdpr@awunjia.com">gdpr@awunjia.com</a>
      </p>
    </LegalArticle>
  );
}
