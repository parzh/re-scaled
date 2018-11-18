import { Pattern } from "./types";
import { concat, toRegex, merge } from "./helpers";
import { asNatural, asSeparator } from "./validate";

/** Concatenate several input patterns into a single RegExp */
export function combined(...patterns: Pattern[]): RegExp {
	return concat(patterns);
}

/** Concatenate several input patterns into a single RegExp and add given flags to it */
export function combinedWithFlags(additionalFlags: string) {
	return (...patterns: Pattern[]): RegExp => {
		const { source, flags } = concat(patterns);

		return toRegex({ source, flags: flags + additionalFlags });
	};
}

/** Concatenate several input patterns into a single RegExp and remove given flags from it */
export function combinedWithoutFlags(flagsToRemove: string) {
	const unwantedFlags = combinedWithFlags("g")(eitherOf(...flagsToRemove));

	return (...patterns: Pattern[]): RegExp => {
		const { source, flags } = merge(patterns);

		return toRegex({ source, flags: flags.replace(unwantedFlags, "") });
	};
}

/** Concatenate several input patterns into a single RegExp and store the result under a given name */
export function storedAs(name: string) {
	return (...patterns: Pattern[]): RegExp => concat(patterns, (descr) => ({ ...descr, source: `(?<${ name }>${ descr.source })` }));
}

/** Expect the pattern to be a whole string, rather than a part of it */
export function detached(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `^${ descr.source }$` }));
}

/** Make pattern optional */
export function optional(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source })?` }));
}

/** Expect at least one appearance of the given pattern */
export function oneOrMore(...patterns: Pattern[]): RegExp {
	return concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source })+` }));
}

export const repeated = {
	/** Repeat pattern exactly twice */
	twice(...patterns: Pattern[]): RegExp {
		return concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source }){2}` }));
	},

	/** Repeat pattern exactly three times */
	thrice(...patterns: Pattern[]): RegExp {
		return concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source }){3}` }));
	},

	/** Repeat pattern exactly `count` amount of times */
	times(count: number) {
		asNatural(count, "repeat count");

		return (...patterns: Pattern[]): RegExp => concat(patterns, (descr) => ({ ...descr, source: count ? `(?:${ descr.source }){${ count }}` : "" }));
	},

	/** Repeat pattern at least `count` amount of times */
	atLeast(count: number) {
		asNatural(count, `min repeat count`);

		return (...patterns: Pattern[]): RegExp => concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source }){${ count },}` }));
	},

	/** Repeat pattern between `min` and `max` amount of times inclusively */
	between(min: number, max: number) {
		asNatural(min, `min repeat count`);
		asNatural(max, `max repeat count`);

		return (...patterns: Pattern[]): RegExp => concat(patterns, (descr) => ({ ...descr, source: `(?:${ descr.source }){${ min },${ max }}` }));
	},
};

export const enclosedIn = {
	/** Enclose pattern in `()` round brackets */
	parentheses(...patterns: Pattern[]): RegExp {
		return concat(patterns, (descr) => ({ ...descr, source: `\\(${ descr.source }\\)` }));
	},

	/** Enclose pattern in `[]` square brackets */
	squareBrackets(...patterns: Pattern[]): RegExp {
		return concat(patterns, (descr) => ({ ...descr, source: `\\[${ descr.source }\\]` }));
	},

	/** Enclose pattern in `{}` curly braces */
	curlyBraces(...patterns: Pattern[]): RegExp {
		return concat(patterns, (descr) => ({ ...descr, source: `\\{${ descr.source }\\}` }));
	},
};

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

/** Expect appearance of one of the given patterns */
export function eitherOf(...patterns: Pattern[]): RegExp {
	return separatedBy("|")(...patterns);
}
