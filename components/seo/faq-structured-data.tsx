import { buildFaqSeoGraph } from "@/lib/seo/faq-graph";

/** FAQPage structured data for AEO / rich results (home). */
export function FaqStructuredData() {
  const data = buildFaqSeoGraph();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
