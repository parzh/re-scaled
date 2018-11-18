import "mocha";
import { expect } from "chai";
import { combined, enclosedIn } from "../../../src";

describe("enclosedIn.parentheses()", () => {
	const { source, flags } = combined(/a/g, enclosedIn.parentheses(/b/i));

	it("Encloses pattern in `()` round brackets", () => {
		expect(source).to.equal("a\\(b\\)");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
