import { Pattern, RegExpDescription } from "./types";
import { sanitize } from "./sanitize";

/** @private */
function noop(arg: any) {
	return arg;
}

/** @internal */
export function toRegex(pattern: Pattern | RegExpDescription): RegExp {
	if (pattern instanceof RegExp)
		return pattern;

	if (typeof pattern === "string")
		return new RegExp(pattern);

	const { source, flags } = sanitize(pattern);

	return new RegExp(source, flags);
}

/** @internal */
export function merge(patterns: Pattern[]): RegExpDescription {
	return patterns.map(toRegex).reduce((res, { source, flags }) => ({ source: res.source += source, flags: res.flags += flags }), { source: "", flags: "" });
}

/** @internal */
export function concat(patterns: Pattern[], alter: (description: RegExpDescription) => RegExpDescription = noop): RegExp {
	return toRegex(alter(merge(patterns)));
}
