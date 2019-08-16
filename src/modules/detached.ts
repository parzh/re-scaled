import { Pattern, RegExpLike } from "../types";
import { concat } from "../helpers/concat";

/** @private */
function addDelimitersToSource(descr: RegExpLike): RegExpLike {
	descr.source = `^${ descr.source }$`;

	return descr;
}

/** Expect the pattern to be a whole string, rather than a part of it */
export function detached(...patterns: Pattern[]): RegExp {
	return concat(patterns, addDelimitersToSource);
}
