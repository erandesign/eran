// pm2 配置文件
module.exports = {
  apps: [
    {
      name: 'ERAN官网',
      cwd: '/var/www/eran',
      script: '.output/server/index.mjs',
      max_memory_restart: '500M',
      env: {
        PORT: 3000,
        HOST: '0.0.0.0',
      },
    },
  ],
}