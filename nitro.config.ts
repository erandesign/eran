import { defineNitroConfig } from 'nitropack'

// Nitro 独立配置：routeRules 设置静态资源缓存策略
// 注意：Vinxi 构建时若检测到该文件会合并进 Nitro 配置
export default defineNitroConfig({
  routeRules: {
    // 构建产物带哈希，永久缓存（内置规则已有，这里显式声明确保生效）
    '/_build/assets/**': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
    // 图片/视频/字体：7 天缓存
    '/images/**': {
      headers: {
        'Cache-Control': 'public, max-age=604800',
      },
    },
    '/video/**': {
      headers: {
        'Cache-Control': 'public, max-age=604800',
      },
    },
    '/font/**': {
      headers: {
        'Cache-Control': 'public, max-age=604800',
      },
    },
    '/favicon.ico': {
      headers: {
        'Cache-Control': 'public, max-age=604800',
      },
    },
  },
})
