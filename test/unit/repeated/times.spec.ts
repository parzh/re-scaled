import "mocha";
import { expect } from "chai";
import { repeatedTimes } from "../../../src/modules/repeated/times";

describe("repeated.times()", () => {
	const { source, flags } = repeatedTimes(8)(/a/g, /b/i);

	it("Repeats pattern exactly `count` amount of times", () => {
		expect(source).to.equal("(?:ab){8}");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
