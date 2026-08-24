const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { scanPaths, scanText } = require("../src/index.js");

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
    fs.rmSync(dir, { recursive: true, force: true });
  });
});
