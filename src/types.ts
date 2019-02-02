export type Pattern = string | number | RegExp;

/** @internal */
export interface RegExpDescription {
	source: string;
	flags: string;
}
