import { RegExpLike } from "../types";

/** @internal */
export const sanitize = (descr: RegExpLike): RegExpLike => {
	descr.source = descr.source.replace(/\(\?\:\)/g, "");
	descr.flags = Array.from(new Set(descr.flags)).join("");

	return descr;
};
