import { repeatedTwice as twice } from "./twice";
import { repeatedThrice as thrice } from "./thrice";
import { repeatedTimes as times } from "./times";
import { repeatedAtLeast as atLeast } from "./at-least";
import { repeatedBetween as between } from "./between";

export const repeated = {
	/** Repeat pattern exactly twice */
	twice,

	/** Repeat pattern exactly three times */
	thrice,

	/** Repeat pattern exactly `count` amount of times */
	times,

	/** Repeat pattern at least `count` amount of times */
	atLeast,

	/** Repeat pattern between `min` and `max` amount of times inclusively */
	between,
};
