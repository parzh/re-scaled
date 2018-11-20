import { asNatural } from "../../validate";
import { Pattern } from "../../types";
import { concat } from "../../helpers";

export function repeatedBetween(min: number, max: number) {
	asNatural(min, `min repeat count`);
	asNatural(max, `max repeat count`);

	return (...patterns: Pattern[]): RegExp => concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source }){${ min },${ max }}` }));
}
