import "mocha";
import { expect } from "chai";
import { detached, separatedBy } from "../../src";

describe("Integration case: IP address", () => {
	it("Creates regexp for IP addresses", () => {
		const octet = /(?:25[0-5]|2[0-4]\d|[01]?\d\d?)/;
		const { source } = detached(separatedBy(/\./)(octet, octet, octet, octet));
	
		expect(source).to.equal(
			`^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?))$`
		);
	});
});
