# portbind

<img src="docs/logo.svg" alt="portbind mark" width="96" height="96">

**Scan source trees for deploy-safe `0.0.0.0` host binding and environment-driven `PORT` configuration.**

[![JSR](https://jsr.io/badges/@theworker02/portbind)](https://jsr.io/@theworker02/portbind)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)

**Package:** [`@theworker02/portbind`](https://jsr.io/@theworker02/portbind) · **Site:** [GitHub Pages](https://theworker02.github.io/portbind/) · **Source:** [`theworker02/portbind`](https://github.com/theworker02/portbind)

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

## CLI from source

```bash
git clone https://github.com/theworker02/portbind.git
cd portbind
node src/cli.js ./src
```

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/portbind`, published using GitHub Actions trusted publishing.

## License

[MIT](LICENSE) © 2026 theworker02
