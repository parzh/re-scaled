import "mocha";
import { expect } from "chai";
import { repeatedBetween } from "../../../src/modules/repeated/between";

describe("repeated.between()", () => {
	const { source, flags } = repeatedBetween(3, 5)(/a/g, /b/i);

	it("Repeats pattern between `min` and `max` amount of times inclusively", () => {
		expect(source).to.equal("(?:ab){3,5}");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
