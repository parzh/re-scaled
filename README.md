## `reScaled`
Helpers and utility functions for creating readable, scalable and reusable regular expressions

### Tiny guide
When dealing with real-world regular expressions, it is usually super hard to manage them. This is because they are implemented (at least in JavaScript) in such a way that makes them intrinsicly unreadable and unscalable.

Consider the following use case:

```ts
const ipAddressRegex = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;

function isIPAddress(input: string): boolean {
	return ipAddressRegex.test(input);
}
```

Without the knowledge that the regular expression has something to do with IP addresses, you would probably struggle a lot to understand the meaning of the given regex. This happens because regular expressions heavily utilize special characters, which always decrease readability; in most cases, plain words are much easier to read than special characters.

`reScaled` provides handy functions for the most frequently used features, otherwise achieved by special syntax. Examples of such functions are: `eitherOf()`, `optional()`, `separatedBy()` etc.

Another problem with the regex in the example above is that it is highly repetitive (it is often the case with regular expressions). There is no ability to refer to the regular expression in the body of another one. Wuold it be the case, it would dramatically improve scalability and usability of regular expressions. Fortunately, with `reScaled` this is possible.

First create smaller building blocks, atoms, from which our main regex will be comprised later:

```ts
const dot = /\./;
const digit = /\d/;
const bit = eitherOf(0, 1);

const octetHigh = /25[0-5]/; // 250 to 255
const octetMiddle = /2[0-4]\d/; // 200 to 249
const octetLow = combined(optional(bit), digit, optional(digit)); // 0 to 199
// same as /[01]?\d\d?/

const octet = eitherOf(octetHigh, octetMiddle, octetLow); // order matters
// same as /(?:25[0-5]|2[0-4]\d|[01]?\d\d?)/
```

Now with the help of `octet` and `dot` atoms we can create regular expression for IP addresses, that is easy to read and modify:

```ts
const ipAddressRegex = detached(repeated.times(3)(octet, dot), octet);
// three octets each followed by dot, then single octet without a dot
// same as /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/
```

```ts
const ipAddressRegex = detached(separatedBy(dot)(octet, octet, octet, octet));
// four octets with dots in between
```

What is great here, is that we can use `ipAddressRegex` as an atom to some other regex, if needed:

```ts
import ipAddress from "./ip-address-regex";
import port from "./port-regex";
import humanFriendlyURL from "./human-friendly-url-regex";

const machineFriendlyURL = combined(ipAddress, optional(":", port));

export const url = eitherOf(machineFriendlyURL, humanFriendlyURL);
```

We can build regular expressions on top of each other!

### API

_Coming soon. For now, if possible you should use IntelliSense or autocompletion feature of your favorite IDE._
