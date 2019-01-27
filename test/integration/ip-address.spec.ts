import "mocha";
import { expect } from "chai";
import { detached, separatedBy } from "../../src";

describe("Integration case: IP address", () => {
	it("Creates regexp for IP addresses", () => {
		const octet = /(?:25[0-5]|2[0-4]\d|[01]?\d\d?)/;
		const { source } = detached(separatedBy(/\./)(octet, octet, octet, octet));
		const { source: octetSource } = octet;
		const expected = `^(?:${ octetSource }\\.${ octetSource }\\.${ octetSource }\\.${ octetSource })$`;

		expect(source).to.equal(expected);
	});
});
