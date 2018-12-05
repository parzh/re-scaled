import { Pattern } from "../types";
import { concat } from "../helpers/concat";
import { toRegex } from "../helpers/to-regex";

/** Concatenate several input patterns into a single RegExp and add given flags to it */
export function combinedWithFlags(additionalFlags: string) {
	return (...patterns: Pattern[]): RegExp => {
		const { source, flags } = concat(patterns);

		return toRegex({ source, flags: flags + additionalFlags });
	};
}
