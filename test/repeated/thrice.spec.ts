import "mocha";
import { expect } from "chai";
import { combined, repeated } from "../../src";

describe("repeated.thrice()", () => {
	const { source, flags } = combined(/a/g, repeated.thrice(/b/i));

	it("Repeats pattern exactly three times", () => {
		expect(source).to.equal("a(?:b){3}");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
