import "mocha";
import { expect } from "chai";
import { detached } from "../src";

describe("detached()", () => {
	const { source, flags } = detached(/a/g, /b/i);

	it("Expects the pattern to be a whole string, rather than a part of it", () => {
		expect(source).to.equal("^ab$");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(flags).to.equal("gi");
	});
});
