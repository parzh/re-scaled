import "mocha";
import { expect } from "chai";
import { separatedBy, detached, storedAs, eitherOf } from "../../src";

describe("Integration case: Localhost", () => {
	it("Creates regexp for localhost hostname", () => {
		const octet = /(?:25[0-5]|2[0-4]\d|[01]?\d\d?)/;
		const localhostIpV6 = /\[::1\]/;
		const localhostIpV4 = separatedBy(/\./)(/127/, octet, octet, octet);

		const { source } = detached(storedAs("hostname")(eitherOf("localhost", localhostIpV6, localhostIpV4)));;
	
		expect(source).to.equal(
			`^(?<hostname>(?:localhost|\\[::1\\]|(?:127\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?))))$`
		);
	});
});
