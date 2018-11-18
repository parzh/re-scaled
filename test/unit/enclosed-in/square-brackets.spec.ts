import "mocha";
import { expect } from "chai";
import { combined, enclosedIn } from "../../../src";

describe("enclosedIn.squareBrackets()", () => {
	const { source, flags } = combined(/a/g, enclosedIn.squareBrackets(/b/i));

	it("Encloses pattern in `[]` square brackets", () => {
		expect(source).to.equal("a\\[b\\]");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
