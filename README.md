## `regex-utils`
Helpers and utility functions for creating and managing regular expression patterns

### Tiny guide
When creating a real-world regular expressions, they usually are not very readable.<br>
`regex-utils` is trying to solve this problem by adding readability and scalability to regexps.

Consider the following use case:

```ts
const ipAddressRegex = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;

function isIPAddress(input: string): boolean {
	return ipAddressRegex.test(input);
}

isIPAddress("127.0.0.1");
// true

isIPAddress("127.0.0.256");
isIPAddress("localhost");
// false
```

Without clear identifier `ipAddressRegex`, you would probably struggle a lot to understand the meaning of the given regex. This is happening because regular expressions heavily utilize special characters, which always decrerase readability; in most cases, words are much easier to read than special characters.

`regex-utils` provides handy functions for the most frequently used features, otherwise achieved by using special characters. Examples of such functions are: `eitherOf()`, `optional()`, `separatedBy()` etc.

Another problem with the regex in the example above is that it is highly repetitive (it is often the case with regular expressions). If we would be able to reuse regex later as a part of another regex, this would drastically improve our ability to scale them up, but regular expressions lacks this functionality (at least, in JavaScript implementation). Fortunately, with `regex-utils` this is possible:

```ts
const dot = /\./;
const bit = /[01]/;
const digit = /\d/;

const octetHigh = /25[0-5]/; // 250 to 255
const octetMiddle = /2[0-4]\d/; // 200 to 249
const octetLow = combined(optional(bit), digit, optional(digit)); // 0 to 199
// same as /[01]?\d\d?/

const octet = eitherOf(octetHigh, octetMiddle, octetLow); // order matters
// same as /(?:25[0-5]|2[0-4]\d|[01]?\d\d?)/

const ipAddressRegex1 = detached(repeated.times(3)(octet, dot), octet);
// three octets each followed by dot, then single octet without a dot
// same as /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/

const ipAddressRegex2 = detached(separatedBy(dot)(octet, octet, octet, octet));
// four octets, separated by dots in between
```
