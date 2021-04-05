const express = require('express');
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;

const fibonacci = require('./math-logic/fibonacci-series');

if (cluster.isMaster) {
  console.log(`Total Number of CPUs is ${totalCPUs}`);

  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ID is ${worker.id} and PID is ${worker.process.pid}`);
  });

  cluster.on('exit', (worker) => {
    console.log(
      `Worker ID is ${worker.id} and PID is ${worker.process.pid} is offline`
    );
    console.log("Let's fork new worker!");
    cluster.fork();
  });
} else {
  const app = express();

  app.get('/', (req, res) => {
    console.log(
      `Worker Process ID - ${cluster.worker.process.pid} has accepted the request!`
    );
    let number = fibonacci.calculateFibonacciValue(
      Number.parseInt(req.query.number)
    );
    res.send(`<h1>${number}</h1>`);
  });
  app.listen(3000, () => console.log('Fibonacci App is running in PORT: 3000'));
}
