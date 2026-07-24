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
    <main className="home-page">
      <section className="hero">
        <SiteHeader dark={false} />
        <div className="hero-editorial page-shell">
          <div className="hero-copy">
            <p className="hero-kicker">AI · FILM · VISUAL STORYTELLING</p>
            <h1>
              在真实影像与生成技术之间，
              <br />
              寻找新的叙事方式。
            </h1>
            <div className="hero-identity">
              <p>William</p>
              <p>AI Creative Technologist</p>
            </div>
            <p className="hero-description">
              从真实拍摄现场出发，在生成式影像中延伸电影语言。
            </p>
            <Link className="hero-link" href="/works">
              <span>查看作品</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="hero-collage" aria-label="William 的代表影像">
            <Link
              className="hero-card hero-card-ai"
              href="/works/cdam-ai-promo"
              aria-label="查看成都美术学院数字媒体艺术系 AI 宣传片"
            >
              <figure>
                <div className="hero-card-image">
                  <Image
                    src="/images/projects/cdam-ai-cover.jpg"
                    alt="成都美术学院数字媒体艺术系 AI 宣传片的生成式影像画面"
                    fill
                    priority
                    sizes="(max-width: 760px) 86vw, (max-width: 1100px) 34vw, 38vw"
                    className="hero-card-media hero-card-media-ai"
                  />
                </div>
                <figcaption>
                  <span>30｜成都美术学院数字媒体艺术系 AI 宣传片</span>
                  <span>AI Moving Image</span>
                </figcaption>
              </figure>
            </Link>

            <Link
              className="hero-card hero-card-spring"
              href="/works/daochunhan"
              aria-label="查看倒春寒"
            >
              <figure>
                <div className="hero-card-image">
                  <Image
                    src="/images/projects/daochunhan-cover.jpg"
                    alt="《倒春寒》电影静帧，人物站在树木构成的拱形结构下"
                    fill
                    sizes="(max-width: 760px) 44vw, (max-width: 1100px) 24vw, 27vw"
                    className="hero-card-media hero-card-media-spring"
                  />
                </div>
                <figcaption>
                  <span>26｜倒春寒</span>
                  <span>Film / Direction / Cinematography</span>
                </figcaption>
              </figure>
            </Link>

            <Link
              className="hero-card hero-card-yuhua"
              href="/works/yuhua"
              aria-label="查看羽化"
            >
              <figure>
                <div className="hero-card-image">
                  <Image
                    src="/images/projects/yuhua-cover.jpg"
                    alt="《羽化》电影静帧，冷色灯光下人物靠近电视"
                    fill
                    sizes="(max-width: 760px) 38vw, (max-width: 1100px) 18vw, 19vw"
                    className="hero-card-media hero-card-media-yuhua"
                  />
                </div>
                <figcaption>
                  <span>15｜羽化</span>
                  <span>Cinematography</span>
                </figcaption>
              </figure>
            </Link>

            <figure className="hero-card hero-card-onsite">
              <div className="hero-card-image">
                <Image
                  src="/images/about/william-on-set.jpg"
                  alt="William 在摄影现场操作电影摄影机"
                  fill
                  sizes="(max-width: 1100px) 13vw, 15vw"
                  className="hero-card-media hero-card-media-onsite"
                />
              </div>
              <figcaption>
                <span>William / On Set</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section page-shell home-selected" id="works">
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
