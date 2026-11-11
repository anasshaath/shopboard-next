import { env } from "@/lib/env";

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchJson<T>(path: string, decode: (value: unknown) => T): Promise<T> {
  const response = await fetch(`${env.apiUrl}/${path.replace(/^\/+/, "")}`, { cache: "no-store" });
  if (!response.ok) throw new ApiError(`Request failed with status ${response.status}.`, response.status);

  let payload: unknown;
  try { payload = await response.json(); } catch { throw new Error("The ShopBoard API returned invalid JSON."); }
  return decode(payload);
}
