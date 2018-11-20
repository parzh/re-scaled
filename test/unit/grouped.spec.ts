import "mocha";
import { expect } from "chai";
import { grouped } from "../../src/modules/grouped";

describe("grouped()", () => {
	const { source, flags } = grouped(/a/g, /b/i);

	it("Groups several input patterns into a non-capturing group", () => {
		expect(source).to.equal("(?:ab)");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
