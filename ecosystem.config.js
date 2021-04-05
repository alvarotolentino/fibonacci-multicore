module.exports = {
  apps : [{
    name: 'Fibonacci App',
    script : 'server.js',
    instances: "MAX",
    autorestart: true,
    watch: true,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
