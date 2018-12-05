import { Pattern } from "../types";
import { concat } from "../helpers/concat";

/** Concatenate several input patterns into a single RegExp */
export function combined(...patterns: Pattern[]): RegExp {
	return concat(patterns);
}
