import { enclosedInParentheses as parentheses } from "./parentheses";
import { enclosedInSquareBrackets as squareBrackets } from "./square-brackets";
import { enclosedInCurlyBraces as curlyBraces } from "./curly-braces";

export const enclosedIn = {
	/** Enclose pattern(s) in `()` parentheses */
	parentheses,

	/** Enclose pattern(s) in `[]` square braces */
	squareBrackets,

	/** Enclose pattern(s) in `{}` curly braces */
	curlyBraces,
};
