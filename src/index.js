const fs = require("node:fs");
const path = require("node:path");

const SKIP = new Set(["node_modules", ".git", "dist", "coverage"]);

function globToRegExp(glob) {
  const normalized = glob.replaceAll("\\", "/");
  let re = "";
  for (let i = 0; i < normalized.length; i += 1) {
    const ch = normalized[i];
    if (ch === "*" && normalized[i + 1] === "*") {
      re += ".*";
      i += 1;
      if (normalized[i + 1] === "/") i += 1;
    } else if (ch === "*") {
      re += "[^/]*";
    } else if (ch === "?") {
      re += "[^/]";
    } else {
      re += ch.replace(/[.+^${}()|[\]\\]/g, "\\$&");
    }
  }
  return new RegExp(`^${re}$`, "i");
}

function matchGlob(rel, pattern) {
  const target = rel.replaceAll("\\", "/");
  const pat = pattern.replaceAll("\\", "/");
  if (!pat.includes("*") && !pat.includes("?")) {
    return target === pat || target.startsWith(`${pat.replace(/\/$/, "")}/`);
  }
  return globToRegExp(pat).test(target) || globToRegExp(`**/${pat}`).test(target);
}

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

function collectFiles(targets) {
  const files = [];
  for (const target of targets) {
    const resolved = path.resolve(target);
    if (target.includes("*") || target.includes("?")) {
      const root = process.cwd();
      const all = walk(root);
      for (const file of all) {
        const rel = path.relative(root, file).replaceAll("\\", "/");
        if (matchGlob(rel, target) && !files.includes(file)) files.push(file);
      }
      continue;
    }
    if (!fs.existsSync(resolved)) {
      throw new Error(`path not found: ${target}`);
    }
    walk(resolved, files);
  }
  return files;
}

function scanPaths(targets, options = {}) {
  const requireHost = options.requireHost !== false;
  const requirePort = options.requirePort !== false;
  const files = collectFiles(targets.length ? targets : ["."]);
  const matches = [];
  let hasBindAll = false;
  let hasPort = false;
  for (const file of files) {
    let text;
    try {
      text = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }
    const part = scanText(text);
    if (part.hasBindAll || part.hasPort) {
      matches.push({
        file: path.relative(process.cwd(), file).replaceAll("\\", "/") || file,
        hasBindAll: part.hasBindAll,
        hasPort: part.hasPort,
      });
    }
    hasBindAll = hasBindAll || part.hasBindAll;
    hasPort = hasPort || part.hasPort;
  }
  const ok = (!requireHost || hasBindAll) && (!requirePort || hasPort);
  return {
    ok,
    hasBindAll,
    hasPort,
    requireHost,
    requirePort,
    files: files.length,
    matches,
  };
}

function formatHuman(result, { list = false } = {}) {
  const lines = [
    `portbind: ${result.ok ? "OK" : "FAIL"}`,
    `  0.0.0.0   ${result.hasBindAll ? "found" : "missing"}`,
    `  PORT      ${result.hasPort ? "found" : "missing"}`,
    `  scanned   ${result.files} file(s)`,
  ];
  if (list || result.matches.length) {
    lines.push("  matching files:");
    if (!result.matches.length) lines.push("    (none)");
    for (const item of result.matches) {
      const tags = [
        item.hasBindAll ? "host" : null,
        item.hasPort ? "port" : null,
      ].filter(Boolean);
      lines.push(`    ${item.file}  (${tags.join(", ")})`);
    }
  }
  return `${lines.join("\n")}\n`;
}

module.exports = {
  walk,
  scanText,
  scanPaths,
  matchGlob,
  collectFiles,
  formatHuman,
};
