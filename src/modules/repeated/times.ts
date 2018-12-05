import { Pattern } from "../../types";
import { asNatural } from "../../validate/as-natural";
import { concat } from "../../helpers/concat";

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
	asNatural(count, "repeat count");

	return (...patterns: Pattern[]): RegExp => concat(patterns, (descr) => ({ ...descr, source: countedSource(count, descr.source) }));
}
