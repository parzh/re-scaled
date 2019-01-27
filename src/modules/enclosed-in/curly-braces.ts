import { Pattern } from "../../types";
import { concat } from "../../helpers/concat";

/** Enclose pattern(s) in `{}` curly braces */
export function enclosedInCurlyBraces(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `\\{${descr.source}\\}` }));
}
