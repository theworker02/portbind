/** Scan source trees for bind-all host and environment-port configuration. @module */
export interface ScanTextResult { hasBindAll: boolean; hasPort: boolean; ok: boolean; }
export interface FileMatch { file: string; hasBindAll: boolean; hasPort: boolean; }
export interface ScanOptions { requireHost?: boolean; requirePort?: boolean; }
export interface ScanResult extends ScanTextResult { requireHost: boolean; requirePort: boolean; files: number; matches: FileMatch[]; }
/** Package identity and release metadata. */
export const PACKAGE: Readonly<{ name: "@theworker02/portbind"; version: "1.1.0"; runtime: "node"; registry: "jsr" }>;
/** Default host and port patterns. */
export const DEFAULT_PATTERNS: Readonly<{ host: "0.0.0.0"; port: "PORT" }>;
/** Directory names skipped while walking trees. */
export const SKIP_DIRS: readonly string[];
/** Match a repository-relative path against a compact glob. */
export function matchGlob(rel: string, pattern: string): boolean;
/** Recursively collect files under a path. */
export function walk(target: string, files?: string[]): string[];
/** Scan a text value for host and port patterns. */
export function scanText(text: string): ScanTextResult;
/** Expand file, directory, and glob targets into concrete files. */
export function collectFiles(targets: string[]): string[];
/** Scan source paths for deploy-safe host and port configuration. */
export function scanPaths(targets?: string[], options?: ScanOptions): ScanResult;
/** Format a scan result for terminal output. */
export function formatHuman(result: ScanResult): string;
