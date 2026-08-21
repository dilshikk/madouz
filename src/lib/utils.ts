import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalises a backend-provided image URL so it works in any environment.
 *
 * The backend stores absolute URLs like `http://127.0.0.1:3000/uploads/file.jpg`.
 * When the frontend is accessed remotely (e.g. via ftp.mado.uz:5173) that
 * hardcoded host/port is unreachable from the browser.
 *
 * This function strips the origin from any URL whose pathname starts with
 * /uploads/ or /api/, leaving a root-relative path (/uploads/file.jpg).
 * Vite's dev-server proxy then forwards those requests to localhost:3000.
 *
 * External URLs (Unsplash, placehold.co, data: URIs, etc.) are returned as-is.
 */
export function normaliseImageUrl(url: string | undefined | null): string {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (
      parsed.pathname.startsWith("/uploads/") ||
      parsed.pathname.startsWith("/api/")
    ) {
      // Return only the path (+ search + hash), dropping the origin.
      return parsed.pathname + parsed.search + parsed.hash;
    }
  } catch {
    // Not a full URL – already relative or a bare filename, return as-is.
  }
  return url;
}
