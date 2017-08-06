var triples = require('./index.js');
var assert = require('assert');

describe('.euclid(m, n)', function () {
  it('uses Euclid\'s formula to generate a triple for given m and n', function () {
    assert.deepEqual(triples.euclid(2, 1), [3, 4, 5]);
    assert.deepEqual(triples.euclid(3, 2), [5, 12, 13]);
  });

  it('checks if the input m & n are below 1', function () {
    assert.throws(triples.euclid.bind(null, 0, 1));
  });

  it('checks if the input m & n are equal', function () {
    assert.throws(triples.euclid.bind(null, 5, 5));
  });

  it('returns a numerically sorted triple', function () {
    assert.deepEqual(triples.euclid(1, 4), [ 8, 15, 17 ]);
    assert.deepEqual(triples.euclid(4, 1), [ 8, 15, 17 ]);
  });
});


describe('.upToM(m)', function () {
  it('returns an array of triples up to m', function () {
    var expected = [
      [ 3, 4, 5 ],
      [ 6, 8, 10 ],
      [ 5, 12, 13 ],
      [ 8, 15, 17 ],
      [ 12, 16, 20 ],
      [ 7, 24, 25 ]
    ];
    assert.deepEqual(triples.upToM(4), expected);
  });
});

describe('.upToSum(sum)', function () {
  it('returns an array of triples for `a + b + c <= sum`', function () {
    var expected = [
      [ 3, 4, 5 ],
      [ 6, 8, 10 ],
      [ 5, 12, 13 ],
    ];
    assert.deepEqual(triples.upToSum(35), expected);
  });
});

describe('.isTriple(triple)', function () {
  it('returns true for valid triples', function () {
    assert(triples.isTriple([3, 4, 5]) === true);
    assert(triples.isTriple([5, 12, 13]) === true);
  });

  it('returns false for non-arrays', function () {
    assert(triples.isTriple('5, 12, 13') === false);
  });

  it('returns false for too few values', function () {
    assert(triples.isTriple([5, 13]) === false);
  });

  it('returns false for too many values', function () {
    assert(triples.isTriple([5, 12, 13, 15]) === false);
  });

  it('returns false for non-integer values', function () {
    assert(triples.isTriple([1.5, 2, 2.5]) === false);
  });

  it('returns false for values < 1', function () {
    assert(triples.isTriple([-5, 12, 13]) === false);
    assert(triples.isTriple([0, 7, 7]) === false);
  });

  it('returns false for values that cannot make a right angle', function () {
    assert(triples.isTriple([5, 12, 15]) === false);
  });
});

describe('.isPrimitive(triple)', function () {
  it('ensures the input is a valid triple first', function () {
    assert.throws(triples.isPrimitive.bind(null, []));
  });

  it('returns true when the input is primitive', function () {
    assert(triples.isPrimitive([3, 4, 5]) === true);
  });

  it('returns false when the input is not primitive', function () {
    assert(triples.isPrimitive([6, 8, 10]) === false);
  });
});