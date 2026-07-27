import Link from "next/link";

export function SiteHeader({ dark = true }: { dark?: boolean }) {
  return (
    <header className={`site-header ${dark ? "site-header-dark" : ""}`}>
      <div className="site-header-inner page-shell">
        <Link className="wordmark" href="/" aria-label="William 首页">
          W.
        </Link>
        <nav aria-label="主要导航">
          <Link href="/">首页</Link>
          <Link href="/works">作品</Link>
          <Link href="/what-i-do">创作能力</Link>
          <Link href="/#about">关于</Link>
          <Link href="/#contact">联系</Link>
        </nav>
      </div>
    </header>
  );
}
