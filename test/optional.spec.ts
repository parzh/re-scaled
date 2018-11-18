import "mocha";
import { expect } from "chai";
import { combined, optional } from "../src";

describe("optional()", () => {
	const { source, flags } = combined(/a/g, optional(/b/i));

	it("Makes pattern optional", () => {
		expect(source).to.equal("a(?:b)?");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
