import { Pattern, RegExpLike } from "../../types";
import { concat } from "../../helpers/concat";

import asNatural from "./validate-as-natural.helper";

/** Repeat pattern at least `count` amount of times */
export function repeatedAtLeast(count: number) {
	asNatural(count, "min repeat count");

	/** @private */
	const addQuantifierToSource = (descr: RegExpLike): RegExpLike => {
		descr.source = `(?:${ descr.source }){${ count },}`;

		return descr;
	};

	return (...patterns: Pattern[]): RegExp => concat(patterns, addQuantifierToSource);
}
