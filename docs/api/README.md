# `reScaled` API Reference

## Types

### `Pattern`

Entity, that might be used as a pattern, namely: primitive `string`, primitive `number`, or an instance of `RegExp`.

_Notice how `RegExp` is a subtype of `Pattern` in this nomenclature._

This documentation heavily relies on the definition of `Pattern`, but nevertheless you don't necessarily have to import and use it explicitly.

## Functions

### `combined(...patterns: Pattern[]): RegExp`

Concatenate several input patterns into a single RegExp.

```ts
combined(/a/g, /b/s);
// /ab/gs
```

```ts
combined("a", /b/);
// /ab/
```

_Note: here and later, in all the functions that take in several patterns as arguments list (i.e. whose signature is similar to `f(...pattern: Pattern[])`) will accumulate and intelligently combine all the flags from all the given patterns. To remove unwanted flags, use `combinedWithoutFlags` function (see below)._

### `combinedWithFlags(flags: string)(...patterns: Pattern[]): RegExp`

Concatenate several input patterns into a single RegExp, and add given flags to it.

```ts
combinedWithFlags("g")("a", /b/);
// /ab/g
```

```ts
combinedWithFlags("gs")("a", /b/);
// /ab/gs
```

### `combinedWithoutFlags(flags: string)(...patterns: Pattern[]): RegExp`

Concatenate several input patterns into a single RegExp, and remove given flags from it.

```ts
combinedWithoutFlags("g")("a", /b/g);
// /ab/
```

```ts
combinedWithoutFlags("gs")("a", /b/gm);
// /ab/m
```

```ts
combinedWithoutFlags()("a", /b/g);
// /ab/g
```

_Notice how in the third example no flags were removed, which means that you have to specify all the unwanted flags exactly._

### `detached(...patterns: Pattern[]): RegExp`

Expect the pattern to be a whole string, rather than a part of it.

```ts
detached("a", /b/);
// /^ab$/
```

### `eitherOf(...patterns: Pattern[]): RegExp`

Expect appearance of one of the given patterns.

```ts
eitherOf("abc", "def");
// /(?:abc|def)/
```

```ts
eitherOf("a", /b/);
// /(?:a|b)/
```

_Notice that in the second example a character set is a more optimal solution, so in the case of single characters prefer using regex literal `[ab]` if possible._

***

### `enclosedInCurlyBraces(...patterns: Pattern[]): RegExp`

_Also available as `enclosedIn.curlyBraces`._

Enclose pattern(s) in `{}` curly braces.

```ts
enclosedInCurlyBraces("a", /b/);
// /\{ab\}/
```

```ts
import { enclosedIn } from "re-scaled";

enclosedIn.curlyBraces(/a/g, /b/s);
// /\{ab\}/gs
```

### `enclosedInParentheses(...patterns: Pattern[]): RegExp`

_Also available as `enclosedIn.parentheses`._

Enclose pattern(s) in `()` round brackets.

```ts
enclosedInParentheses("a", /b/);
// /\(ab\)/
```

```ts
import { enclosedIn } from "re-scaled";

enclosedIn.parentheses(/a/g, /b/s);
// /\(ab\)/gs
```

### `enclosedInSquareBrackets(...patterns: Pattern[]): RegExp`

_Also available as `enclosedIn.squareBrackets`._

Enclose pattern(s) in `[]` square brackets.

```ts
enclosedInSquareBrackets("a", /b/);
// /\[ab\]/
```

```ts
import { enclosedIn } from "re-scaled";

enclosedIn.squareBrackets(/a/g, /b/s);
// /\[ab\]/gs
```

***

### `grouped(...patterns: Pattern[]): RegExp`

Group several input patterns into a non-capturing group.

```ts
grouped("a", /b/);
// /(?:ab)/
```

### `oneOrMore(...patterns: Pattern[]): RegExp`

Expect at least one appearance of the given pattern.

```ts
oneOrMore("a", /b/);
// /(?:ab)+/
```

### `optional(...patterns: Pattern[]): RegExp`

Make pattern optional.

```ts
optional("a", /b/);
// /(?:ab)?/
```

***

### `repeatedAtLeast(count: number)(...patterns: Pattern[]): RegExp`

_Also available as `repeated.atLeast`._

Repeat pattern at least `count` amount of times. The value of `count` must be a non-negative natural number (`0`, `1`, `2` etc.). This is being internally checked by the package [`@valuer/main`], so any invalid value will cause an error to be thrown.

```ts
repeatedAtLeast(3)("a", /b/);
// /(?:ab){3,}/
```

```ts
import { repeated } from "re-scaled";

repeated.atLeast(10)(/c/g, /d/s);
// /(?:cd){10,}/gs
```

```ts
repeatedAtLeast(-7)("a", /b/);
// Validation failed: min repeat count should not be a negative number: value <number> -7
```

_Note that in the case of invalid `count`, the error prevents the intermediate function from being created._

### `repeatedBetween(min: number, max: number)(...patterns: Pattern[]): RegExp`

_Also available as `repeated.between`._

Repeat pattern between `min` and `max` amount of times inclusively. The values of both `min` and `max` must be non-negative natural numbers (`0`, `1`, `2` etc.). This is being internally checked by the package [`@valuer/main`], so any invalid value will cause an error to be thrown.

```ts
repeatedBetween(2, 3)("a", /b/);
// /(?:ab){2,3}/
```

```ts
repeatedBetween(3, 2)("c");
// /(?:c){2,3}/
```

_Notice how the reverse range is intelligently taken care of in this example._

```ts
import { repeated } from "re-scaled";

repeated.between(17, 42)(/d/, "e");
// /(?:d){17,42}/
```

```ts
repeatedBetween(-1, 2)(/f/, /g/);
// Validation failed: min repeat count should not be a negative number: value <number> -1
```

```ts
repeatedBetween(1, 2.5)(/f/, /g/);
// Validation failed: max repeat count is not an integer: value <number> 2.5
```

_Note that in the case of invalid `min` and/or `max`, the error prevents the intermediate function from being created._

### `repeatedTwice(...patterns: Pattern[]): RegExp`

_Also available as `repeated.twice`._

Repeat pattern exactly twice.

```ts
repeatedTwice("a", /b/);
// /(?:ab){2}/
```

```ts
import { repeated } from "re-scaled";

repeated.twice(/c/, /d/);
// /(?:cd){2}/
```

### `repeatedThrice(...patterns: Pattern[]): RegExp`

_Also available as `repeated.thrice`._

Repeat pattern exactly three times.

```ts
repeatedThrice("a", /b/);
// /(?:ab){3}/
```

```ts
import { repeated } from "re-scaled";

repeated.thrice(/c/, /d/);
// /(?:cd){3}/
```

### `repeatedTimes(count: number)(...patterns: Pattern[]): RegExp`

_Also available as `repeated.times`._

Repeat pattern exactly `count` amount of times. The value of `count` must be a non-negative natural number (`0`, `1`, `2` etc.). This is being internally checked by the package [`@valuer/main`], so any invalid value will cause an error to be thrown.

```ts
repeatedTimes(42)("a", /b/);
// /(?:ab){42}/
```

```ts
import { repeated } from "re-scaled";

repeated.times(17)(/c/, /d/);
// /(?:cd){17}/
```

```ts
repeatedTimes("five")("e", /f/);
// Validation failed: repeat count is not an integer: value <string> five
```

_Note that in the case of invalid `count`, the error prevents the intermediate function from being created._

***

### `separatedBy(separator: Pattern)(...patterns: Pattern[]): RegExp`

Concatenate several input patterns into a single RegExp, separating them by a given `separator` pattern.

```ts
separatedBy(", ")(1, 2, 3);
// /(?:1, 2, 3)/
```

```ts
separatedBy("|")("hello", "hola");
// /(?:hello|hola)/
```

### `storedAs(name: string)(...patterns: Pattern[]): RegExp`

Concatenate several input patterns into a single RegExp and store the result under a given name.

_This function uses a new ES2018 feature, called [Named Capturing Groups]._

```ts
storedAs("word")("a", "b", "c");
// /(?<word>abc)/
```

  [`@valuer/main`]: https://npmjs.org/package/@valuer/main
  [Named Capturing Groups]: http://google.com/search?q=Named+Capturing+Groups