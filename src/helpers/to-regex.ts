import { Pattern, RegExpLike } from "../types";
import { sanitize } from "./sanitize";

/** @internal */
export function toRegex(pattern: Pattern | RegExpLike): RegExp {
	if (pattern instanceof RegExp)
		return pattern;

	if (typeof pattern !== "object")
		return new RegExp(String(pattern));

	const { source, flags } = sanitize(pattern);

	return new RegExp(source, flags);
}
