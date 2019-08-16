import { Pattern, RegExpLike } from "../../types";
import { concat } from "../../helpers/concat";

import validate from "./validate-as-natural.helper";

/** @private */
const countedSource = (count: number, source: string) => {
	return (
		count === 0 ?
			""
		:
		count === 1 ?
			source
		:
			`(?:${ source }){${ count }}`
	);
};

/** Repeat pattern exactly `count` amount of times */
export function repeatedTimes(count: number) {
	validate(count, "repeat count");

	/** @private */
	const addQuantifierToSource = (descr: RegExpLike): RegExpLike => {
		descr.source = countedSource(count, descr.source);

		return descr;
	};

	return (...patterns: Pattern[]): RegExp => concat(patterns, addQuantifierToSource);
}
