import { valuer } from "@valuer/main";
import { Pattern } from "./types";

/** @private */
function isPattern(v: Pattern) {
	return typeof v === "string" || v instanceof RegExp;
}

/** @internal */
export const asNatural = valuer.as<number>({ number: "integer", spectrum: "non-negative" });

/** @internal */
export const asSeparator = valuer.as<Pattern>({
	'is neither string nor RegExp': isPattern,
});
