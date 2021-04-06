module.exports = {
  apps: [
    {
      name: 'Fibonacci App',
      script: 'server.js',
      instances: 2,
      autorestart: true,
      exec_mode: 'cluster',
      watch: true,
      max_memory_restart: '1G',
    },
    {
      name: 'Worker1',
      script: 'workers/worker1.js',
      instances: 1,
    },
    {
      name: 'Worker2',
      script: 'workers/worker2.js',
      instances: 1,
    },
  ],
};
