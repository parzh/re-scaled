import "mocha";
import { expect } from "chai";
import { repeatedTwice } from "../../../src/modules/repeated/twice";

describe("repeated.twice()", () => {
	const { source, flags } = repeatedTwice(/a/g, /b/i);

	it("Repeats pattern exactly twice", () => {
		expect(source).to.equal("(?:ab){2}");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
