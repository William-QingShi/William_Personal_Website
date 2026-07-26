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
  assert.match(html, /AI CREATIVE TECHNOLOGIST/);
  assert.match(html, /AI × Film × Creative Production/);
  assert.match(html, /SELECTED WORKS/);
  assert.match(html, /WHAT I DO/);
  assert.match(html, /AI FILM/);
  assert.match(html, /CINEMATOGRAPHY/);
  assert.match(html, /VISUAL STORYTELLING/);
  assert.match(html, /FILM PRODUCTION/);
  assert.match(html, /Home<\/a>.*Works<\/a>.*What I Do<\/a>.*About<\/a>.*Contact<\/a>/s);
});

test("project detail renders real media and archive sections", async () => {
  const response = await render("/works/yuhua");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /羽化/);
  assert.match(html, /Image Gallery \/ Stills/);
  assert.match(html, /Process \/ Development/);
  assert.match(html, /Behind the Scenes/);
  assert.match(html, /Credits/);
  assert.match(html, /yuhua-01\.jpg/);
  assert.match(html, /projects%2Fprocess%2Fyuhua-01\.jpg/);
  assert.match(html, /projects%2Fbts%2Fyuhua-01\.jpg/);
  assert.doesNotMatch(html, /permission|权限待确认/i);
});
