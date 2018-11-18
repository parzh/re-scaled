import { RegExpDescription } from "./types";

/** @internal */
export function sanitizeFlags(input: string): string {
	return Array.from(new Set(input)).join("");
}

/** @internal */
export function sanitizeSource(source: string): string {
	return source.replace(/\(\?\:\)/g, "");
}

/** @internal */
export function sanitize(description: RegExpDescription): RegExpDescription {
	const { source, flags } = description;

	return { source: sanitizeSource(source), flags: sanitizeFlags(flags) };
}
