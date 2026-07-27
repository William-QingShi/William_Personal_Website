import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "作品",
  description: "William 的 AI 影像、摄影与纪录片作品。",
};

export default function WorksPage() {
  const selected = projects.slice(0, 3);
  const more = projects.slice(3);

  return (
    <main className="light-page">
      <SiteHeader dark={false} />
      <header className="works-masthead page-shell">
        <p className="eyebrow">精选作品 / 2024—2026</p>
        <h1>WORK<br /><span>IN MOTION.</span></h1>
        <div className="works-intro">
          <p>
            AI 影像、叙事摄影与纪录片观察——每个项目都被视为一套完整的视觉系统。
          </p>
          <Link className="text-link" href="/what-i-do">创作能力 <span>↗</span></Link>
        </div>
      </header>

      <section className="editorial-grid page-shell" aria-label="精选作品">
        {selected.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </section>

      <section className="more-works page-shell">
        <div className="more-heading">
          <p className="eyebrow">更多作品</p>
          <p>形式不同，对画面、故事与制作过程的关注始终一致。</p>
        </div>
        <div className="more-grid">
          {more.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index + 1} />
          ))}
        </div>
      </section>

      <footer className="works-footer">
        <div className="page-shell">
          <p>AI · 影像 · 视觉叙事</p>
          <Link href="/#contact">开始交流 ↗</Link>
        </div>
      </footer>
    </main>
  );
}
