import { Pattern } from "../../types";
import { asNatural } from "../../validate/as-natural";
import { concat } from "../../helpers/concat";

/** Repeat pattern between `min` and `max` amount of times inclusively */
export function repeatedBetween(min: number, max: number) {
	const _min = asNatural(Math.min(min, max), "min repeat count");
	const _max = asNatural(Math.max(min, max), "max repeat count");

	return (...patterns: Pattern[]): RegExp => concat(patterns, (descr) => ({
		...descr,
		source: `(?:${ descr.source }){${ _min },${ _max }}`,
	}));
}
