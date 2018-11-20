import { Pattern } from "../types";
import { concat } from "../helpers";

/** Concatenate several input patterns into a single RegExp and store the result under a given name */
export function storedAs(name: string) {
	return (...patterns: Pattern[]): RegExp =>
		concat(patterns, descr => ({
			...descr,
			source: `(?<${name}>${descr.source})`
		}));
}
