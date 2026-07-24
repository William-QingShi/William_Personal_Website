import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getProject, projects, type ProjectKind } from "@/lib/projects";

const moduleSets: Record<ProjectKind, Array<{ title: string; cn: string }>> = {
  ai: [
    { title: "Concept", cn: "概念与镜头方向" },
    { title: "AI Workflow", cn: "生成式影像工作流" },
    { title: "Asset Development", cn: "人物、场景与视觉资产" },
    { title: "Final Film", cn: "最终成片" },
  ],
  cinematography: [
    { title: "Visual Concept", cn: "视觉概念" },
    { title: "Camera System", cn: "摄影机、镜头与画幅系统" },
    { title: "Lighting Design", cn: "灯光与现场控制" },
    { title: "Frames", cn: "精选画面" },
    { title: "Final Film", cn: "最终成片" },
  ],
  documentary: [
    { title: "Story", cn: "人物与故事" },
    { title: "Visual Approach", cn: "观察方式与影像策略" },
    { title: "Production", cn: "策划与现场制作" },
    { title: "Frames", cn: "精选画面" },
    { title: "Final Film", cn: "最终成片" },
  ],
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project
    ? { title: project.title, description: project.overview }
    : { title: "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const modules = moduleSets[project.kind];
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="detail-page">
      <div className="detail-hero">
        <SiteHeader />
        <Image
          src={project.cover}
          alt={`${project.title} 项目主视觉`}
          fill
          priority
          sizes="100vw"
          className="detail-hero-image"
        />
        <div className="detail-hero-shade" />
        <div className="detail-hero-copy page-shell">
          <Link href="/works" className="back-link">← ALL WORKS</Link>
          <div>
            <p className="eyebrow light">{project.type} / {project.year || "YEAR TBC"}</p>
            <h1>{project.title}</h1>
            <p>{project.position}</p>
          </div>
        </div>
      </div>

      <section className="project-overview page-shell">
        <p className="eyebrow">OVERVIEW</p>
        <div className="overview-main">
          <h2>{project.overview}</h2>
          <div className="overview-facts">
            <div>
              <span>ROLE</span>
              <p>{project.role}</p>
            </div>
            <div>
              <span>FIELDS</span>
              <p>{project.capabilities.slice(0, 6).join(" / ")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="project-modules">
        {modules.map((module, index) => {
          const image = project.frames[index % project.frames.length];
          const isFilm = module.title === "Final Film";

          return (
            <article className={`project-module ${isFilm ? "project-module-film" : ""}`} key={module.title}>
              <div className="page-shell module-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{module.title}</p>
                  <h2>{module.cn}</h2>
                </div>
                <p className="module-note">
                  {isFilm
                    ? "完整成片模块已预留；待确认公开权限与最终发布版本后接入。"
                    : project.capabilities.slice(index, index + 3).join(" · ") || project.position}
                </p>
              </div>

              {!isFilm && (
                <div className="module-image-wrap">
                  <Image
                    src={image}
                    alt={`${project.title} — ${module.cn}`}
                    fill
                    sizes="100vw"
                    className="module-image"
                  />
                </div>
              )}

              {isFilm && (
                <div className="page-shell film-placeholder">
                  <span>FINAL FILM</span>
                  {project.externalFilm ? (
                    <a href={project.externalFilm} target="_blank" rel="noreferrer">
                      Watch the public film ↗
                    </a>
                  ) : (
                    <p>Film available · Publishing permission to be confirmed</p>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </section>

      <section className="next-project">
        <Link href={`/works/${nextProject.slug}`} className="page-shell">
          <span className="eyebrow light">NEXT PROJECT</span>
          <h2>{nextProject.title}</h2>
          <span className="next-arrow">↗</span>
        </Link>
      </section>
    </main>
  );
}
