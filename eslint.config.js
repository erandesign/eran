import antfu from '@antfu/eslint-config'

const config = antfu({
  solid: true,
  typescript: true,
  unocss: true,
  yaml: false,
  vue: false,

  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  formatters: true,
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
})

export default config
