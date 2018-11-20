import { Pattern } from "../types";
import { concat } from "../helpers";

/** Make pattern optional */
export function optional(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source })?` }));
}
