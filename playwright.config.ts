import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: { baseURL: "http://localhost:3000", storageState: { cookies: [], origins: [] }, trace: "on-first-retry" },
  webServer: { command: "node scripts/e2e-server.mjs", url: "http://localhost:3000", reuseExistingServer: false },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
