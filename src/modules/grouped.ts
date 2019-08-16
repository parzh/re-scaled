import { Pattern, RegExpLike } from "../types";
import { concat } from "../helpers/concat";

/** @private */
function turnSourceIntoGroup(descr: RegExpLike): RegExpLike {
	descr.source = `(?:${ descr.source })`;

	return descr;
}

/** Group several input patterns into a non-capturing group */
export function grouped(...patterns: Pattern[]): RegExp {
	return concat(patterns, turnSourceIntoGroup);
}
