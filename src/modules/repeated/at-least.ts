import { Pattern } from "../../types";
import { concat } from "../../helpers/concat";

import validate from "./validate-as-natural.helper";

/** Repeat pattern at least `count` amount of times */
export function repeatedAtLeast(count: number) {
	validate(count, "min repeat count");

	return (...patterns: Pattern[]): RegExp => concat(patterns, (descr) => ({
		...descr,
		source: `(?:${ descr.source }){${ count },}`,
	}));
}
