import { Pattern, RegExpDescription } from "../types";
import { sanitize } from "./sanitize";

/** @internal */
export function toRegex(pattern: Pattern | RegExpDescription): RegExp {
	if (pattern instanceof RegExp)
		return pattern;

	if (typeof pattern !== "object")
		return new RegExp(String(pattern));

	const { source, flags } = sanitize(pattern);

	return new RegExp(source, flags);
}
