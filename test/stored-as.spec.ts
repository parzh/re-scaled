import "mocha";
import { expect } from "chai";
import { storedAs } from "../src";

describe("storedAs()", () => {
	const { source, flags } = storedAs("group")(/a/g, /b/i);

	it("Concatenates several input patterns into a single RegExp and stores the result under a given name", () => {
		expect(source).to.equal("(?<group>ab)");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
