import "mocha";
import { expect } from "chai";
import { combined } from "../src";

describe("combined()", () => {
	it("Concatenates several input patterns into a single RegExp", () => {
		expect(combined(/a/, /b/).source).to.equal("ab");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(combined(/a/g, /b/i).flags).to.equal("gi");
	});
});
