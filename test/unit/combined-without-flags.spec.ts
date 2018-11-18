import "mocha";
import { expect } from "chai";
import { combinedWithoutFlags } from "../../src";

describe("combinedWithoutFlags()", () => {
	it("Concatenates several input patterns into a single RegExp and removes given flags from it", () => {
		const { source, flags } = combinedWithoutFlags("imy")(/abc/gimy);

		expect(source).to.equal("abc");
		expect(flags).to.equal("g");
	});
});
