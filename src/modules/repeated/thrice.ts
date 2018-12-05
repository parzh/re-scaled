import { Pattern } from "../../types";
import { concat } from "../../helpers/concat";

/** Repeat pattern exactly three times */
export function repeatedThrice(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source }){3}` }));
}
