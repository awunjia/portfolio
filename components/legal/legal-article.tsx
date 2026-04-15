import type { ReactNode } from "react";

export function LegalArticle({ children }: { children: ReactNode }) {
  return (
    <article className="space-y-5 text-sm leading-relaxed text-muted [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-foreground [&_h2]:mt-10 [&_h2]:border-t [&_h2]:border-border [&_h2]:pt-8 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:text-foreground [&_p]:max-w-prose [&_ul]:mt-2 [&_ul]:max-w-prose [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:ps-5 [&_a]:font-medium [&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline [&_strong]:text-foreground">
      {children}
    </article>
  );
}
