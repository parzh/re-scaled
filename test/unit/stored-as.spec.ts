import "mocha";
import { expect } from "chai";
import { combined, storedAs } from "../../src";

describe("storedAs()", () => {
	const { source, flags } = combined(/a/g, storedAs("group")(/b/i));

	it("Concatenates several input patterns into a single RegExp and stores the result under a given name", () => {
		expect(source).to.equal("a(?<group>b)");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
