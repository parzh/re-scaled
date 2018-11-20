import { asNatural } from "../../validate";
import { Pattern } from "../../types";
import { concat } from "../../helpers";

/** Repeat pattern exactly `count` amount of times */
export function repeatedTimes(count: number) {
	asNatural(count, "repeat count");

	return (...patterns: Pattern[]): RegExp => concat(patterns, (descr) => ({
		...descr,
		source:
			count === 0 ? "" :
			count === 1 ? descr.source :
			`(?:${ descr.source }){${ count }}`
	}));
}
