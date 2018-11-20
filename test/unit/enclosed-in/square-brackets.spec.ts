import "mocha";
import { expect } from "chai";
import { enclosedInSquareBrackets } from "../../../src/modules/enclosed-in/square-brackets";

describe("enclosedIn.squareBrackets()", () => {
	const { source, flags } = enclosedInSquareBrackets(/a/g, /b/i);

	it("Encloses pattern in `[]` square brackets", () => {
		expect(source).to.equal("\\[ab\\]");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
