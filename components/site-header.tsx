import Link from "next/link";

export function SiteHeader({ dark = true }: { dark?: boolean }) {
  return (
    <header className={`site-header ${dark ? "site-header-dark" : ""}`}>
      <div className="site-header-inner page-shell">
        <Link className="wordmark" href="/" aria-label="William home">
          W.
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/works">Works</Link>
          <Link href="/#what-i-do">What I Do</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div className="availability">Chengdu · China</div>
      </div>
    </header>
  );
}
