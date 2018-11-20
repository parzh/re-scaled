import "mocha";
import { expect } from "chai";
import { combinedWithFlags } from "../../src/modules/combined-with-flags";

describe("combinedWithFlags()", () => {
	it("Concatenates several input patterns into a single RegExp and adds given flags to it", () => {
		const { source, flags } = combinedWithFlags("gi")(/ab/y, /c/m);

		expect(source).to.equal("abc");
		expect(flags).to.equal("gimy");
	});
});
