import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LegalArticle } from "@/components/legal/legal-article";

export function TermsOfUseBody() {
  const domain = siteConfig.domain.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <LegalArticle>
      <h1>Terms of use</h1>
      <p>
        These terms govern your access to and use of <strong>{domain}</strong> (the “site”) operated by{" "}
        <strong>{siteConfig.fullName}</strong> (“we”, “us”). By using the site, you agree to these terms.
        If you do not agree, please do not use the site. Last updated: 15 April 2026.
      </p>

      <h2>1. Permitted use</h2>
      <p>
        You may view, browse, and use the contact features for lawful, professional purposes. You must not
        misuse the site (including attempting to disrupt security, overload systems, scrape in a way that
        impairs service, or send unlawful, harassing, or deceptive messages through the contact form).
      </p>

      <h2>2. Intellectual property</h2>
      <p>
        Text, layout, branding, and original materials on the site are owned by us or used under
        licence. You may not copy, modify, or redistribute site content for commercial purposes without
        our prior written consent, except as allowed by mandatory law (for example private copying for
        personal reference).
      </p>

      <h2>3. Third-party content and links</h2>
      <p>
        The site may link to third-party sites (for example GitHub or employer pages). We are not
        responsible for third-party content or practices. Their terms and privacy policies apply when
        you leave our site.
      </p>

      <h2>4. Disclaimer</h2>
      <p>
        The site and its content are provided <strong>“as is”</strong> without warranties of any kind,
        whether express or implied, to the fullest extent permitted by law. We do not warrant that the
        site will be uninterrupted, error-free, or free of harmful components.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        To the extent permitted by applicable law, we are not liable for any indirect, incidental,
        special, consequential, or punitive damages, or for loss of profits, data, or goodwill, arising
        from your use of the site. Our aggregate liability for claims relating to the site is limited to
        the greater of one hundred (100) euros or the amount you paid to access the site (which is zero
        for typical browsing), unless mandatory law provides otherwise.
      </p>

      <h2>6. Privacy</h2>
      <p>
        Personal data is processed as described in our{" "}
        <Link href="/legal/privacy">Privacy &amp; GDPR notice</Link> and{" "}
        <Link href="/legal/cookies">Cookie policy</Link>.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update these terms from time to time. The “Last updated” date will change. Material changes
        may also be highlighted on the site where practical. Continued use after changes constitutes
        acceptance of the updated terms where legally permitted.
      </p>

      <h2>8. Governing law and disputes</h2>
      <p>
        These terms are governed by the laws of <strong>Finland</strong>, without regard to
        conflict-of-law rules. Courts in Finland have non-exclusive jurisdiction, unless mandatory
        consumer protection rules in your country grant you additional rights.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <br />
        Data-related requests: <a href="mailto:gdpr@awunjia.com">gdpr@awunjia.com</a>
      </p>
    </LegalArticle>
  );
}
