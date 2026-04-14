export function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  if (url) {
    return url.replace(/\/$/, "");
  }
  return "https://awunjia.com";
}
