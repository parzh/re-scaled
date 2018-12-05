import { enclosedInParentheses as parentheses } from "./parentheses";
import { enclosedInSquareBrackets as squareBrackets } from "./square-brackets";
import { enclosedInCurlyBraces as curlyBraces } from "./curly-braces";

export const enclosedIn = {
	/** Enclose pattern in `()` parentheses */
	parentheses,

	/** Enclose pattern in `[]` square braces */
	squareBrackets,

	/** Enclose pattern in `{}` curly braces */
	curlyBraces,
};
