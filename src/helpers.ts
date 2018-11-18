import { Pattern, RegExpDescription } from "./types";

/** @internal */
export function toRegex(pattern: Pattern): RegExp {
	return pattern instanceof RegExp ? pattern : new RegExp(pattern);
}

/** @private */
function uniqueChars(input: string): string {
	return Array.from(new Set(input)).join("");
}

/** @private */
function merge(patterns: Pattern[]): RegExpDescription {
	return patterns.map(toRegex).reduce((res, { source, flags }) => ({ source: res.source += source, flags: res.flags += flags }), { source: "", flags: "" });
}

/** @internal */
export function concat(patterns: Pattern[], alter: (descritpion: RegExpDescription) => RegExpDescription = (descr) => descr): RegExp {
	const { source = "", flags = "" } = alter(merge(patterns));

	return new RegExp(source, uniqueChars(flags));
}
