import { Pattern, RegExpLike } from "../../types";
import { concat } from "../../helpers/concat";

/** @private */
function addParenthesesAroundSource(descr: RegExpLike): RegExpLike {
	descr.source = `\\(${descr.source}\\)`;

	return descr;
}

/** Enclose pattern(s) in `()` round brackets */
export function enclosedInParentheses(...patterns: Pattern[]): RegExp {
	return concat(patterns, addParenthesesAroundSource);
}
