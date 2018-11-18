import "mocha";
import { expect } from "chai";
import { detached } from "../src";

describe("detached()", () => {
	it("Expects the pattern to be a whole string, rather than a part of it", () => {
		expect(detached(/a/, /b/).source).to.equal("^ab$");
	});

	it("Merges all flags from all RegExp inputs together", () => {
		expect(detached(/a/g, /b/i).flags).to.equal("gi");
	});
});
