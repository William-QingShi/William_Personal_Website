import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { getFeaturedProjects } from "@/lib/projects";

const capabilities = [
  {
    number: "01",
    title: "AI 影像与生成工作流",
    description: "从概念、Prompt 与资产规划，到图像生成、视频生成、剪辑、声音和包装。",
  },
  {
    number: "02",
    title: "视觉叙事与摄影设计",
    description: "把叙事目标转化为镜头、画幅、摄影、灯光与现场视觉系统。",
  },
  {
    number: "03",
    title: "纪录片与人物内容",
    description: "在真实环境中观察人物，并以克制的机位、灯光和现场判断建立影像。",
  },
  {
    number: "04",
    title: "前期策划与项目执行",
    description: "将需求和脚本转化为方案、分镜、器材与拍摄计划，并连接制作和交付。",
  },
];

export default function Home() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <main>
      <section className="hero">
        <SiteHeader />
        <div className="hero-media" aria-hidden="true">
          <Image
            src="/images/projects/cdam-ai-cover.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-shade" />
          <div className="hero-orbit hero-orbit-a" />
          <div className="hero-orbit hero-orbit-b" />
        </div>

        <div className="hero-copy page-shell">
          <p className="eyebrow light">AI · FILM · VISUAL STORYTELLING</p>
          <div className="hero-title-wrap">
            <h1>WILLIAM</h1>
            <p className="hero-role">AI Creative Technologist</p>
          </div>
          <div className="hero-bottom">
            <p className="hero-subtitle">
              Exploring the intersection of
              <br />
              AI, Film and Visual Storytelling.
            </p>
            <Link className="circle-link" href="/works" aria-label="View selected works">
              <span>VIEW</span>
              <span>WORKS ↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section page-shell" id="works">
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

      <section className="capabilities section" id="what-i-do">
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
          <div className="capability-list">
            {capabilities.map((item) => (
              <article className="capability-row" key={item.number}>
                <span className="capability-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about section page-shell" id="about">
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
            Available for AI moving image, creative technology and visual storytelling.
            <br />
            联系方式将在确认公开信息后接入。
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
