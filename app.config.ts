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
        prerender: {
          routes: ['/'].concat(langs, routes.map(v => langs.map(l => l + v)).flat(1)),
        },
      }
    : undefined,
  experimental: {
    // islands: isBuild, // 理论上开启有更好的性能，但dev时存在很多问题，只建议在build阶段使用
  },
})
