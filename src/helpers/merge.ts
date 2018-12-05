import { Pattern, RegExpDescription } from "../types";
import { toRegex } from "./to-regex";

/** @internal */
export function merge(patterns: Pattern[]): RegExpDescription {
	return patterns.map(toRegex).reduce((res, { source, flags }) => ({ source: res.source += source, flags: res.flags += flags }), { source: "", flags: "" });
}
