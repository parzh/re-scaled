import "mocha";
import { expect } from "chai";
import { separatedBy, detached, storedAs, eitherOf, combined, optional, repeated } from "../../src";

describe("Integration case: Localhost", () => {
	it("Creates regexp for localhost hostname", () => {
		const $OctetHigh = /25[0-5]/;
		const $OctetMid = /2[0-4]\d/;
		const $OctetLow = combined(optional(eitherOf(0, 1)), repeated.between(1, 2)(/\d/));
		const $Octet = eitherOf($OctetHigh, $OctetMid, $OctetLow);

		const $Dot = /\./;
		const $LocalhostIpV6 = /\[::1\]/;
		const $LocalhostIpV4 = separatedBy($Dot)(/127/, $Octet, $Octet, $Octet);

		const { source } = detached(storedAs("hostname")(eitherOf("localhost", $LocalhostIpV6, $LocalhostIpV4)));
		const { source: octetSource } = $Octet;
		const dottedOctetSource = `\\.${ octetSource }`;
		const expected = `^(?<hostname>(?:localhost|\\[::1\\]|(?:127${ dottedOctetSource.repeat(3) })))$`;

		expect(source).to.equal(expected);
	});
});
