import "mocha";
import { expect } from "chai";
import { combined, oneOrMore } from "../src";

describe("oneOrMore()", () => {
	const { source, flags } = combined(/a/g, oneOrMore(/b/i));

	it("Expects at least one appearance of the given pattern", () => {
		expect(source).to.equal("a(?:b)+");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
