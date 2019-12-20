import "mocha";
import { expect } from "chai";
import { combined, detached, storedAs, eitherOf, repeatedBetween, separatedBy } from "../../src";

describe("Integration case: Localhost", () => {
	it("Creates regexp for localhost hostname", () => {
		const $Dot = ".";
		const $Zero = repeatedBetween(1, 3)("0");
		const $One = combined(repeatedBetween(0, 2)("0"), "1");

		const $LocalhostIpV6 = /\[::1\]/;
		const $LocalhostIpV4 = separatedBy($Dot)("127", $Zero, $Zero, $One);

		const { source: actual } =
			detached(storedAs("hostname")(eitherOf("localhost", $LocalhostIpV6, $LocalhostIpV4)));

		const expected =
			`^(?<hostname>(?:localhost|\\[::1\\]|(?:127${ ($Dot + $Zero.source).repeat(2) }.${ $One.source })))$`;

		expect(actual).to.equal(expected);
	});
});
