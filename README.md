# `reScaled`
Helpers and utility functions for creating readable, scalable and reusable regular expressions.

## Tiny guide
When dealing with real-world regular expressions, it is usually super hard to manage them. This is because they are implemented (at least in JavaScript) in such a way that makes them intrinsicly unreadable and unscalable.

Consider the following use case:

```ts
const input = prompt();
const regex = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;

regex.test(input);
```

> Just for fun, try to understand what's happening in the code before reading the next paragraph

Without the knowledge that the regular expression has something to do with IP addresses, you would probably struggle a lot to understand the meaning of the given regex. This happens because regular expressions heavily utilize special characters, which always decrease readability; in most cases, plain words are much easier to read than special characters.

`reScaled` provides handy functions for the most frequently used features, otherwise achieved by special syntax. Examples of such functions are: `eitherOf()`, `optional()`, `separatedBy()` etc.

Another problem with the regex in the example above is that it is highly repetitive (it is often the case with regular expressions). There is no ability to refer to the regular expression in the body of another one. Would it be the case, it would dramatically improve scalability and usability of regular expressions. Fortunately, with `reScaled` this is possible.

First, create smaller building blocks, _atoms_, from which our main regex will be comprised later:

```ts
const $Dot = /\./;
const $Digit = /\d/;
const $Bit = eitherOf(0, 1);

const $OctetHigh = /25[0-5]/; // 250 to 255
const $OctetMiddle = /2[0-4]\d/; // 200 to 249
const $OctetLow = combined(optional($Bit), $Digit, optional($Digit)); // 0 to 199
// same as /[01]?\d\d?/

const $Octet = eitherOf($OctetHigh, $OctetMiddle, $OctetLow); // order matters
// same as /(?:25[0-5]|2[0-4]\d|[01]?\d\d?)/
```

Now with the help of `$Octet` and `$Dot` atoms we can create regular expression for IP addresses, that is easy to read and modify:

```ts
const $IPAddressRegex = detached(repeated.times(3)($Octet, $Dot), $Octet);
// three octets each followed by dot, then single octet without a dot
// same as /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/
```

```ts
const $IPAddressRegex = detached(separatedBy($Dot)($Octet, $Octet, $Octet, $Octet));
// four octets with dots in between
```

What is great here, is that we can use `$IPAddressRegex` as an atom to some other regex, if needed:

```ts
import $IPAddress from "./ip-address-regex";
import $Port from "./port-regex";
import $HumanFriendlyURL from "./human-friendly-url-regex";

const $MachineFriendlyURL = combined($IPAddress, optional(":", $Port));
const $URL = eitherOf($MachineFriendlyURL, $HumanFriendlyURL);

export default $URL;
```

We can build regular expressions on top of each other!

## API

Follow the [docs].

_Try [direct link] if the previous didn't work._

## Legacy notes

In order to see versions of the package prior to `re-scaled@1.1.2`, refer to history of the package [`regex-utils`].

  [`regex-utils`]: https://npmjs.org/package/regex-utils
  [docs]: /docs/api/README.md
  [direct link]: https://gitlab.com/parzh/re-scaled/blob/master/docs/api/README.md