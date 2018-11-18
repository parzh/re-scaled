import "mocha";
import { expect } from "chai";
import { combined, repeated } from "../../../src";

describe("repeated.atLeast()", () => {
	const { source, flags } = combined(/a/g, repeated.between(3, 5)(/b/i));

	it("Repeats pattern between `min` and `max` amount of times inclusively", () => {
		expect(source).to.equal("a(?:b){3,5}");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
