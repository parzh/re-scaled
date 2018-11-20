import { combinedWithFlags, eitherOf } from "..";
import { Pattern } from "../types";
import { merge, toRegex } from "../helpers";

/** Concatenate several input patterns into a single RegExp and remove given flags from it */
export function combinedWithoutFlags(flagsToRemove: string) {
	const unwantedFlags = combinedWithFlags("g")(eitherOf(...flagsToRemove));

	return (...patterns: Pattern[]): RegExp => {
		const { source, flags } = merge(patterns);

		return toRegex({ source, flags: flags.replace(unwantedFlags, "") });
	};
}
