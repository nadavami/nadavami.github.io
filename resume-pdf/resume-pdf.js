#!/usr/bin/env node

import { execSync } from "node:child_process";
import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { parseArgs } from "node:util";
import readline from "node:readline";
import { chromium } from "playwright";



const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const { values: opts } = parseArgs({
  options: {
    data: { type: "string" },
    out: { type: "string" },
    "keep-build": { type: "boolean", default: false },
  },
});

// ---------------------------------------------------------------------------
// Resolve data path
// ---------------------------------------------------------------------------

const defaultData = path.join(ROOT, "_data", "resume.yml");
const dataPath = opts.data ? path.resolve(opts.data) : defaultData;
const isVariant = Boolean(opts.data);

if (!fs.existsSync(dataPath)) {
  console.error(`Data file not found: ${dataPath}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Resolve output path
// ---------------------------------------------------------------------------

const variantName = isVariant
  ? path.basename(dataPath, path.extname(dataPath))
  : "default";
const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const outPath = opts.out
  ? path.resolve(opts.out)
  : path.join(ROOT, "resume-pdf", "out", `resume-${variantName}-${dateStamp}.pdf`);

fs.mkdirSync(path.dirname(outPath), { recursive: true });

if (fs.existsSync(outPath)) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((r) => rl.question(`${outPath} exists. Overwrite? [y/N] `, r));
  rl.close();
  if (answer.trim().toLowerCase() !== "y") {
    console.log("Aborted.");
    process.exit(0);
  }
}

// ---------------------------------------------------------------------------
// Jekyll build
// ---------------------------------------------------------------------------

const buildDir = fs.mkdtempSync(path.join(os.tmpdir(), "pdf-resume-"));

function cleanup() {
  try {
    fs.rmSync(buildDir, { recursive: true, force: true });
  } catch {
    // best-effort
  }
}

const configPaths = [
  path.join(ROOT, "_config.yml"),
  path.join(ROOT, "resume-pdf", "_config.yml"),
].join(",");

const env = { ...process.env };
if (isVariant) {
  env.RESUME_DATA = dataPath;
} else {
  delete env.RESUME_DATA;
}

console.log(
  isVariant
    ? `Building with variant: ${dataPath}`
    : "Building with default resume data",
);

try {
  execSync(
    `bundle exec jekyll build --config "${configPaths}" --destination "${buildDir}"`,
    { cwd: ROOT, env, stdio: "inherit" },
  );
} catch {
  console.error("Jekyll build failed.");
  if (!opts["keep-build"]) cleanup();
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Static file server
// ---------------------------------------------------------------------------

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".json": "application/json",
  ".xml": "application/xml",
  ".yml": "text/yaml",
};

function serve(root) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url, "http://localhost");
      let file = path.join(root, decodeURIComponent(url.pathname));
      try {
        if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
      } catch {
        // fall through to readFile error
      }
      try {
        const data = fs.readFileSync(file);
        const ext = path.extname(file);
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end();
      }
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

// ---------------------------------------------------------------------------
// PDF generation
// ---------------------------------------------------------------------------

let server;
try {
  server = await serve(buildDir);
  const port = server.address().port;
  const url = `http://127.0.0.1:${port}/resume-pdf/`;

  console.log(`Serving build at ${url}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: outPath,
    preferCSSPageSize: true,
    printBackground: true,
  });

  await browser.close();
  console.log(`PDF written to ${outPath}`);
} catch (err) {
  console.error(`PDF generation failed: ${err.message}`);
  process.exit(1);
} finally {
  if (server) server.close();
  if (opts["keep-build"]) {
    console.log(`Build directory kept at ${buildDir}`);
  } else {
    cleanup();
  }
}
