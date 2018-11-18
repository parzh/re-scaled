import "mocha";
import { expect } from "chai";
import { combined, enclosedIn } from "../../../src";

describe("enclosedIn.curlyBraces()", () => {
	const { source, flags } = combined(/a/g, enclosedIn.curlyBraces(/b/i));

	it("Encloses pattern in `{}` curly braces", () => {
		expect(source).to.equal("a\\{b\\}");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
