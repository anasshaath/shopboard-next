import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";

const products = JSON.parse(readFileSync(new URL("../e2e/fixtures/products.json", import.meta.url), "utf8"));
const apiPort = 4010;
let nextProcess;
const apiServer = createServer((request, response) => {
  const productId = request.url?.match(/^\/api\/products\/(\d+)$/)?.[1];
  const product = productId ? products.find((item) => item.id === Number(productId)) : null;
  const payload = request.url === "/api/products" ? { items: products, total: products.length } : product;
  response.writeHead(payload ? 200 : 404, { "content-type": "application/json" });
  response.end(JSON.stringify(payload ?? { error: "Not found" }));
});
function stop() { nextProcess?.kill(); apiServer.close(); }
apiServer.listen(apiPort, "127.0.0.1", () => {
  nextProcess = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev"], {
    env: { ...process.env, API_URL: `http://127.0.0.1:${apiPort}/api` },
    stdio: "inherit",
  });
  nextProcess.on("exit", (code) => process.exit(code ?? 0));
});
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
