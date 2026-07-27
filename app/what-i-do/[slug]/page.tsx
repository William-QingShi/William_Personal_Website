import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { capabilities, getCapability } from "@/lib/capabilities";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return capabilities.map((capability) => ({ slug: capability.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const capability = getCapability((await params).slug);
  return capability
    ? { title: capability.title, description: capability.description }
    : { title: "创作能力" };
}

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const capability = getCapability((await params).slug);
  if (!capability) notFound();

  const related = capability.projectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const index = capabilities.findIndex((item) => item.slug === capability.slug);
  const next = capabilities[(index + 1) % capabilities.length];

  return (
    <main className="capability-detail-page">
      <SiteHeader dark={false} />
      <header className="capability-detail-hero page-shell">
        <Link href="/what-i-do" className="back-link">← 返回创作能力</Link>
        <div>
          <p className="eyebrow">{capability.number} / {capability.archive}</p>
          <h1>{capability.title}</h1>
          <p>{capability.intro}</p>
        </div>
      </header>

      <section className="capability-workflow">
        <div className="page-shell">
          <p className="eyebrow">工作方式</p>
          <div className="workflow-grid">
            {capability.workflow.map((step, stepIndex) => (
              <article key={step.title}>
                <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="capability-deliverables page-shell">
        <p className="eyebrow">可交付内容</p>
        <ul>
          {capability.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
        </ul>
      </section>

      <section className="capability-evidence page-shell">
        <div className="more-heading">
          <p className="eyebrow">相关项目佐证</p>
          <p>以下内容仅使用当前已确认并公开展示的项目；下一轮可继续补充每项能力的更多材料。</p>
        </div>
        <div className="more-grid">
          {related.map((project, projectIndex) => (
            <ProjectCard project={project} index={projectIndex} key={project.slug} />
          ))}
        </div>
      </section>

      <Link className="capability-next" href={`/what-i-do/${next.slug}`}>
        <span className="page-shell">
          <small>下一项能力</small>
          <strong>{next.title}</strong>
          <i>↗</i>
        </span>
      </Link>
    </main>
  );
}
