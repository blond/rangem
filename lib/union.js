'use strict';

/**
 * Unions intersecting ranges.
 *
 * @example
 * const union = require('rangem').union;
 *
 * const ranges = [{ from: 1, to: 5 }, { from: 3, to: 6 }, { from: 10, to: 20 }];
 *
 * union(ranges);
 *
 * // ➜ [{ from: 1, to: 6 }, { from: 10, to: 20 }]
 *
 * @param {{from: number, to: number}[]} ranges — the ranges to union.
 *
 * @returns {{from: number, to: number}[]}
 */
module.exports = function union(ranges) {
    if (!ranges || ranges.length === 0) {
        return [];
    }

    var sortedRanges = ranges.sort(function(range1, range2) {
        return range1.from - range2.from;
    });

    return sortedRanges.map(function (range) { return [range]; })
        .reduce(function (previousRandges, currentRandges) {
            var previousRandge = previousRandges.pop();
            var currentRandge = currentRandges[0];

            if (currentRandge.from <= previousRandge.to) {
                return previousRandges.concat({
                    from: previousRandge.from,
                    to: Math.max(previousRandge.to, currentRandge.to)
                });
            } else {
                return previousRandges.concat(previousRandge, currentRandge);
            }
        });
};
