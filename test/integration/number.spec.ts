import "mocha";
import { expect } from "chai";
import { oneOrMore, storedAs, combined, detached, optional } from "../../src";

describe("Integration case: Number", () => {
	it("Creates regexp for numbers with optional decimal part", () => {
		const digits = oneOrMore(/\d/);
		const decimalSeparator = /[.,]/;
		const integerPart = storedAs("integer")(digits);
		const decimalPart = combined(decimalSeparator, storedAs("decimal")(digits));

		const { source } = detached(integerPart, optional(decimalPart));

		expect(source).to.equal("^(?<integer>(?:\\d)+)(?:[.,](?<decimal>(?:\\d)+))?$");
	});
});
