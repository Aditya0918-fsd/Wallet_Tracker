import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
import { withErrorPage } from "@/lib/start-error-page.ts";

// Deployed apps get an HTML error page instead of Start's raw JSON (dev keeps
// the JSON for the preview).
//
export default createServerEntry({
  async fetch(request, opts) {
    const response = await handler.fetch(request, opts);
    if (import.meta.env.DEV) return response;
    const pageResponse = await withErrorPage(request, response);
    const headers = new Headers(pageResponse.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("X-Frame-Options", "DENY");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    headers.set("Strict-Transport-Security", "max-age=31536000");
    return new Response(pageResponse.body, {
      status: pageResponse.status,
      statusText: pageResponse.statusText,
      headers,
    });
  },
});
