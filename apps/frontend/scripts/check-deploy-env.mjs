const rawUrl = process.env.VITE_API_URL;

if (!rawUrl) {
  console.error("Set VITE_API_URL to the production API base (for example https://api.example.com/api) before deploying.");
  process.exit(1);
}

try {
  const url = new URL(rawUrl);
  if (url.protocol !== "https:" || !url.pathname.replace(/\/$/, "").endsWith("/api") || url.search || url.hash) {
    throw new Error();
  }
} catch {
  console.error("VITE_API_URL must be an HTTPS API base URL ending in /api, with no query or fragment.");
  process.exit(1);
}
