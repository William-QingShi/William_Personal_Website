import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the cinematic portfolio home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>William — AI Creative Technologist<\/title>/i);
  assert.match(html, /hero-william-light\.jpg/);
  assert.doesNotMatch(html, /AI CREATIVE TECHNOLOGIST/);
  assert.doesNotMatch(html, /AI × Film × Creative Production/);
  assert.doesNotMatch(html, /WILLIAM LAO \/ PORTFOLIO 2026/);
  assert.doesNotMatch(html, /Chengdu · China/i);
  assert.match(html, /WilliamLao1220@outlook\.com/);
  assert.match(html, /SELECTED WORKS/);
  assert.match(html, /WHAT I DO/);
  assert.match(html, /AI FILM/);
  assert.match(html, /CINEMATOGRAPHY/);
  assert.match(html, /VISUAL STORYTELLING/);
  assert.match(html, /FILM PRODUCTION/);
  assert.match(html, /Home<\/a>.*Works<\/a>.*What I Do<\/a>.*About<\/a>.*Contact<\/a>/s);
});

test("project detail renders a compact gallery, process and delivery structure", async () => {
  const response = await render("/works/yuhua");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /羽化/);
  assert.match(html, /Image Gallery \/ Stills/);
  assert.match(html, /Process \/ Development/);
  assert.match(html, /Behind the Scenes/);
  assert.match(html, /Film \/ Credits/);
  assert.match(html, /成片与署名/);
  assert.match(html, /yuhua-01\.jpg/);
  assert.match(html, /projects%2Fprocess%2Fyuhua-01\.jpg/);
  assert.match(html, /projects%2Fbts%2Fyuhua-01\.jpg/);
  assert.doesNotMatch(html, /permission|权限待确认/i);
});

test("works and every project route render confirmed titles and media", async () => {
  const worksResponse = await render("/works");
  assert.equal(worksResponse.status, 200);
  const worksHtml = await worksResponse.text();
  assert.match(worksHtml, /嘉姆查瓦绒/);
  assert.match(worksHtml, /倒春寒/);
  assert.doesNotMatch(worksHtml, /渡见春/);

  const routes = [
    "cdam-ai-promo",
    "daochunhan",
    "yuhua",
    "vanishing-factory",
    "between-tides",
    "the-form-i-see",
    "hbn-aigc-concept",
    "jiamu-chawarong",
  ];

  for (const slug of routes) {
    const response = await render(`/works/${slug}`);
    assert.equal(response.status, 200, `${slug} should render`);
    const html = await response.text();
    assert.match(html, /Film \/ Credits/);
  }

  const factoryResponse = await render("/works/vanishing-factory");
  assert.match(await factoryResponse.text(), /摄影指导/);

  const jiamuResponse = await render("/works/jiamu-chawarong");
  const jiamuHtml = await jiamuResponse.text();
  assert.match(jiamuHtml, /嘉姆查瓦绒/);
  assert.match(jiamuHtml, /jiamu-chawarong-01\.jpg/);
  assert.match(jiamuHtml, /摄影师/);
});
