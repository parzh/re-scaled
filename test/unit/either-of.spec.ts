import "mocha";
import { expect } from "chai";
import { eitherOf } from "../../src/modules/either-of";

describe("eitherOf()", () => {
	const { source, flags } = eitherOf(/a/g, /b/i);

	it("Expects appearance of one of the given patterns", () => {
		expect(source).to.equal("(?:a|b)");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
