import type { Graph, ItemList, ListItem } from "schema-dts";
import { siteConfig } from "@/config/site";

const SKILLS_LIST_ID = `${siteConfig.domain}/#skill-list`;

/** ItemList of primary skills for /skills — supports stack-related discovery. */
export function buildSkillsItemListGraph(): Graph {
  const items: ListItem[] = siteConfig.skills.map((name, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
  }));

  const itemList: ItemList = {
    "@type": "ItemList",
    "@id": SKILLS_LIST_ID,
    name: `${siteConfig.fullName} — technical skills`,
    description: `Tools and technologies ${siteConfig.fullName} uses in product delivery.`,
    numberOfItems: items.length,
    itemListElement: items,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [itemList],
  };
}
