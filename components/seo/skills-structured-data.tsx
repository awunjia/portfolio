import { buildSkillsItemListGraph } from "@/lib/seo/skills-item-list-graph";

export function SkillsStructuredData() {
  const data = buildSkillsItemListGraph();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
