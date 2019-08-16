import { Pattern, RegExpLike } from "../types";
import { concat } from "../helpers/concat";

/** @private */
function addQuantifierToSource(descr: RegExpLike): RegExpLike {
	descr.source = `(?:${ descr.source })?`;

	return descr;
}

/** Make pattern optional */
export function optional(...patterns: Pattern[]): RegExp {
	return concat(patterns, addQuantifierToSource);
}
