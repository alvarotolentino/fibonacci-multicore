class FibonacciSeries {
  constructor() {}
  calculateFibonacciValue(number, memo) {
    memo = memo || {};

    if (memo[number]) return memo[number];
    if (number === 0) return 0;
    if (number === 1) return 1;

    return memo[number] = (
      this.calculateFibonacciValue(number - 1, memo) +
      this.calculateFibonacciValue(number - 2, memo)
    );
  }
}

module.exports = new FibonacciSeries();
