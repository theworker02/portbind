const fs = require("node:fs");
const path = require("node:path");

const SKIP = new Set(["node_modules", ".git", "dist", "coverage"]);

function walk(target, files = []) {
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    files.push(target);
    return files;
  }
  for (const name of fs.readdirSync(target)) {
    if (SKIP.has(name)) continue;
    walk(path.join(target, name), files);
  }
  return files;
}

function scanText(text) {
  const hasBindAll = text.includes("0.0.0.0");
  const hasPort = /\$PORT|\bPORT\b/.test(text);
  return { hasBindAll, hasPort, ok: hasBindAll && hasPort };
}

function scanPaths(targets) {
  const files = targets.flatMap((target) => walk(path.resolve(target)));
  let hasBindAll = false;
  let hasPort = false;
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const part = scanText(text);
    hasBindAll = hasBindAll || part.hasBindAll;
    hasPort = hasPort || part.hasPort;
    if (hasBindAll && hasPort) break;
  }
  return { ok: hasBindAll && hasPort, hasBindAll, hasPort, files: files.length };
}

module.exports = { walk, scanText, scanPaths };
