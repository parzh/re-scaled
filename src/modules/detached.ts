import { Pattern } from "../types";
import { concat } from "../helpers";

/** Expect the pattern to be a whole string, rather than a part of it */
export function detached(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `^${ descr.source }$` }));
}
