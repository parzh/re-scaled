import "mocha";
import { expect } from "chai";
import { oneOrMore, storedAs, combined, detached, optional } from "../../src";

describe("Integration case: Number", () => {
	it("Creates regexp for numbers with optional decimal part", () => {
		const $Digits = oneOrMore(/\d/);
		const $DecimalSeparator = /[.,]/;
		const $IntegerPart = storedAs("integer")($Digits);
		const $DecimalPart = combined($DecimalSeparator, storedAs("decimal")($Digits));

		const { source } = detached($IntegerPart, optional($DecimalPart));

		expect(source).to.equal("^(?<integer>(?:\\d)+)(?:[.,](?<decimal>(?:\\d)+))?$");
	});
});
