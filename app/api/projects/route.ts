import { NextResponse } from "next/server";
import { getProjectsForDisplay } from "@/lib/projects";

export async function GET() {
  try {
    const { projects } = getProjectsForDisplay();
    return NextResponse.json({
      projects: projects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        techStack: p.techStack,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        images: p.images,
        createdAt: p.createdAt.toISOString(),
        source: p.source,
      })),
    });
  } catch {
    return NextResponse.json(
      { error: "Projects are taking a short break - try again in a moment." },
      { status: 500 },
    );
  }
}
