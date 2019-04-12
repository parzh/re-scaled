import { Pattern } from "../types";
import { merge } from "../helpers/merge";
import { toRegex } from "../helpers/to-regex";

/** Concatenate several input patterns into a single RegExp, and remove given flags from it */
export function combinedWithoutFlags(flagsToRemove: string) {
	const $UnwantedFlags = new RegExp(`[${ flagsToRemove }]`, "g");

	return (...patterns: Pattern[]): RegExp => {
		const { source, flags } = merge(patterns);

		return toRegex({ source, flags: flags.replace($UnwantedFlags, "") });
	};
}
