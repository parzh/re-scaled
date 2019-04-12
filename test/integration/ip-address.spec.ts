import "mocha";
import { expect } from "chai";
import { detached, separatedBy } from "../../src";

describe("Integration case: IP address", () => {
	it("Creates regexp for IP addresses", () => {
		const $Octet = /(?:25[0-5]|2[0-4]\d|[01]?\d\d?)/;
		const { source } = detached(separatedBy(/\./)($Octet, $Octet, $Octet, $Octet));
		const { source: octetSource } = $Octet;
		const expected = `^(?:${ octetSource }\\.${ octetSource }\\.${ octetSource }\\.${ octetSource })$`;

		expect(source).to.equal(expected);
	});
});
