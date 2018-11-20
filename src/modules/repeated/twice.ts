import { Pattern } from "../../types";
import { concat } from "../../helpers";

/** Repeat pattern exactly twice */
export function repeatedTwice(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source }){2}` }));
}
