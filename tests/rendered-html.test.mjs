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
  assert.match(html, /hero-william-light-16x9\.png/);
  assert.doesNotMatch(html, /AI CREATIVE TECHNOLOGIST/);
  assert.doesNotMatch(html, /AI × Film × Creative Production/);
  assert.doesNotMatch(html, /WILLIAM LAO \/ PORTFOLIO 2026/);
  assert.doesNotMatch(html, /Chengdu · China/i);
  assert.match(html, /WilliamLao1220@outlook\.com/);
  assert.match(html, /xhslink\.cn\/m\/1Ti6I8iHq2O/);
  assert.match(html, /b23\.tv\/DFYACtw/);
  assert.match(html, /精选作品/);
  assert.match(html, /创作能力/);
  assert.match(html, /AI FILM/);
  assert.match(html, /CINEMATOGRAPHY/);
  assert.match(html, /VISUAL STORYTELLING/);
  assert.match(html, /FILM PRODUCTION/);
  assert.match(html, /首页<\/a>.*作品<\/a>.*创作能力<\/a>.*关于<\/a>.*联系<\/a>/s);
});

test("project detail renders a compact gallery, process and delivery structure", async () => {
  const response = await render("/works/yuhua");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /羽化/);
  assert.match(html, /影像画廊 \/ 静帧/);
  assert.match(html, /制作过程 \/ 视觉开发/);
  assert.match(html, /幕后现场/);
  assert.match(html, /成片 \/ 署名/);
  assert.match(html, /成片与署名/);
  assert.match(html, /创作方法/);
  assert.match(html, /更多静帧/);
  assert.match(html, /共 30 张/);
  assert.match(html, /pan\.baidu\.com\/s\/1xPi5IXDtuX-MZY5WPF7MQA\?pwd=hd6f/);
  assert.match(html, /images%2Fqr%2Fyuhua\.png/);
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
    assert.match(html, /成片 \/ 署名/);
  }

  const factoryResponse = await render("/works/vanishing-factory");
  const factoryHtml = await factoryResponse.text();
  assert.match(factoryHtml, /摄影指导/);
  assert.match(factoryHtml, /幕后现场/);
  assert.doesNotMatch(factoryHtml, /影像画廊 \/ 静帧/);

  const jiamuResponse = await render("/works/jiamu-chawarong");
  const jiamuHtml = await jiamuResponse.text();
  assert.match(jiamuHtml, /嘉姆查瓦绒/);
  assert.match(jiamuHtml, /jiamu-chawarong-01\.jpg/);
  assert.match(jiamuHtml, /摄影师/);
  assert.match(jiamuHtml, /pan\.baidu\.com\/s\/11Px4MKyR0Ltx5KxinlIERQ\?pwd=w69x/);
});

test("capability overview and four evidence-led detail routes render", async () => {
  const overviewResponse = await render("/what-i-do");
  assert.equal(overviewResponse.status, 200);
  const overviewHtml = await overviewResponse.text();
  assert.match(overviewHtml, /AI 影像与生成工作流/);
  assert.match(overviewHtml, /视觉叙事与摄影设计/);
  assert.match(overviewHtml, /纪录片与人物内容/);
  assert.match(overviewHtml, /前期策划与项目执行/);

  for (const slug of ["ai-moving-image", "cinematography", "documentary", "production"]) {
    const response = await render(`/what-i-do/${slug}`);
    assert.equal(response.status, 200, `${slug} should render`);
    const html = await response.text();
    assert.match(html, /工作方式/);
    assert.match(html, /可交付内容/);
    assert.match(html, /相关项目佐证/);
  }
});
