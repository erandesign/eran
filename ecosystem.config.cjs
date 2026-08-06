// pm2 配置文件
const fs = require('node:fs')
const path = require('node:path')

// 读取 /var/www/eran/.env（gitignore 已忽略，密钥不提交到仓库）
function loadEnv(filePath) {
  const env = {}
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    content.split('\n').forEach((line) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#'))
        return
      const idx = trimmed.indexOf('=')
      if (idx === -1)
        return
      env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim()
    })
  }
  catch {
    // .env 不存在时静默使用默认值
  }
  return env
}

const fileEnv = loadEnv(path.join(__dirname, '.env'))

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
        NODE_ENV: 'production',
        ADMIN_PASSWORD: fileEnv.ADMIN_PASSWORD || 'ADMIN_PASSWORD_REPLACED',
        SESSION_SECRET: fileEnv.SESSION_SECRET || 'SESSION_SECRET_REPLACED',
      },
    },
  ],
}
