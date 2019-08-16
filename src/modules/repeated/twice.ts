import { Pattern, RegExpLike } from "../../types";
import { concat } from "../../helpers/concat";

/** @private */
function addQuantifierToSource(descr: RegExpLike): RegExpLike {
	descr.source = `(?:${ descr.source }){2}`;

	return descr;
}

/** Repeat pattern exactly twice */
export function repeatedTwice(...patterns: Pattern[]): RegExp {
	return concat(patterns, addQuantifierToSource);
}
