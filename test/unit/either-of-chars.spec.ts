import "mocha";
import { expect } from "chai";
import { eitherOfChars } from "../../src/modules/either-of-chars";

describe("eitherOfChars()", () => {
	it("Accepts only strings", () => {
		expect(() => eitherOfChars((/a/g) as any)).to.throw(/is not a primitive/);
		expect(() => eitherOfChars(42 as any)).to.throw(/is not of type "string": value <number> 42/);
		expect(() => eitherOfChars("a", "b", "cd")).to.not.throw(/is not a string/);
	});

	it("Expect appearance of one of the characters given in the input", () => {
		expect(eitherOfChars("aa", "b").source).to.equal("[ab]");
	});

	it("Treats words as arrays of characters", () => {
		expect(eitherOfChars("chAracters").source).to.equal("[chArates]");
		expect(eitherOfChars("hello", "world").source).to.equal("[helowrd]");
	});

	it("Rejects creating empty character set", () => {
		expect(() => eitherOfChars("")).to.throw(/Cannot create empty character set/);
	});

	it("Escapes special characters", () => {
		expect(() => eitherOfChars("+-*/")).to.not.throw(/Invalid regular expression/);
	});
});
