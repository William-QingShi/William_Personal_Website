import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Selected Works",
  description: "Selected work across AI, film, cinematography and documentary.",
};

export default function WorksPage() {
  const selected = projects.slice(0, 3);
  const more = projects.slice(3);

  return (
    <main className="light-page">
      <SiteHeader dark={false} />
      <header className="works-masthead page-shell">
        <p className="eyebrow">SELECTED WORKS / 2024—2026</p>
        <h1>WORK<br /><span>IN MOTION.</span></h1>
        <div className="works-intro">
          <p>
            AI moving image, narrative cinematography and documentary observation —
            built as complete visual systems.
          </p>
          <Link className="text-link" href="/#what-i-do">What I do <span>↗</span></Link>
        </div>
      </header>

      <section className="editorial-grid page-shell" aria-label="Selected works">
        {selected.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </section>

      <section className="more-works page-shell">
        <div className="more-heading">
          <p className="eyebrow">MORE WORKS</p>
          <p>Different forms. The same attention to image, story and process.</p>
        </div>
        <div className="more-grid">
          {more.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index + 1} />
          ))}
        </div>
      </section>

      <footer className="works-footer">
        <div className="page-shell">
          <p>AI · FILM · VISUAL STORYTELLING</p>
          <Link href="/#contact">Start a conversation ↗</Link>
        </div>
      </footer>
    </main>
  );
}
