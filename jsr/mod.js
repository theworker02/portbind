/* @ts-self-types="./mod.d.ts" */

import fs from "node:fs";
import path from "node:path";

export const PACKAGE = Object.freeze({ name: "@theworker02/portbind", version: "1.1.0", runtime: "node", registry: "jsr" });
export const DEFAULT_PATTERNS = Object.freeze({ host: "0.0.0.0", port: "PORT" });
export const SKIP_DIRS = Object.freeze(["node_modules", ".git", "dist", "coverage"]);

function globToRegExp(glob) {
  const normalized = glob.replaceAll("\\", "/");
  let re = "";
  for (let i = 0; i < normalized.length; i += 1) {
    const ch = normalized[i];
    if (ch === "*" && normalized[i + 1] === "*") { re += ".*"; i += 1; if (normalized[i + 1] === "/") i += 1; }
    else if (ch === "*") re += "[^/]*";
    else if (ch === "?") re += "[^/]";
    else re += ch.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${re}$`, "i");
}

export function matchGlob(rel, pattern) {
  const target = rel.replaceAll("\\", "/");
  const pat = pattern.replaceAll("\\", "/");
  if (!pat.includes("*") && !pat.includes("?")) return target === pat || target.startsWith(`${pat.replace(/\/$/, "")}/`);
  return globToRegExp(pat).test(target) || globToRegExp(`**/${pat}`).test(target);
}

export function walk(target, files = []) {
  const stat = fs.statSync(target);
  if (stat.isFile()) { files.push(target); return files; }
  for (const name of fs.readdirSync(target)) {
    if (SKIP_DIRS.includes(name)) continue;
    walk(path.join(target, name), files);
  }
  return files;
}

export function scanText(text) {
  const hasBindAll = String(text).includes("0.0.0.0");
  const hasPort = /\$PORT|\bPORT\b/.test(String(text));
  return { hasBindAll, hasPort, ok: hasBindAll && hasPort };
}

export function collectFiles(targets) {
  const files = [];
  for (const target of targets) {
    const resolved = path.resolve(target);
    if (target.includes("*") || target.includes("?")) {
      const root = process.cwd();
      for (const file of walk(root)) {
        const rel = path.relative(root, file).replaceAll("\\", "/");
        if (matchGlob(rel, target) && !files.includes(file)) files.push(file);
      }
      continue;
    }
    if (!fs.existsSync(resolved)) throw new Error(`path not found: ${target}`);
    walk(resolved, files);
  }
  return files;
}

export function scanPaths(targets = ["."], options = {}) {
  const requireHost = options.requireHost !== false;
  const requirePort = options.requirePort !== false;
  const files = collectFiles(targets.length ? targets : ["."]);
  const matches = [];
  let hasBindAll = false;
  let hasPort = false;
  for (const file of files) {
    let text;
    try { text = fs.readFileSync(file, "utf8"); } catch { continue; }
    const part = scanText(text);
    if (part.hasBindAll || part.hasPort) matches.push({ file: path.relative(process.cwd(), file).replaceAll("\\", "/") || file, hasBindAll: part.hasBindAll, hasPort: part.hasPort });
    hasBindAll ||= part.hasBindAll;
    hasPort ||= part.hasPort;
  }
  return { ok: (!requireHost || hasBindAll) && (!requirePort || hasPort), hasBindAll, hasPort, requireHost, requirePort, files: files.length, matches };
}

export function formatHuman(result) {
  return `portbind: ${result.ok ? "OK" : "FAIL"}\n  0.0.0.0   ${result.hasBindAll ? "found" : "missing"}\n  PORT      ${result.hasPort ? "found" : "missing"}\n  scanned   ${result.files} file(s)\n`;
}
