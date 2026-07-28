import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index = 0,
  featured = false,
}: {
  project: Project;
  index?: number;
  featured?: boolean;
}) {
  const layoutIndex = featured ? index : index % 3;

  return (
    <article className={`project-card project-card-${layoutIndex} ${featured ? "project-card-featured" : ""}`}>
      <Link href={`/works/${project.slug}`} className="project-visual">
        <Image
          src={project.cover}
          alt={`${project.title} 项目画面`}
          fill
          unoptimized
          sizes={featured ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 800px) 100vw, 50vw"}
          className="project-image"
        />
        <div className="project-hover">
          <span>查看项目</span>
          <span>↗</span>
        </div>
      </Link>
      <div className={`project-meta ${featured ? "project-meta-featured" : ""}`}>
        <div className="project-meta-primary">
          <h3><Link href={`/works/${project.slug}`}>{project.title}</Link></h3>
          <p>{project.position}</p>
        </div>
        <div className="project-meta-right">
          <span>{project.type}</span>
          {project.year && <span>{project.year}</span>}
        </div>
      </div>
    </article>
  );
}
