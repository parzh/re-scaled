import "mocha";
import { expect } from "chai";
import { combined, separatedBy } from "../src";

describe("separatedBy()", () => {
	const { source, flags } = combined(/a/g, separatedBy("\.")(/b/i, /c/y));

	it("Concatenates several input patterns into a single RegExp, separating them by a given `separator` pattern", () => {
		expect(source).to.equal("a(?:b\.c)");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("giy");
	});
});
