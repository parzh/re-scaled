import { Pattern, RegExpLike } from "../../types";
import { concat } from "../../helpers/concat";

import validate from "./validate-as-natural.helper";

/** Repeat pattern between `min` and `max` amount of times inclusively */
export function repeatedBetween(min: number, max: number) {
	const _min = validate(Math.min(min, max), "min repeat count");
	const _max = validate(Math.max(min, max), "max repeat count");

	/** @private */
	const addQuantifierToSource = (descr: RegExpLike): RegExpLike => {
		descr.source = `(?:${ descr.source }){${ _min },${ _max }}`;

		return descr;
	};

	return (...patterns: Pattern[]): RegExp => concat(patterns, addQuantifierToSource);
}
