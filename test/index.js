exports.euclid = function (m, n) {
  if (m < 1 || n < 1) {
    throw new TypeError('m and n must not be less than 1');
  }
  if (m === n) {
    throw new TypeError('m must not equal n');
  }
  var a = Math.abs(m * m - n * n);
  var b = 2 * m * n;
  var c = m * m + n * n;
  return [a, b, c].sort(function (a, b) {return a - b; });
};

exports.upToM = function (m) {
  var _ = require('lodash');
  return _.range(1, m + 1).reduce(function (triples, mTemp) {
    return _.range(1, mTemp).reduce(function (innerTriples, n) {
      return innerTriples.concat([exports.euclid(mTemp, n)]);
    }, triples);
  }, []);
};

exports.upToSum = function (sum) {
  return exports.upToM(Math.ceil(Math.sqrt(sum) / 2));
};

exports.isTriple = function (triple) {
  function isPositiveIntegerGte1(value) {
    return (Math.abs(Math.floor(value)) === value) && value >= 1;
  }

  return Array.isArray(triple)
    && triple.length === 3
    && triple.every(isPositiveIntegerGte1)
    && Math.pow(triple[0], 2) + Math.pow(triple[1], 2) === Math.pow(triple[2], 2);
};

exports.isPrimitive = function (triple) {
  if (!exports.isTriple(triple)) {
    throw new TypeError('non-triples cannot be primitive');
  }
  var isCoprime = require('is-coprime');
  var a = triple[0];
  var b = triple[1];
  var c = triple[2];
  return isCoprime(a, b) && isCoprime(a, c) && isCoprime(b, c);
};