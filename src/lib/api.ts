// src/lib/api.ts
// Shared API service for Konttigo Next.js — mirrors konttigo-web/src/services/

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:80/konttigo-backend";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
export interface EsimPackage {
  id: string;
  data: string;       // e.g. "1 GB"
  day: number;        // validity in days
  price: number;      // USD
  description?: string;
  speed?: string;
}

export interface EsimOperator {
  id: string;
  title: string;
  image: { url: string };
  gradient_start?: string;
  gradient_end?: string;
  packages: EsimPackage[];
}

export interface EsimCountry {
  slug: string;          // e.g. "india", "europe"
  title: string;         // e.g. "India", "Europe"
  type?: string;         // "local" | "regional" | "global"
  image?: { url: string; width?: number; height?: number };
  operators: EsimOperator[];
}

// ──────────────────────────────────────────────
// Core fetch helper
// ──────────────────────────────────────────────
async function apiFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE}${path}${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${url}`);
  }

  const json = await response.json();
  // konttigo-web returns { data: [...] } shaped responses
  return (json?.data ?? json) as T;
}

// ──────────────────────────────────────────────
// eSIM Package endpoints
// ──────────────────────────────────────────────

/**
 * Fetch LOCAL packages (all countries, page=1 limit=177)
 * Returns array of countries each with operators & packages
 */
export async function getLocalPackages(): Promise<EsimCountry[]> {
  return apiFetch<EsimCountry[]>("/airlo/packages", {
    page: "1",
    limit: "177",
  });
}

/**
 * Fetch REGIONAL packages (filter[type]=regional)
 */
export async function getRegionalPackages(): Promise<EsimCountry[]> {
  return apiFetch<EsimCountry[]>("/airlo/packages", {
    "filter[type]": "regional",
  });
}

/**
 * Fetch GLOBAL packages (filter[type]=global)
 */
export async function getGlobalPackages(): Promise<EsimCountry[]> {
  return apiFetch<EsimCountry[]>("/airlo/packages", {
    "filter[type]": "global",
  });
}

/**
 * Get min price from a country's operators
 */
export function getMinPrice(country: EsimCountry): number | null {
  const prices = country.operators
    ?.flatMap((op) => op.packages?.map((p) => p.price) ?? [])
    .filter((p) => typeof p === "number" && p > 0);
  if (!prices?.length) return null;
  return Math.min(...prices);
}

/**
 * Derive ISO 3166-1 alpha-2 country code from a slug or title.
 * Falls back to "UN" (so flags show a question mark) if not found.
 */
export function slugToIso(slugOrTitle: string): string {
  const map: Record<string, string> = {
    "united-states": "US", "united states": "US",
    "india": "IN",
    "mexico": "MX",
    "switzerland": "CH",
    "austria": "AT",
    "thailand": "TH",
    "south-africa": "ZA", "south africa": "ZA",
    "costa-rica": "CR", "costa rica": "CR",
    "saudi-arabia": "SA", "saudi arabia": "SA",
    "united-kingdom": "GB", "united kingdom": "GB",
    "germany": "DE",
    "france": "FR",
    "spain": "ES",
    "italy": "IT",
    "portugal": "PT",
    "netherlands": "NL",
    "brazil": "BR",
    "argentina": "AR",
    "japan": "JP",
    "south-korea": "KR", "south korea": "KR",
    "china": "CN",
    "australia": "AU",
    "canada": "CA",
    "turkey": "TR",
    "uae": "AE",
    "sri-lanka": "LK", "sri lanka": "LK",
    "greece": "GR",
    "egypt": "EG",
    "kenya": "KE",
    "nigeria": "NG",
    "philippines": "PH",
    "indonesia": "ID",
    "malaysia": "MY",
    "singapore": "SG",
    "vietnam": "VN",
    "cambodia": "KH",
    "myanmar": "MM",
    "pakistan": "PK",
    "bangladesh": "BD",
    "nepal": "NP",
    "israel": "IL",
    "jordan": "JO",
    "morocco": "MA",
    "ghana": "GH",
    "colombia": "CO",
    "peru": "PE",
    "chile": "CL",
    "ecuador": "EC",
    "ukraine": "UA",
    "poland": "PL",
    "czechia": "CZ",
    "hungary": "HU",
    "romania": "RO",
    "bulgaria": "BG",
    "croatia": "HR",
    "denmark": "DK",
    "sweden": "SE",
    "norway": "NO",
    "finland": "FI",
    "belgium": "BE",
    "ireland": "IE",
    "new-zealand": "NZ", "new zealand": "NZ",
  };
  const key = slugOrTitle.toLowerCase().replace(/-/g, " ");
  return map[key] ?? map[slugOrTitle.toLowerCase()] ?? "UN";
}
