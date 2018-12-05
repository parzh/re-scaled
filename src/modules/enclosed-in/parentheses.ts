import { Pattern } from "../../types";
import { concat } from "../../helpers/concat";

/** Enclose pattern in `()` round brackets */
export function enclosedInParentheses(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `\\(${descr.source}\\)` }));
}
