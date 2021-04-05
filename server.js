const express = require('express');

const fibonacci = require('./math-logic/fibonacci-series');

const app = express();

app.get('/', (req, res) => {
  console.log(`Worker ID is ${process.pid}`);
  let number = fibonacci.calculateFibonacciValue(
    Number.parseInt(req.query.number)
  );
  res.send(`<h1>${number}</h1>`);
});
app.listen(3000, () => console.log('Fibonacci App is running in PORT: 3000'));
