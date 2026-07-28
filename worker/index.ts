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

    if (url.protocol === "http:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // Log every request path for debugging
    console.log("REQUEST PATH:", url.pathname, url.toString());

    // Catch all image optimization requests — use flexible matching
    const isImageOptimizationRequest =
      url.pathname.includes("_vinext/image") ||
      url.pathname.includes("_next/image") ||
      url.pathname.includes("/image");

    if (isImageOptimizationRequest) {
      console.log("IMAGE FALLBACK", url.toString());

      // Try both common parameter names
      const imagePath =
        url.searchParams.get("url") ??
        url.searchParams.get("src");

      if (imagePath) {
        const cleanPath = decodeURIComponent(
          imagePath.startsWith("/") ? imagePath : `/${imagePath}`
        );
        return env.ASSETS.fetch(new Request(new URL(cleanPath, request.url)));
      }

      return new Response("Missing image url parameter", { status: 400 });
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
