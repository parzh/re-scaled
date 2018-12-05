import { Pattern } from "../types";
import { concat } from "../helpers/concat";

/** Group several input patterns into a non-capturing group */
export function grouped(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source })` }));
}
