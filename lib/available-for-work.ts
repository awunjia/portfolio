/**
 * Home hero “available for work” indicator.
 * Controlled by `NEXT_PUBLIC_AVAILABLE_FOR_WORK` (true/1/yes → available).
 */
export function isAvailableForWork(): boolean {
  const raw = process.env.NEXT_PUBLIC_AVAILABLE_FOR_WORK?.trim().toLowerCase();
  if (!raw) return false;
  return raw === "true" || raw === "1" || raw === "yes";
}
