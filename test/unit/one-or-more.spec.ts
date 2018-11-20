import "mocha";
import { expect } from "chai";
import { oneOrMore } from "../../src/modules/one-or-more";

describe("oneOrMore()", () => {
	const { source, flags } = oneOrMore(/a/g, /b/i);

	it("Expects at least one appearance of the given pattern", () => {
		expect(source).to.equal("(?:ab)+");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
