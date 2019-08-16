import { Pattern, RegExpLike } from "../../types";
import { concat } from "../../helpers/concat";

/** @private */
function addCurlyBracesAroundSource(descr: RegExpLike): RegExpLike {
	descr.source = `\\{${descr.source}\\}`;

	return descr;
}

/** Enclose pattern(s) in `{}` curly braces */
export function enclosedInCurlyBraces(...patterns: Pattern[]): RegExp {
	return concat(patterns, addCurlyBracesAroundSource);
}
