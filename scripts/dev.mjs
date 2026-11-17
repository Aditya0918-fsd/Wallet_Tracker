import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envFile = resolve(root, ".env");
if (existsSync(envFile) && typeof process.loadEnvFile === "function") {
  process.loadEnvFile(envFile);
}

const apps = [
  {
    name: "backend",
    cwd: resolve(root, "apps/backend"),
    entry: resolve(root, "apps/backend/node_modules/@nestjs/cli/bin/nest.js"),
    args: ["start", "--watch"],
  },
  {
    name: "frontend",
    cwd: resolve(root, "apps/frontend"),
    entry: resolve(root, "apps/frontend/node_modules/vite/bin/vite.js"),
    args: ["dev", "--host", "0.0.0.0"],
  },
];

for (const app of apps) {
  if (!existsSync(app.entry)) {
    console.error(`Dependencies are missing for ${app.name}. Install the project dependencies first.`);
    process.exit(1);
  }
}

console.log("Starting Wallet Tracker locally...");
console.log("Frontend: http://localhost:5173");
console.log("Backend:  http://localhost:3001/api");
console.log("Press Ctrl+C to stop both services.\n");

const children = apps.map((app) => {
  const child = spawn(process.execPath, [app.entry, ...app.args], {
    cwd: app.cwd,
    env: process.env,
    stdio: "inherit",
  });
  child.on("error", (error) => {
    console.error(`${app.name} failed to start: ${error.message}`);
    stopAll("SIGTERM");
  });
  child.on("exit", (code) => {
    if (!shuttingDown) {
      process.exitCode = code && code > 0 ? code : 1;
      stopAll("SIGTERM");
    }
  });
  return child;
});

let shuttingDown = false;
function stopAll(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (child.exitCode === null && !child.killed) {
      try {
        child.kill(signal);
      } catch {
        child.kill();
      }
    }
  }
}

process.on("SIGINT", () => {
  process.exitCode = 130;
  stopAll("SIGINT");
});
process.on("SIGTERM", () => {
  process.exitCode = 143;
  stopAll("SIGTERM");
});
