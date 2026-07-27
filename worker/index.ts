/** Cloudflare Worker entry point for the William Personal Website. */
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Serve all image optimization requests directly from ASSETS without transform.
    // Cloudflare Images binding is not available on this account, so all /image,
    // /_next/image, and /_vinext/image endpoints must return raw assets.
    const imagePathnames = ["/_vinext/image", "/_next/image", "/image"];
    if (imagePathnames.includes(url.pathname)) {
      const imagePath = url.searchParams.get("url");
      if (imagePath) {
        const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
        return env.ASSETS.fetch(new Request(new URL(cleanPath, request.url)));
      }
      return new Response("Missing image url parameter", { status: 400 });
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
