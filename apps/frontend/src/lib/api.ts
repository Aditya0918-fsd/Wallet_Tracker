const API = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

export function apiHref(path: string): string {
  return API + path;
}

function readCookie(name: string): string | undefined {
  return document.cookie.split("; ").find((item) => item.startsWith(name + "="))?.slice(name.length + 1);
}

async function csrfToken(): Promise<string> {
  const current = readCookie("wallet_csrf");
  if (current) return decodeURIComponent(current);
  const response = await fetch(apiHref("/auth/csrf"), { credentials: "include" });
  if (!response.ok) throw new Error("Could not initialize secure request.");
  const result = await response.json() as { token: string };
  return result.token;
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json");
  if (init.method && !["GET", "HEAD", "OPTIONS"].includes(init.method.toUpperCase())) {
    headers.set("x-csrf-token", await csrfToken());
  }
  const response = await fetch(apiHref(path), { ...init, headers, credentials: "include" });
  const contentType = response.headers.get("content-type") || "";
  const body: unknown = contentType.includes("application/json") ? await response.json() : await response.text();
  if (!response.ok) {
    const message = typeof body === "object" && body !== null && "message" in body
      ? String((body as { message: unknown }).message)
      : "The request failed. Please try again.";
    throw new Error(message);
  }
  return body as T;
}
