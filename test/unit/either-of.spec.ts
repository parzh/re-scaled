import "mocha";
import { expect } from "chai";
import { combined, eitherOf } from "../../src";

describe("eitherOf()", () => {
	const { source, flags } = combined(/a/g, eitherOf(/b/i, /c/y));

	it("Expects appearance of one of the given patterns", () => {
		expect(source).to.equal("a(?:b|c)");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("giy");
	});
});
