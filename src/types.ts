export type Pattern = string | number | RegExp;

/** @internal */
export interface RegExpLike {
	source: string;
	flags: string;
}
