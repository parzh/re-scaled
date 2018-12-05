import { Pattern } from "../../types";
import { asNatural } from "../../validate/as-natural";
import { concat } from "../../helpers/concat";

/** Repeat pattern at least `count` amount of times */
export function repeatedAtLeast(count: number) {
	asNatural(count, `min repeat count`);

	return (...patterns: Pattern[]): RegExp => concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source }){${ count },}` }));
}
