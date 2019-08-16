import { valuer } from "@valuer/main";
import { Pattern } from "../types";
import { concat } from "../helpers/concat";

/** @private */
const asSeparator = valuer.as<Pattern>({
	"is neither string nor RegExp": (v: Pattern) =>
		typeof v === "string" || v instanceof RegExp,
});

/** Concatenate several input patterns into a single RegExp, separating them by a given `separator` pattern */
export function separatedBy(separator: Pattern) {
	asSeparator(separator, "pattern separator");

	const _separator = new RegExp(separator instanceof RegExp ? separator.source : String(separator));

	return (...patterns: Pattern[]): RegExp => {
		if (!patterns.length)
			return concat([]);

		const _patterns: Pattern[] = [];

		for (const pattern of patterns)
			_patterns.push(pattern, _separator);

		// remove the last element, which is a separator
		_patterns.length--;

		return concat(_patterns, (descr) => ({ ...descr, source: `(?:${ descr.source })` }));
	};
}
