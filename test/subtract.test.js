'use strict';

var test = require('ava');

var subtract = require('../lib/subtract');

test('should keep range', function(t) {
    var fromRange = { from: 1, to: 2 };
    var whatRanges = [];

    var ranges = subtract(fromRange, whatRanges);

    t.deepEqual(ranges, [fromRange]);
});

test('should subtract himself', function(t) {
    var fromRange = { from: 1, to: 2 };
    var whatRanges = [
        { from: 1, to: 2 }
    ];

    var ranges = subtract(fromRange, whatRanges);

    t.deepEqual(ranges, []);
});

test('should subtract range in left border', function(t) {
    var fromRange = { from: 1, to: 10 };
    var whatRanges = [
        { from: 1, to: 2 }
    ];

    var ranges = subtract(fromRange, whatRanges);

    t.deepEqual(ranges, [
        { from: 2, to: 10 }
    ]);
});

test('should subtract range in right border', function(t) {
    var fromRange = { from: 1, to: 10 };
    var whatRanges = [
        { from: 9, to: 10 }
    ];

    var ranges = subtract(fromRange, whatRanges);

    t.deepEqual(ranges, [
        { from: 1, to: 9 }
    ]);
});

test('should subtract range in inside', function(t) {
    var fromRange = { from: 1, to: 10 };
    var whatRanges = [
        { from: 2, to: 3 },
        { from: 5, to: 6 }
    ];

    var ranges = subtract(fromRange, whatRanges);

    t.deepEqual(ranges, [
        { from: 1, to: 2 },
        { from: 3, to: 5 },
        { from: 6, to: 10 }
    ]);
});

test('should subtract intersection ranges in inside', function(t) {
    var fromRange = { from: 1, to: 10 };
    var whatRanges = [
        { from: 2, to: 4 },
        { from: 3, to: 5 }
    ];

    var ranges = subtract(fromRange, whatRanges);

    t.deepEqual(ranges, [
        { from: 1, to: 2 },
        { from: 5, to: 10 }
    ]);
});

test('should subtract intersection ranges in left border', function(t) {
    var fromRange = { from: 1, to: 10 };
    var whatRanges = [
        { from: -5, to: -1 },
        { from: -2, to: 5 }
    ];

    var ranges = subtract(fromRange, whatRanges);

    t.deepEqual(ranges, [
        { from: 5, to: 10 }
    ]);
});

test('should subtract intersection ranges in right border', function(t) {
    var fromRange = { from: 1, to: 10 };
    var whatRanges = [
        { from: 5, to: 9 },
        { from: 8, to: 15 }
    ];

    var ranges = subtract(fromRange, whatRanges);

    t.deepEqual(ranges, [
        { from: 1, to: 5 }
    ]);
});

test('should not subtract abroad left board', function(t) {
    var fromRange = { from: 10, to: 20 };
    var whatRanges = [
        { from: 1, to: 5 }
    ];

    var ranges = subtract(fromRange, whatRanges);

    t.deepEqual(ranges, [{ from: 10, to: 20 }]);
});

test('should not subtract abroad right board', function(t) {
    var fromRange = { from: 10, to: 20 };
    var whatRanges = [
        { from: 25, to: 30 }
    ];

    var ranges = subtract(fromRange, whatRanges);

    t.deepEqual(ranges, [{ from: 10, to: 20 }]);
});
