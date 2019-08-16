import { Pattern, RegExpLike } from "../../types";
import { concat } from "../../helpers/concat";

/** @private */
function addSquareBracketsAroundSource(descr: RegExpLike): RegExpLike {
	descr.source = `\\[${descr.source}\\]`;

	return descr;
}

/** Enclose pattern(s) in `[]` square brackets */
export function enclosedInSquareBrackets(...patterns: Pattern[]): RegExp {
	return concat(patterns, addSquareBracketsAroundSource);
}
