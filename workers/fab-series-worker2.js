const fibonacci = require('../math-logic/fibonacci-series');

process.on('message', number => {
    let value = fibonacci.calculateFibonacciValue(number);
    console.log(`Fibonacci Worker 2 - PID is ${process.pid}`);
    process.send(value);
});