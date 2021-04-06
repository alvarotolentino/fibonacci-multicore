const express = require('express');

const fabQueue1 = require('./queues/queue1');
const fabQueue2 = require('./queues/queue2');

const app = express();

app.get('/', (request, response) => {
  let num = request.query.number;
  if (num % 2 === 0) {
    fabQueue1(num);
  } else {
    fabQueue2(num);
  }
  response.send(
    '<h3>The request has been received successfully! We will send an email once your calculation is ready!</h3>'
  );
});
app.listen(3000, () => console.log('Fibonacci App is running in PORT: 3000'));
