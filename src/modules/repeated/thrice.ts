import { Pattern, RegExpLike } from "../../types";
import { concat } from "../../helpers/concat";

/** @private */
function addQuantifierToSource(descr: RegExpLike): RegExpLike {
	descr.source = `(?:${ descr.source }){3}`;

	return descr;
}

/** Repeat pattern exactly three times */
export function repeatedThrice(...patterns: Pattern[]): RegExp {
	return concat(patterns, addQuantifierToSource);
}
