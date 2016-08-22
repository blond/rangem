'use strict';

var union = require('./union');

/**
 * Returns borders of ranges.
 *
 * @param {{from: number, to: number}} ranges — the source ranges.
 *
 * @returns {{value: number, type: string}}
 */
function getBorders(ranges) {
    var borders = [];

    ranges.forEach(function(range) {
        var leftBorder = { value: range.from, type: 'from' };
        var rightBorder = { value: range.to, type: 'to' };

        borders.push(leftBorder, rightBorder);
    });

    return borders;
}

/**
 * Returns `true` if ranges are equal.
 *
 * @param {{from: number, to: number}} range1 — the range to check.
 * @param {{from: number, to: number}} range2 — the range to check.
 *
 * @returns {Boolean}
 */
function isEqualRange(range1, range2) {
    return range1.from === range2.from && range1.to === range2.to;
}

/**
 * Subtract ranges from range.
 *
 * @example
 * const subtract = require('rangem').subtract;
 *
 * const fromRange = { from: 10, to: 20 };
 * const whatRanges = [{ from: 10, to: 12 }, { from: 15, to: 18 }]
 *
 * subtract(fromRange, whatRanges);
 *
 * // ➜ [{ from: 12, to: 15 }, { from: 18, to: 20 }]
 *
 * @param {{from: number, to: number}} range — the range from which will be deducted.
 * @param {{from: number, to: number}[]} ranges — the ranges which will be deducted.
 *
 * @returns {{from: number, to: number}[]}
 */
module.exports = function subtract(range, ranges) {
    if (ranges.length === 0) {
        return [range];
    }

    var leftBoard = range.from;
    var rightBorder = range.to;

    var unionRanges = union(ranges);

    if (unionRanges.length === 1 && isEqualRange(range, unionRanges[0])) {
        return [];
    }

    var borders = getBorders(unionRanges).filter(function(border) {
        return border.value > leftBoard && border.value < rightBorder;
    });

    if (borders.length === 0) {
        return [range];
    }

    if (borders[0].type === 'from') {
        borders.unshift({ value: leftBoard });
    }

    if (borders[borders.length - 1].type === 'to') {
        borders.push({ value: rightBorder });
    }

    var resRanges = [];

    for (var i = 0; i < borders.length; i+=2) {
        resRanges.push({
            from: borders[i].value,
            to: borders[i+1].value
        });
    }

    return resRanges;
};
