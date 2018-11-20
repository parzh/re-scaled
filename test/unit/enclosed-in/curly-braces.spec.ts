import "mocha";
import { expect } from "chai";
import { enclosedInCurlyBraces } from "../../../src/modules/enclosed-in/curly-braces";

describe("enclosedIn.curlyBraces()", () => {
	const { source, flags } = enclosedInCurlyBraces(/a/g, /b/i);

	it("Encloses pattern in `{}` curly braces", () => {
		expect(source).to.equal("\\{ab\\}");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
