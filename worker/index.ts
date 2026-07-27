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

    // Serve image optimization requests directly from ASSETS without transform,
    // since Cloudflare Images binding is not available on this account.
    if (url.pathname === "/_vinext/image") {
      const imagePath = url.searchParams.get("url");
      if (imagePath) {
        return env.ASSETS.fetch(new Request(new URL(imagePath, request.url)));
      }
      return new Response("Image not found", { status: 404 });
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
