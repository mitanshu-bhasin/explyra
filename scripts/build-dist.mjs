/**
 * Cross-platform static build: mirrors the previous PowerShell `npm run build` copy layout.
 * index.html: copied by default (fast; full-file minify can hang on multi‑MB HTML).
 * Set MINIFY_HTML=1 to minify with html-minifier-terser (conservative options).
 * Run from repo root: node scripts/build-dist.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "www",
  ".firebase",
  ".wrangler",
  "android",
]);

const SKIP_ROOT_FILES = new Set([
  "package-lock.json",
  "package.json",
  "Expense Tracker.code-workspace",
]);

const PRUNE_DIR_NAMES = new Set(["node_modules", ".git", ".wrangler", ".next"]);

function shouldSkipRootFile(name) {
  if (name.startsWith(".")) return true;
  if (name === "index.html") return true;
  if (SKIP_ROOT_FILES.has(name)) return true;
  if (name.endsWith(".log")) return true;
  return false;
}

const SKIP_WHILE_COPYING = new Set([...SKIP_DIRS, ...PRUNE_DIR_NAMES]);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP_WHILE_COPYING.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

function pruneBadDirs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (PRUNE_DIR_NAMES.has(entry.name)) {
      fs.rmSync(full, { recursive: true, force: true });
    } else {
      pruneBadDirs(full);
    }
  }
}

async function writeIndexHtml() {
  const indexPath = path.join(root, "index.html");
  const outPath = path.join(distDir, "index.html");

  if (process.env.MINIFY_HTML === "1") {
    const { minify: minifyHtml } = await import("html-minifier-terser");
    const rawHtml = fs.readFileSync(indexPath, "utf8");
    const minifiedHtml = await minifyHtml(rawHtml, {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      minifyCSS: false,
      minifyJS: false,
      minifyURLs: false,
      removeAttributeQuotes: false,
    });
    fs.writeFileSync(outPath, minifiedHtml, "utf8");
    console.log("  index.html minified (MINIFY_HTML=1)");
  } else {
    fs.copyFileSync(indexPath, outPath);
    console.log("  index.html copied (set MINIFY_HTML=1 to minify)");
  }
}

async function main() {
  fs.mkdirSync(distDir, { recursive: true });

  await writeIndexHtml();

  for (const name of fs.readdirSync(root)) {
    if (shouldSkipRootFile(name)) continue;
    const full = path.join(root, name);
    let st;
    try {
      st = fs.statSync(full);
    } catch {
      continue;
    }
    if (st.isFile()) {
      fs.copyFileSync(full, path.join(distDir, name));
    }
  }

  for (const name of fs.readdirSync(root)) {
    const full = path.join(root, name);
    let st;
    try {
      st = fs.statSync(full);
    } catch {
      continue;
    }
    if (!st.isDirectory()) continue;
    if (SKIP_DIRS.has(name)) continue;
    copyDir(full, path.join(distDir, name));
  }

  pruneBadDirs(distDir);
  console.log("✓ dist/ build complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
