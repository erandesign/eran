import { defineConfig } from '@solidjs/start/config'
// import pkg from '@vinxi/plugin-mdx';
import Unocss from 'unocss/vite'

// eslint-disable-next-line node/prefer-global/process
const isBuild = process.env.npm_lifecycle_event?.includes('build') // 不稳定的判断

const langs = ['/zh', '/en']
const routes = ['/about']

// const { default: mdx } = pkg;
export default defineConfig({
  extensions: ['mdx', 'md'],
  vite: {
    plugins: [
      // mdx.withImports({})({
      //   jsx: true,
      //   jsxImportSource: 'solid-js',
      //   providerImportSource: 'solid-mdx',
      // }),
      Unocss(),
    ],
  },
  server: isBuild
    ? {
        // 预渲染在 GitHub Actions runner（内存充足）执行，服务器本地 967MB 会挂起
        prerender: {
          routes: ['/'].concat(langs, routes.map(v => langs.map(l => l + v)).flat(1)),
        },
        // 静态资源缓存策略（透传给 Nitro routeRules）
        routeRules: {
          // 构建产物带哈希，永久缓存（内置已有，显式声明）
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
          // 页面 HTML：60s 短缓存
          '/zh/**': {
            headers: {
              'Cache-Control': 'public, max-age=60',
            },
          },
          '/en/**': {
            headers: {
              'Cache-Control': 'public, max-age=60',
            },
          },
        },
      }
    : undefined,
  experimental: {
    // islands: isBuild, // 理论上开启有更好的性能，但dev时存在很多问题，只建议在build阶段使用
  },
})
