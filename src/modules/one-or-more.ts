import { Pattern, RegExpLike } from "../types";
import { concat } from "../helpers/concat";

/** @private */
function addQuantifierToSource(descr: RegExpLike): RegExpLike {
	descr.source = `(?:${ descr.source })+`;

	return descr;
}

/** Expect at least one appearance of the given pattern */
export function oneOrMore(...patterns: Pattern[]): RegExp {
	return concat(patterns, addQuantifierToSource);
}
