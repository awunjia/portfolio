import { buildRootSeoGraph } from "@/lib/seo/root-graph";

/** Typed Schema.org @graph (see `schema-dts`) for entity + hiring signals. */
export function RootStructuredData() {
  const data = buildRootSeoGraph();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
