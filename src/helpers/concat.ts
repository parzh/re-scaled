import { Pattern, RegExpLike } from "../types";
import { toRegex } from "./to-regex";
import { merge } from "./merge";

/** @private */
const noop = (arg: any) => arg;

/** @internal */
export function concat(
	patterns: Pattern[],
	alter: (descr: RegExpLike) => RegExpLike = noop,
): RegExp {
	return toRegex(alter(merge(patterns)));
}
