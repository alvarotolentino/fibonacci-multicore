const express = require('express');
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master Process ID is: ${process.pid}`);

  const worker1 = require('child_process').fork('./workers/fab-series-worker1');
  const worker2 = require('child_process').fork('./workers/fab-series-worker2');

  console.log(`Child Process ID is: ${worker1.pid}`);
  console.log(`Child Process ID is: ${worker2.pid}`);

  worker1.on('message', (number) => {
    console.log(`Fab Number from worker 1 is: ${number}`);
  });

  worker2.on('message', (number) => {
    console.log(`Fab Number from worker 2 is: ${number}`);
  });

  cluster.on('online', (worker) => {
    console.log(`Message received from ${worker.process.pid}`);
    worker.on('message', (number) => {
      if (number % 2 === 0) {
        worker1.send(number);
      } else {
        worker2.send(number);
      }
    });
  });

  for (let i = 0; i < totalCPUs - 2; i++) {
    let worker = cluster.fork();
    console.log(`Worker started on PID ${worker.process.pid}`);
  }
  console.log(`Total Number of CPU count is ${totalCPUs}`);
} else {
  const app = express();

  app.get('/', (req, res) => {
    process.send(req.query.number);
    console.log(`Process Id ${process.pid} received the request!`);
    res.end('<h3>The result has been received successfully and the result will send you when we finish to process it.</h3>');
  });
  app.listen(3000, () => console.log('Fibonacci App is running in PORT: 3000'));
}
