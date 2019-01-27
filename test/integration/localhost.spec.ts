import "mocha";
import { expect } from "chai";
import { separatedBy, detached, storedAs, eitherOf, combined, optional, repeated } from "../../src";

describe("Integration case: Localhost", () => {
	it("Creates regexp for localhost hostname", () => {
		const octetHigh = /25[0-5]/;
		const octetMid = /2[0-4]\d/;
		const octetLow = combined(optional(eitherOf(0, 1)), repeated.between(1, 2)(/\d/));
		const octet = eitherOf(octetHigh, octetMid, octetLow);

		const dot = /\./;
		const localhostIpV6 = /\[::1\]/;
		const localhostIpV4 = separatedBy(dot)(/127/, octet, octet, octet);

		const { source } = detached(storedAs("hostname")(eitherOf("localhost", localhostIpV6, localhostIpV4)));
		const { source: octetSource } = octet;
		const dottedOctetSource = `\\.${ octetSource }`;
		const expected = `^(?<hostname>(?:localhost|\\[::1\\]|(?:127${ dottedOctetSource.repeat(3) })))$`;

		expect(source).to.equal(expected);
	});
});
