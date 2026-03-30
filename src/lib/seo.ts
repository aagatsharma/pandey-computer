const FALLBACK_SITE_URL = "https://pandeycomputers.com.np";

export function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_BASE_URL || FALLBACK_SITE_URL).trim();
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  return withProtocol.replace(/\/+$/, "");
}

export function getSiteUrlObject(): URL {
  return new URL(getSiteUrl());
}

export const defaultOgImage = {
  url: "/logo.png",
  width: 512,
  height: 512,
  alt: "Pandey Computer",
};
