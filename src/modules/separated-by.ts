import { Pattern } from "../types";
import { asSeparator } from "../validate";
import { concat } from "../helpers";

/** Concatenate several input patterns into a single RegExp, separating them by a given `separator` pattern */
export function separatedBy(separator: Pattern) {
	asSeparator(separator, "pattern separator");

	const _separator = new RegExp(separator instanceof RegExp ? separator.source : String(separator));

	return (...patterns: Pattern[]): RegExp => {
		if (!patterns.length)
			return concat([]);

		const _patterns: Pattern[] = [];

		for (const pattern of patterns)
			_patterns.push(_separator, pattern);

		_patterns.shift();

		return concat(_patterns, (descr) => ({ ...descr, source: `(?:${ descr.source })` }));
	};
}
