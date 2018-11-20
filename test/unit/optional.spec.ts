import "mocha";
import { expect } from "chai";
import { optional } from "../../src/modules/optional";

describe("optional()", () => {
	const { source, flags } = optional(/a/g, /b/i);

	it("Makes pattern optional", () => {
		expect(source).to.equal("(?:ab)?");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
