# portbind


---

## License & acquisition

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02).


<img src="docs/logo.svg" alt="portbind mark" width="96" height="96">

**Scan source trees for deploy-safe `0.0.0.0` host binding and environment-driven `PORT` configuration.**

[![JSR](https://jsr.io/badges/@theworker02/portbind)](https://jsr.io/@theworker02/portbind)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license proprietary](https://img.shields.io/badge/license-Proprietary%20(source--available)-0B1F33)

**Package:** [`@theworker02/portbind`](https://jsr.io/@theworker02/portbind)  ·  **Site:** [GitHub Pages](https://theworker02.github.io/portbind/)  ·  **Source:** [`theworker02/portbind`](https://github.com/theworker02/portbind)

## Purpose

Scan source trees for deploy-friendly host binding (`0.0.0.0`) and environment-driven port configuration (`PORT` / `$PORT`). Helps catch local-only `127.0.0.1` listeners before container or PaaS deploys.

## Highlights

- Walks directories with sensible skips (`node_modules`, `.git`).
- Requires host and port patterns by default; flags can narrow checks.
- JSON and list modes for CI reporting.
- Text-level scanning — no AST dependency.


## Add from JSR

```bash
deno add jsr:@theworker02/portbind
```

```ts
import { scanPaths, scanText, DEFAULT_PATTERNS } from "@theworker02/portbind";

console.log(scanText('server.listen(process.env.PORT, "0.0.0.0")'));
console.log(scanPaths(["./src"]));
console.log(DEFAULT_PATTERNS);
```

## Public API

- `scanText(text)` — inspect one text value.
- `scanPaths(targets, options)` — scan files, directories, and globs.
- `collectFiles(targets)` — expand scan targets.
- `walk(path)` — recursively enumerate files.
- `matchGlob(path, pattern)` — compact glob matching.
- `formatHuman(result)` — terminal-friendly output.
- `DEFAULT_PATTERNS`, `SKIP_DIRS`, `PACKAGE` — documented configuration metadata.
- `ScanTextResult`, `FileMatch`, `ScanOptions`, `ScanResult` — TypeScript interfaces.

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/portbind`, published using GitHub Actions trusted publishing.



## CLI examples

Run from a cloned repository (Node 18+):

```bash
git clone https://github.com/theworker02/portbind.git
cd portbind
node src/cli.js
node src/cli.js src/server.js
node src/cli.js --list "src/**/*.js"
node src/cli.js --require-host --json ./src
```

See `node src/cli.js --help` for flags and exit codes.

## Limitations

- Pattern matching is textual; unusual indirection or dynamic hosts may be missed.
- Cannot prove a service binds correctly at runtime, only that source mentions expected patterns.
- Glob support is compact; very large trees should use targeted paths.

## Documentation

- [JSR package and generated API docs](https://jsr.io/@theworker02/portbind)
- [Project site](https://theworker02.github.io/portbind/)
- [Source repository](https://github.com/theworker02/portbind)

## License

**Source-available proprietary** — evaluation under [LICENSE](./LICENSE); commercial / production use via [COMMERCIAL.md](./COMMERCIAL.md). See [LICENSE_TRANSITION_NOTICE.md](./LICENSE_TRANSITION_NOTICE.md) and [NOTICE](./NOTICE).


## Status

portbind is actively packaged for commercial licensing and acquisition diligence. See [ACQUISITION.md](./ACQUISITION.md) and [docs/acquisition/](./docs/acquisition/).

