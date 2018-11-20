import { Pattern } from "../types";
import { concat } from "../helpers";

/** Expect at least one appearance of the given pattern */
export function oneOrMore(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source })+` }));
}
