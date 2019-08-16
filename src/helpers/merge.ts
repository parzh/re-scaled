import { Pattern, RegExpLike } from "../types";
import { toRegex } from "./to-regex";

/** @internal */
export function merge(patterns: Pattern[]): RegExpLike {
	const sourceChunks: string[] = [];
	const flagsChunks: string[] = [];

	for (const pattern of patterns) {
		const { source, flags } = toRegex(pattern);

		sourceChunks.push(source);
		flagsChunks.push(flags);
	}

	return {
		source: sourceChunks.join(""),
		flags: flagsChunks.join(""),
	};
}
