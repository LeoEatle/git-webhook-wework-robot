module.exports = {
  apps : [{
    name: 'wework-robot',
    script: './dist/server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '134.175.32.212',
      ref  : 'origin/master',
      repo : 'git@github.com:LeoEatle/git-webhook-wework-robot.git',
      path : '/root/pm2/wework-robot',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
