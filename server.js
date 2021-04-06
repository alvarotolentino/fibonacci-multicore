const express = require('express');

const fabQueue1 = require('./queues/queue1');
const fabQueue2 = require('./queues/queue2');

const fibonacci = require('./math-logic/fibonacci-series');

const app = express();

app.get('/', (req, res) => {
  let number = fibonacci.calculateFibonacciValue(
    Number.parseInt(req.query.number)
  );
  res.send(`<h1>${number}</h1>`);
});
app.listen(3000, () => console.log('Fibonacci App is running in PORT: 3000'));
