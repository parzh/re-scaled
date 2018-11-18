import "mocha";
import { expect } from "chai";
import { combined, repeated } from "../../src";

describe("repeated.atLeast()", () => {
	const { source, flags } = combined(/a/g, repeated.atLeast(8)(/b/i));

	it("Repeats pattern at least `count` amount of times", () => {
		expect(source).to.equal("a(?:b){8,}");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
