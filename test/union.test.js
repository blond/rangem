'use strict';

var test = require('ava');

var union = require('../lib/union');

test('should return empty range', function(t) {
    var unitedRanges = union();

    t.deepEqual(unitedRanges, []);
});

test('should union empty ranges', function(t) {
    var unitedRanges = union([]);

    t.deepEqual(unitedRanges, []);
});

test('should return range', function(t) {
    var ranges = [
        { from: 10, to: 20 }
    ];

    var unitedRanges = union(ranges);

    t.deepEqual(unitedRanges, ranges);
});

test('should not union not intersect ranges', function(t) {
    var ranges = [
        { from: 10, to: 20 },
        { from: 30, to: 40 }
    ];

    var unitedRanges = union(ranges);

    t.deepEqual(unitedRanges, ranges);
});

test('should union intersect ranges', function(t) {
    var ranges = [
        { from: 10, to: 20 },
        { from: 15, to: 30 }
    ];

    var unitedRanges = union(ranges);

    t.deepEqual(unitedRanges, [{ from: 10, to: 30 }]);
});

test('should union boundary ranges', function(t) {
    var ranges = [
        { from: 10, to: 20 },
        { from: 20, to: 30 }
    ];

    var unitedRanges = union(ranges);

    t.deepEqual(unitedRanges, [{ from: 10, to: 30 }]);
});

test('should not union almost boundary ranges', function(t) {
    var ranges = [
        { from: 10, to: 20 },
        { from: 21, to: 30 }
    ];

    var unitedRanges = union(ranges);

    t.deepEqual(unitedRanges, ranges);
});

test('should union ranges with equal left board', function(t) {
    var ranges = [
        { from: 10, to: 20 },
        { from: 10, to: 15 },
        { from: 10, to: 10 }
    ];

    var unitedRanges = union(ranges);

    t.deepEqual(unitedRanges, [{ from: 10, to: 20 }]);
});

test('should union ranges with equal right board', function(t) {
    var ranges = [
        { from: 10, to: 20 },
        { from: 15, to: 20 },
        { from: 20, to: 20 }
    ];

    var unitedRanges = union(ranges);

    t.deepEqual(unitedRanges, [{ from: 10, to: 20 }]);
});

test('should union ranges with right board in reverse order', function(t) {
    var ranges = [
        { from: 9, to: 20 },
        { from: 10, to: 15 },
        { from: 11, to: 10 }
    ];

    var unitedRanges = union(ranges);

    t.deepEqual(unitedRanges, [{ from: 9, to: 20 }]);
});
