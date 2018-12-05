import { Pattern } from "../types";
import { concat } from "../helpers/concat";

/** Make pattern optional */
export function optional(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source })?` }));
}
