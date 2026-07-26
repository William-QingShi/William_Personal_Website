import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { HomeMotion } from "@/components/home-motion";
import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { getFeaturedProjects } from "@/lib/projects";

const capabilities = [
  {
    number: "01",
    archive: "AI FILM",
    title: "AI 影像与生成工作流",
    description: "从概念、Prompt 与资产规划，到图像生成、视频生成、剪辑、声音和包装。",
  },
  {
    number: "02",
    archive: "CINEMATOGRAPHY",
    title: "视觉叙事与摄影设计",
    description: "把叙事目标转化为镜头、画幅、摄影、灯光与现场视觉系统。",
  },
  {
    number: "03",
    archive: "VISUAL STORYTELLING",
    title: "纪录片与人物内容",
    description: "在真实环境中观察人物，并以克制的机位、灯光和现场判断建立影像。",
  },
  {
    number: "04",
    archive: "FILM PRODUCTION",
    title: "前期策划与项目执行",
    description: "将需求和脚本转化为方案、分镜、器材与拍摄计划，并连接制作和交付。",
  },
];

export default function Home() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <main className="home-page">
      <HomeMotion />
      <SiteHeader />
      <HomeHero />

      <section className="section page-shell home-selected" id="works" data-home-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">SELECTED WORKS</p>
            <h2>Stories, systems<br />and moving images.</h2>
          </div>
          <Link className="text-link" href="/works">View all works <span>↗</span></Link>
        </div>

        <div className="featured-stack">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} featured />
          ))}
        </div>
      </section>

      <section className="capabilities section" id="what-i-do" data-home-reveal>
        <div className="page-shell">
          <div className="section-heading capability-heading">
            <div>
              <p className="eyebrow">WHAT I DO</p>
              <h2>From an idea<br />to a finished frame.</h2>
            </div>
            <p className="section-intro">
              技术不是画面的目的。它是一套让叙事、情绪与真实制作彼此衔接的方法。
            </p>
          </div>
          <div className="capability-archive">
            {capabilities.map((item, index) => (
              <article
                className={`archive-folder archive-folder-${index + 1}`}
                key={item.number}
                tabIndex={0}
              >
                <div className="folder-paper" aria-hidden="true">
                  <span>WILLIAM / CREATIVE ARCHIVE</span>
                </div>
                <div className="folder-tab">
                  <span>{item.number}</span>
                  <span>FIELD</span>
                </div>
                <div className="folder-face">
                  <div className="folder-meta">
                    <span>{item.archive}</span>
                    <span>ARCHIVE / {item.number}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="folder-footer" aria-hidden="true">
                    <span>CREATIVE PRACTICE</span>
                    <span>W/L</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about section page-shell" id="about" data-home-reveal>
        <div className="about-image-wrap">
          <Image
            src="/images/about/william-on-set.jpg"
            alt="William 在拍摄现场调整摄影机"
            fill
            sizes="(max-width: 800px) 100vw, 46vw"
            className="about-image"
          />
          <span className="image-caption">ON SET / VISUAL PRODUCTION</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">ABOUT WILLIAM</p>
          <p className="about-lead">
            我从真实的拍摄现场出发，也在生成式影像里寻找新的叙事方式。
          </p>
          <p className="about-body">
            电影摄影让我理解光、空间、人物和协作；AI 则扩展了从概念到画面的路径。
            我关心的始终不是工具本身，而是如何让技术保留人的观察、情绪与选择。
          </p>
          <Link className="text-link" href="/works">Explore the work <span>↗</span></Link>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="page-shell contact-inner">
          <p className="eyebrow light">CONTACT</p>
          <p className="contact-kicker">Have a story, a question, or a strange new idea?</p>
          <h2>LET’S MAKE<br />SOMETHING <em>HUMAN.</em></h2>
          <p className="contact-note">
            Selected collaborations in AI moving image, creative technology and visual storytelling.
            <br />
            Public contact details are not listed yet. Introductions are welcome through existing connections.
          </p>
          <div className="footer-line">
            <span>WILLIAM © 2026</span>
            <span>CHENGDU · CHINA</span>
          </div>
        </div>
      </section>
    </main>
  );
}
