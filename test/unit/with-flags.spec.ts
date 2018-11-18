import "mocha";
import { expect } from "chai";
import { combined, withFlags } from "../../src";

describe("withFlags()", () => {
	it("Adds flags to the resulting regular expression", () => {
		const { source, flags } = combined(/abc/my, withFlags("gi"));

		expect(source).to.equal("abc");
		expect(flags).to.equal("gimy");
	});
});
