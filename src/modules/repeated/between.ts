import { Pattern, RegExpLike } from "../../types";
import { concat } from "../../helpers/concat";

import asNatural from "./validate-as-natural.helper";

/** Repeat pattern between `min` and `max` amount of times inclusively */
export function repeatedBetween(min: number, max: number) {
	const _min = asNatural(Math.min(min, max), "min repeat count");
	const _max = asNatural(Math.max(min, max), "max repeat count");

	/** @private */
	const addQuantifierToSource = (descr: RegExpLike): RegExpLike => {
		descr.source = `(?:${ descr.source }){${ _min },${ _max }}`;

		return descr;
	};

	return (...patterns: Pattern[]): RegExp => concat(patterns, addQuantifierToSource);
}
