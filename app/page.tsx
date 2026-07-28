import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { HomeMotion } from "@/components/home-motion";
import { ProjectCard } from "@/components/project-card";
import { SiteHeader } from "@/components/site-header";
import { StaticImage as Image } from "@/components/static-image";
import { capabilities } from "@/lib/capabilities";
import { projects } from "@/lib/projects";

export default function Home() {
  const featured = projects.slice(0, 6);

  return (
    <main className="home-page">
      <HomeMotion />
      <SiteHeader />
      <HomeHero />

      <section className="section page-shell home-selected" id="works">
        <div className="section-heading">
          <div>
            <p className="eyebrow">精选作品</p>
            <h2>Stories, systems<br />and moving images.</h2>
          </div>
          <Link className="text-link" href="/works">查看全部作品 <span>↗</span></Link>
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
              <p className="eyebrow">创作能力</p>
              <h2>From an idea<br />to a finished frame.</h2>
            </div>
            <p className="section-intro">
              技术不是画面的目的。它是一套让叙事、情绪与真实制作彼此衔接的方法。
            </p>
          </div>
          <div className="capability-archive">
            {capabilities.map((item, index) => (
              <Link
                href={`/what-i-do/${item.slug}`}
                className={`archive-folder archive-folder-${index + 1}`}
                key={item.number}
              >
                <div className="folder-paper" aria-hidden="true">
                  <span>WILLIAM / 创作档案</span>
                </div>
                <div className="folder-tab">
                  <span>{item.number}</span>
                  <span>领域</span>
                </div>
                <div className="folder-face">
                  <div className="folder-meta">
                    <span>{item.archive}</span>
                    <span>档案 / {item.number}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="folder-footer" aria-hidden="true">
                    <span>查看能力详情 ↗</span>
                    <span>W/L</span>
                  </div>
                </div>
              </Link>
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
            unoptimized
            sizes="(max-width: 800px) 100vw, 46vw"
            className="about-image"
          />
          <span className="image-caption">拍摄现场 / 视觉制作</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">关于 WILLIAM</p>
          <p className="about-lead">
            我从真实的拍摄现场出发，也在生成式影像里寻找新的叙事方式。
          </p>
          <p className="about-body">
            电影摄影让我理解光、空间、人物和协作；AI 则扩展了从概念到画面的路径。
            我关心的始终不是工具本身，而是如何让技术保留人的观察、情绪与选择。
          </p>
          <Link className="text-link" href="/works">浏览作品 <span>↗</span></Link>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="page-shell contact-inner">
          <p className="eyebrow light">联系</p>
          <p className="contact-kicker">有故事、问题，或者一个还说不清的新想法？</p>
          <h2>LET’S MAKE<br />SOMETHING <em>HUMAN.</em></h2>
          <p className="contact-note">
            AI 影像、创意技术、摄影与视觉叙事合作。三种联系方式并列开放，选择你最顺手的一种就好。
          </p>
          <div className="contact-grid">
            <a className="contact-card contact-card-email" href="mailto:WilliamLao1220@outlook.com">
              <span>01 / 邮箱</span>
              <strong>WilliamLao1220<br />@outlook.com</strong>
              <small>发送邮件</small>
              <i aria-hidden="true">↗</i>
            </a>
            <a
              className="contact-card contact-card-xhs"
              href="https://xhslink.cn/m/1Ti6I8iHq2O"
              target="_blank"
              rel="noreferrer"
            >
              <span>02 / 小红书</span>
              <strong>William 的<br />小红书主页</strong>
              <small>58 次赞与收藏</small>
              <i aria-hidden="true">↗</i>
            </a>
            <a
              className="contact-card contact-card-bili"
              href="https://b23.tv/DFYACtw"
              target="_blank"
              rel="noreferrer"
            >
              <span>03 / 哔哩哔哩</span>
              <strong>小霖智商幺玖零<br />的个人空间</strong>
              <small>打开主页</small>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
          <div className="footer-line">
            <span>WILLIAM © 2026</span>
            <span>AI · 影像 · 视觉叙事</span>
          </div>
        </div>
      </section>
    </main>
  );
}
