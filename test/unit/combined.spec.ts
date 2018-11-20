import "mocha";
import { expect } from "chai";
import { combined } from "../../src/modules/combined";

describe("combined()", () => {
	const { source, flags } = combined(/a/g, /b/i);

	it("Concatenates several input patterns into a single RegExp", () => {
		expect(source).to.equal("ab");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
