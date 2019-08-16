import { Pattern, RegExpLike } from "../types";
import { concat } from "../helpers/concat";

/** Concatenate several input patterns into a single RegExp and store the result under a given name */
export function storedAs(name: string) {
	/** @private */
	const turnSourceIntoNamedGroup = (descr: RegExpLike): RegExpLike => {
		descr.source = `(?<${ name }>${ descr.source })`;

		return descr;
	};

	return (...patterns: Pattern[]): RegExp => concat(patterns, turnSourceIntoNamedGroup);
}
