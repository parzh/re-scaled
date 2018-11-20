import "mocha";
import { expect } from "chai";
import { repeatedThrice } from "../../../src/modules/repeated/thrice";

describe("repeated.thrice()", () => {
	const { source, flags } = repeatedThrice(/a/g, /b/i);

	it("Repeats pattern exactly three times", () => {
		expect(source).to.equal("(?:ab){3}");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
