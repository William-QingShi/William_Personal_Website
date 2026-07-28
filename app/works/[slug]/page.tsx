import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { FactoryProductionPlan } from "@/components/factory-production-plan";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectFilmAccess } from "@/components/project-film-access";
import { SiteHeader } from "@/components/site-header";
import { StaticImage as Image } from "@/components/static-image";
import { getProject, projects } from "@/lib/projects";

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

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const methodNotes = Object.entries(project.moduleNotes).slice(0, 3);
  const methodSummary = methodNotes.map(([, note]) => note).join(" ");
  let sectionNumber = 1;
  const stillsSection = project.stills.length > 0 ? sectionNumber++ : null;
  const processSection = project.process.length > 0 ? sectionNumber++ : null;
  const productionPlanSection = project.slug === "vanishing-factory" ? sectionNumber++ : null;
  const btsSection = project.bts.length > 0 ? sectionNumber++ : null;
  const deliverySection = sectionNumber;

  return (
    <main className="detail-page">
      <SiteHeader />
      <div className="detail-hero">
        <div className="detail-hero-media" style={{ aspectRatio: project.coverAspect }}>
          <Image
            src={project.cover}
            alt={`${project.title} 项目主视觉`}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="detail-hero-image"
          />
          <div className="detail-hero-shade" />
        </div>
        <div className="detail-hero-copy page-shell">
          <Link href="/works" className="back-link">← 返回全部作品</Link>
          <div>
            <p className="eyebrow light">
              {project.type}{project.year ? ` / ${project.year}` : ""}
            </p>
            <h1>{project.title}</h1>
            <p>{project.position}</p>
          </div>
        </div>
      </div>

      <section className="project-overview page-shell">
        <p className="eyebrow">项目概览</p>
        <div className="overview-main">
          <h2>{project.overview}</h2>
          {project.disclaimer && <p className="project-disclaimer">{project.disclaimer}</p>}
          <div className="overview-facts">
            <div>
              <span>职责</span>
              <p>{project.role}</p>
            </div>
            <div>
              <span>能力领域</span>
              <p>{project.capabilities.slice(0, 6).join(" / ")}</p>
            </div>
          </div>
          {methodSummary && (
            <div className="method-summary">
              <span>创作方法</span>
              <p>{methodSummary}</p>
            </div>
          )}
        </div>
      </section>

      <section className="project-modules">
        {stillsSection !== null && (
          <ProjectGallery
            projectTitle={project.title}
            stills={project.stills}
            allStills={project.allStills}
            aspectRatio={project.galleryAspect}
            sectionNumber={String(stillsSection).padStart(2, "0")}
          />
        )}

        {processSection !== null && (
          <ProjectGallery
            projectTitle={project.title}
            stills={project.process}
            aspectRatio={project.processAspect}
            sectionNumber={String(processSection).padStart(2, "0")}
            label="制作过程 / 视觉开发"
            heading="制作过程"
            mediaLabel="过程图"
            note={`${project.title} · ${project.process.length} 张制作过程图`}
            fit="contain"
          />
        )}

        {productionPlanSection !== null && (
          <FactoryProductionPlan sectionNumber={String(productionPlanSection).padStart(2, "0")} />
        )}

        {btsSection !== null && (
          <ProjectGallery
            projectTitle={project.title}
            stills={project.bts}
            aspectRatio={project.btsAspect}
            sectionNumber={String(btsSection).padStart(2, "0")}
            label="幕后现场"
            heading="幕后现场"
            mediaLabel="幕后照片"
            note={`${project.title} · ${project.bts.length} 张幕后照片`}
          />
        )}

        <article className="project-module project-delivery">
          <div className="page-shell module-heading">
            <span>{String(deliverySection).padStart(2, "0")}</span>
            <div>
              <p>成片 / 署名</p>
              <h2>成片与署名</h2>
            </div>
          </div>
          <div className="page-shell delivery-grid">
            <div className="film-placeholder">
              <span>公开成片</span>
              <ProjectFilmAccess
                title={project.title}
                url={project.externalFilm}
                platform={project.filmPlatform}
                qr={project.filmQr}
              />
            </div>
            <div className="credits-grid">
              <div>
                <span>项目</span>
                <p>{project.title}</p>
              </div>
              <div>
                <span>职责</span>
                <p>{project.role}</p>
              </div>
              <div>
                <span>类型 / 年份</span>
                <p>{project.type} / {project.year || "—"}</p>
              </div>
              <div>
                <span>能力领域</span>
                <p>{project.capabilities.join(" / ")}</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="next-project">
        <Link href={`/works/${nextProject.slug}`} className="next-project-link">
          <Image
            src={nextProject.thumbnail}
            alt=""
            fill
            unoptimized
            sizes="100vw"
            className="next-project-image"
            style={{
              "--thumbnail-scale": nextProject.thumbnailScale ?? 1,
              objectPosition: nextProject.thumbnailPosition ?? "50% 50%",
            } as CSSProperties}
          />
          <span className="next-project-shade" aria-hidden="true" />
          <span className="page-shell next-project-content">
            <span className="eyebrow light">下一个项目</span>
            <span className="next-project-title">{nextProject.title}</span>
            <span className="next-arrow">↗</span>
          </span>
        </Link>
      </section>
    </main>
  );
}
