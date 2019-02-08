import { Pattern } from "../types";
import { separatedBy } from "./separated-by";

/** Expect appearance of one of the given patterns */
export function eitherOf(...patterns: Pattern[]): RegExp {
	return separatedBy("|")(...patterns);
}
