import "mocha";
import { expect } from "chai";
import { enclosedInParentheses } from "../../../src/modules/enclosed-in/parentheses";

describe("enclosedIn.parentheses()", () => {
	const { source, flags } = enclosedInParentheses(/a/g, /b/i);

	it("Encloses pattern in `()` round brackets", () => {
		expect(source).to.equal("\\(ab\\)");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
