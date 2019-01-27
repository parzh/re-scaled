import { Pattern } from "../../types";
import { asNatural } from "../../validate/as-natural";
import { concat } from "../../helpers/concat";

/** Repeat pattern between `min` and `max` amount of times inclusively */
export function repeatedBetween(min: number, max: number) {
	const _min = Math.min(min, max);
	const _max = Math.max(min, max);

	asNatural(_min, "min repeat count");
	asNatural(_max, "max repeat count");

	return (...patterns: Pattern[]): RegExp => concat(patterns, (descr) => ({
		...descr,
		source: `(?:${ descr.source }){${ _min },${ _max }}`,
	}));
}
