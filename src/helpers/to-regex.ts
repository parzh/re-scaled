import { Pattern, RegExpLike } from "../types";
import { sanitize } from "./sanitize";

/** @private */
const $SpecialCharacters = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

/** @private */
function escape(pattern: string | number): string {
	return String(pattern).replace($SpecialCharacters, "\\$&");
}

/** @internal */
export function toRegex(pattern: Pattern | RegExpLike): RegExp {
	if (pattern instanceof RegExp)
		return pattern;

	if (typeof pattern !== "object")
		return new RegExp(escape(pattern));

	const { source, flags } = sanitize(pattern);

	return new RegExp(source, flags);
}
