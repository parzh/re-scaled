import { Pattern } from "../../types";
import { asNatural } from "../../validate/as-natural";
import { concat } from "../../helpers/concat";

/** Repeat pattern between `min` and `max` amount of times inclusively */
export function repeatedBetween(min: number, max: number) {
	asNatural(min, "min repeat count");
	asNatural(max, "max repeat count");

	return (...patterns: Pattern[]): RegExp => concat(patterns, (descr) => ({
		...descr,
		source: `(?:${ descr.source }){${ min },${ max }}`,
	}));
}
