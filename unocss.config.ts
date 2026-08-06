import WmlPreset from '@thinke/unocss-wml-preset'
import type { Variant, VariantHandlerContext } from 'unocss'
import { defineConfig, escapeRegExp, presetAttributify, presetUno, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    WmlPreset({
      autoRem: {
        designWidth: 1920,
        minFontSize: 1,
        maxFontSize: 50,
        pcCompatible: false,
      },
    }) as any,
  ],
  transformers: [transformerVariantGroup()],
  shortcuts: [
    {
      'e-grid': 'gap-x-[calc(30*var(--rem))] grid-cols-14',
    },
  ],
  theme: {

  },
  safelist: ['font-mb', 'font-ml', 'font-mm', 'font-mr'],
  rules: [
    ['font-ml', { 'font-family': 'Ml' }],
    ['font-mm', { 'font-family': 'Mm' }],
    ['font-mb', { 'font-family': 'Mb' }],
    ['font-mr', { 'font-family': 'Mr' }],
  ],
  variants: ['zh', 'en'].map((_lang) => {
    const lang = `lang-${_lang}`
    return variantMatcher(lang, input => ({ prefix: `.${lang} $$ ${input.prefix}` }))
  }),
})

function variantMatcher(name: string, handler: (input: VariantHandlerContext) => Record<string, any>): Variant {
  let re: RegExp
  return {
    name,
    match(input, ctx) {
      if (!re)
        re = new RegExp(`^${escapeRegExp(name)}(?:${ctx.generator.config.separators.join('|')})`)

      const match = input.match(re)
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          handle: (input, next) =>
            next({
              ...input,
              ...handler(input),
            }),
        }
      }
    },
    autocomplete: `${name}:`,
  }
}
