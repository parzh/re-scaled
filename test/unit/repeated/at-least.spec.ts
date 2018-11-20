import "mocha";
import { expect } from "chai";
import { repeatedAtLeast } from "../../../src/modules/repeated/at-least";

describe("repeated.atLeast()", () => {
	const { source, flags } = repeatedAtLeast(8)(/a/g, /b/i);

	it("Repeats pattern at least `count` amount of times", () => {
		expect(source).to.equal("(?:ab){8,}");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
