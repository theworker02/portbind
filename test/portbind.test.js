const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { scanPaths, scanText, matchGlob } = require("../src/index.js");

const cli = path.join(__dirname, "..", "src", "cli.js");

describe("portbind", () => {
  it("requires both 0.0.0.0 and PORT", () => {
    assert.equal(scanText("listen(0.0.0.0)").ok, false);
    assert.equal(scanText("listen($PORT)").ok, false);
    assert.equal(scanText("listen('0.0.0.0', process.env.PORT)").ok, true);
  });

  it("scans a directory of files", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "portbind-"));
    fs.writeFileSync(path.join(dir, "a.js"), "host = '0.0.0.0'\n");
    fs.writeFileSync(path.join(dir, "b.js"), "const port = process.env.PORT\n");
    const result = scanPaths([dir]);
    assert.equal(result.ok, true);
    assert.equal(result.matches.length, 2);
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("matches globs and --require-host only", () => {
    assert.equal(matchGlob("src/server.js", "src/**/*.js"), true);
    assert.equal(matchGlob("src/server.js", "*.md"), false);
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "portbind-"));
    fs.writeFileSync(path.join(dir, "only-host.js"), "0.0.0.0\n");
    const hostOnly = scanPaths([dir], { requireHost: true, requirePort: false });
    assert.equal(hostOnly.ok, true);
    const both = scanPaths([dir], { requireHost: true, requirePort: true });
    assert.equal(both.ok, false);
    const cliRun = spawnSync(process.execPath, [cli, "--require-host", "--json", dir], {
      encoding: "utf8",
    });
    assert.equal(cliRun.status, 0);
    assert.equal(JSON.parse(cliRun.stdout).ok, true);
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("fails when a path does not exist", () => {
    const result = spawnSync(process.execPath, [cli, "no-such-path"], { encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /path not found/);
  });
});
