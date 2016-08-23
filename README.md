rangem
======

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]

[npm]:          https://www.npmjs.org/package/rangem
[npm-img]:      https://img.shields.io/npm/v/rangem.svg

[travis]:       https://travis-ci.org/blond/rangem
[test-img]:     https://img.shields.io/travis/blond/rangem.svg?label=tests

[coveralls]:    https://coveralls.io/r/blond/rangem
[coverage-img]: https://img.shields.io/coveralls/blond/rangem.svg


The tool to range manipulation.

Install
-------

```shell
$ npm install --save rangem
```

Usage
-----

```js
const rangem = require('rangem');

const ranges = rangem.union([{ from: 1, to: 5 }, { from: 5, to: 10 }]);

// ➜ [{ from: 1, to: 10 }]

const range = ranges.pop(); // { from: 1, to: 3 }

rangem.subtract(range, [{ from: 5, to: 7 }]);

// ➜ [{ from: 1, to: 5 }, { from: 7, to: 10 }]
```

API
---

* [union(ranges)](#unionranges)
* [subtract(range, ranges)](#subtractrange-ranges)

### union(ranges)

Unions intersecting ranges.

```js
const union = require('rangem').union;

const ranges = [{ from: 1, to: 5 }, { from: 3, to: 6 }, { from: 10, to: 20 }];

union(ranges);

// ➜ [{ from: 1, to: 6 }, { from: 10, to: 20 }]
```

#### ranges

Type: `{from: number, to: number}[]`
Default: `[]`

The ranges to union.

### subtract(range, ranges)

Subtract ranges from range.

```js
const subtract = require('rangem').subtract;

const fromRange = { from: 10, to: 20 };
const whatRanges = [{ from: 10, to: 12 }, { from: 15, to: 18 }]

subtract(fromRange, whatRanges);

// ➜ [{ from: 12, to: 15 }, { from: 18, to: 20 }]
```

### range

Type: `{from: number, to: number}`

The range from which will be deducted.

#### ranges

Type: `{from: number, to: number}[]`
Default: `[]`

The ranges which will be deducted.

License
-------

MIT © [Andrew Abramov](https://github.com/blond)
