# Fibonacci API

This is an express app which implements the fibonacci algorithm. The endpoint exposed is:

```
GET http://localhost:3000?number={value}
```

There are different architecture aproaches. Each branch is a implementation.

In order to do a load test I used the __loadtest__ package. It was installed as a global package.

```
npm install -g loadtest
```

The following load test command executes: 100 concurrent requests of 1000 requests each one at 200 request per second

```
loadtest -n 1000 -c 100 --rps 200 http://localhost:3000?number=20
```

Below the different branch implementations:

## master
The basic implementation for the fibonacci algorithm.

To run the app use the following command:
```
npm install
npm start
```


## cluster_version
This is a basic cluster implementation using the cluster package from Nodejs and using the total of CPU available in the host.

To run the app use the following command:
```
npm install
npm start
```

## master-child-process
This is master-child process implementation. Use two workers in order to process the requests.

To run the app use the following command:
```
npm install
npm start
```

## pm2_version
This use PM2 to manage all process.

To install PM2 as global package, run the following command:

```
npm install -g pm2
```

The ecosystem config file show the configuration for all the processed that should be created by PM2.

To run the app use the folloing command:

```
pm2 start ecosystem.config.js
```

To show the monitor with all process created run this command:

```
pm2 monit
```

To stop all the process
```
pm2 stop all
```
and to delete all ones
```
pm2 delete all
```

## message-queue_version
This implementation use PM2 in order to manage all the process and RabbitMQ in order to enqueue the request.

The schema of the aproach is below
```
              ┌────────PM2 ──────┐
         ┌────┴───┐           ┌──┴────┐
clients->|process1├─>RabitMQ->│worker1|
         |process2|           |worker2|
         └────────┘           └───────┘
```

It requires run RabbitMQ in local machine, you can run RabbitMQ in a container.
```
docker run -d --hostname mqserver --name rabbitmq-server -p 15672:15672 -p  5672:5672 rabbitmq:3-management
```

To run the app use the folloing command:

```
pm2 start ecosystem.config.js
```

To show the monitor with all process created run this command:

```
pm2 monit
```

To stop all the process
```
pm2 stop all
```
and to delete all ones
```
pm2 delete all
```

## fast-fibonacci-pm2_version
This is a memoization implementation for fibonacci algorithm using PM2 to manage all the process.

Just to mention the big O complexity of this implementation is O(2N)

```
pm2 start ecosystem.config.js
```

To show the monitor with all process created run this command:

```
pm2 monit
```

To stop all the process
```
pm2 stop all
```
and to delete all ones
```
pm2 delete all
```