import { RegExpDescription } from "../types";

/** @internal */
export const sanitize = (descr: RegExpDescription): RegExpDescription => {
	descr.source = descr.source.replace(/\(\?\:\)/g, "");
	descr.flags = Array.from(new Set(descr.flags)).join("");

	return descr;
};
