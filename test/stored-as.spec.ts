import "mocha";
import { expect } from "chai";
import { storedAs } from "../src";

describe("storedAs()", () => {
	it("Concatenates several input patterns into a single RegExp and stores the result under a given name", () => {
		expect(storedAs("group")(/a/, /b/).source).to.equal("(?<group>ab)");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(storedAs("group")(/a/g, /b/i).flags).to.equal("gi");
	});
});
