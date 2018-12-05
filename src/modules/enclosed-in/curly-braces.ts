import { Pattern } from "../../types";
import { concat } from "../../helpers/concat";

/** Enclose pattern in `{}` curly braces */
export function enclosedInCurlyBraces(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `\\{${descr.source}\\}` }));
}
