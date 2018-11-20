import "mocha";
import { expect } from "chai";
import { separatedBy } from "../../src/modules/separated-by";

describe("separatedBy()", () => {
	const { source, flags } = separatedBy("\.")(/a/g, /b/i, /c/y);

	it("Concatenates several input patterns into a single RegExp, separating them by a given `separator` pattern", () => {
		expect(source).to.equal("(?:a\.b\.c)");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("giy");
	});
});
