import "mocha";
import { expect } from "chai";
import { combined, repeated } from "../../src";

describe("repeated.twice()", () => {
	const { source, flags } = combined(/a/g, repeated.twice(/b/i));

	it("Repeats pattern exactly twice", () => {
		expect(source).to.equal("a(?:b){2}");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
