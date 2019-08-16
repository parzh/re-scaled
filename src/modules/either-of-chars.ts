import { valuer } from "@valuer/main";
import { RegExpLike } from "../types";
import { concat } from "../helpers/concat";

/** @private */
const asString = valuer.as<string>("primitive", "string");

/** @private */
function turnSourceIntoCharacterSet(descr: RegExpLike): RegExpLike {
	descr.source = `[${ descr.source }]`;

	return descr;
}

/** Expect appearance of one of the characters given in the input */
export function eitherOfChars(...characters: string[]): RegExp {
	const chars = new Set<string>();

	for (const input of characters)
		for (const character of asString(input))
			chars.add(character);

	if (!chars.size)
		throw new Error("Cannot create empty character set");

	return concat(Array.from(chars), turnSourceIntoCharacterSet);
}
