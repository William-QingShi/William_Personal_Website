import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { capabilities } from "@/lib/capabilities";

export const metadata: Metadata = {
  title: "创作能力",
  description: "William 的 AI 影像、摄影设计、纪录片与制作执行能力。",
};

export default function CapabilitiesPage() {
  return (
    <main className="capability-page">
      <SiteHeader dark={false} />
      <header className="capability-masthead page-shell">
        <p className="eyebrow">创作能力 / CREATIVE PRACTICE</p>
        <h1>From an idea<br />to a finished frame.</h1>
        <p>
          四种彼此连接的工作方式，从概念与技术路径开始，经过影像制作，最终落到可以被观看和交付的作品。
        </p>
      </header>

      <section className="capability-index page-shell" aria-label="创作能力列表">
        {capabilities.map((capability) => (
          <Link href={`/what-i-do/${capability.slug}`} className="capability-index-card" key={capability.slug}>
            <span>{capability.number}</span>
            <div>
              <p>{capability.archive}</p>
              <h2>{capability.title}</h2>
              <p>{capability.description}</p>
            </div>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
