import "server-only";

function readApiUrl(): string {
  const value = process.env.API_URL;

  if (!value) {
    throw new Error("API_URL must be set to the server-side product API base URL.");
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("API_URL must be a valid HTTP or HTTPS URL.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("API_URL must be a valid HTTP or HTTPS URL.");
  }

  return url.toString().replace(/\/$/, "");
}

export const env = {
  apiUrl: readApiUrl(),
};
