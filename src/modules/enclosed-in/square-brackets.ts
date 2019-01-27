import { Pattern } from "../../types";
import { concat } from "../../helpers/concat";

/** Enclose pattern(s) in `[]` square brackets */
export function enclosedInSquareBrackets(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `\\[${descr.source}\\]` }));
}
