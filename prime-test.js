

let chai = require('chai');

const assert = chai.assert;

describe('Test for prime numbers not between 1 and 100, () => {
  it('should return invalid number for number less than 1', () => {
    assert.equal('invalid number', lib.generatePrime(-1))
  });
  it('should return invalid number for number greater than 100', () => {
    assert.equal('invalid number', lib.generatePrime(101))
  });
});

describe('Test for invalid inputs, () => {
    it('should return number expected for a string', () => {
      assert.equal('number expected', lib.generatePrime('Andela'))
    });
    it('should return number expected for an array', () => {
      assert.equal('number expected', lib.generatePrime(['bola']))
    });
  });

describe('Test for valid inputs, () => {
    it('should return an empty array for input of 1', () => {
      assert.equal([], lib.generatePrime(1))
    });
    it('should return [2] for input of 2', () => {
      assert.equal([2], lib.generatePrime(2))
    });
    it('should return an empty array for input of 1', () => {
        assert.equal([], lib.generatePrime(1))
      });
    it('should return [2,3,5] for input of 5', () => {
        assert.equal([2,3,5], lib.generatePrime(5))
      });
  });
  