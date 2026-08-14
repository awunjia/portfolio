import { buildLlmsTxt } from "@/lib/seo/llms-txt";

export const dynamic = "force-static";

/** Alternate well-known path some crawlers probe. */
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
