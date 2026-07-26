import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { ProjectGallery } from "@/components/project-gallery";
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
  let supportingSection = modules.length;
  const processSection = project.process.length > 0 ? supportingSection++ : null;
  const stillsSection = project.stills.length > 0 ? supportingSection++ : null;
  const btsSection = project.bts.length > 0 ? supportingSection++ : null;
  const creditsSection = supportingSection++;
  const finalFilmSection = supportingSection;

  return (
    <main className="detail-page">
      <SiteHeader />
      <div className="detail-hero">
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
          const moduleNumber = isFilm ? finalFilmSection : index + 1;

          return (
            <Fragment key={module.title}>
              {isFilm && processSection !== null && (
                <ProjectGallery
                  projectTitle={project.title}
                  stills={project.process}
                  aspectRatio={project.processAspect}
                  sectionNumber={String(processSection).padStart(2, "0")}
                  label="Process / Development"
                  heading="制作过程"
                  mediaLabel="过程图"
                  note={`${project.title} · ${project.process.length} development images`}
                  fit="contain"
                />
              )}

              {isFilm && stillsSection !== null && (
                <ProjectGallery
                  projectTitle={project.title}
                  stills={project.stills}
                  aspectRatio={project.galleryAspect}
                  sectionNumber={String(stillsSection).padStart(2, "0")}
                />
              )}

              {isFilm && btsSection !== null && (
                <ProjectGallery
                  projectTitle={project.title}
                  stills={project.bts}
                  aspectRatio={project.btsAspect}
                  sectionNumber={String(btsSection).padStart(2, "0")}
                  label="Behind the Scenes"
                  heading="幕后现场"
                  mediaLabel="幕后照片"
                  note={`${project.title} · ${project.bts.length} production images`}
                />
              )}

              {isFilm && (
                <article className="project-module project-credits">
                  <div className="page-shell module-heading">
                    <span>{String(creditsSection).padStart(2, "0")}</span>
                    <div>
                      <p>Credits</p>
                      <h2>项目署名</h2>
                    </div>
                    <p className="module-note">
                      Existing project information from the William archive.
                    </p>
                  </div>
                  <div className="page-shell credits-grid">
                    <div>
                      <span>PROJECT</span>
                      <p>{project.title}</p>
                    </div>
                    <div>
                      <span>ROLE</span>
                      <p>{project.role}</p>
                    </div>
                    <div>
                      <span>TYPE / YEAR</span>
                      <p>{project.type} / {project.year || "—"}</p>
                    </div>
                    <div>
                      <span>FIELDS</span>
                      <p>{project.capabilities.join(" / ")}</p>
                    </div>
                  </div>
                </article>
              )}

              <article className={`project-module ${isFilm ? "project-module-film" : ""}`}>
                <div className="page-shell module-heading">
                  <span>{String(moduleNumber).padStart(2, "0")}</span>
                  <div>
                    <p>{module.title}</p>
                    <h2>{module.cn}</h2>
                  </div>
                  <p className="module-note">
                    {isFilm
                      ? `${project.title} · Project film`
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
                      <p>Project film · Full presentation available</p>
                    )}
                  </div>
                )}
              </article>
            </Fragment>
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
