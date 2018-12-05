import { Pattern, RegExpDescription } from "../types";

/** @private */
const sanitize = ({ source, flags }: RegExpDescription): RegExpDescription => ({
	source: source.replace(/\(\?\:\)/g, ""),
	flags: Array.from(new Set(flags)).join(""),
});

/** @internal */
export function toRegex(pattern: Pattern | RegExpDescription): RegExp {
	if (pattern instanceof RegExp)
		return pattern;

	if (typeof pattern !== "object")
		return new RegExp(String(pattern));

	const { source, flags } = sanitize(pattern);

	return new RegExp(source, flags);
}
