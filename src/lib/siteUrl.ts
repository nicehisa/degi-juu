export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const fallback = "https://degi-juu.vercel.app";
  const url = configured || (vercelUrl ? `https://${vercelUrl}` : fallback);

  return url.replace(/\/$/, "");
}
