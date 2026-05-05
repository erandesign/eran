/**
 * ERAN DESIGN - 核心设计配置
 * @since 2024-05-05
 * @version 1.0.0
 */

import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: '#0d0d1a',        // 主背景色
          navy: '#1a1a2e',        // 次级背景
          titanium: '#3a3a4e',    // 容器背景
          silver: '#e8e9eb',      // 主文本色
          silverGray: '#bdc0d6',  // 次级文本
          electricBlue: '#007bff', // CTA 强调色
          deepTeal: '#0d9488',    // 辅助强调色
          glow: 'rgba(0, 123, 255, 0.04)', // 微光
        },
      },
      fontFamily: {
        display: [
          'Inter Tight',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Noto Sans SC',
          'Microsoft YaHei',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        body: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Noto Sans SC',
          'Microsoft YaHei',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      lineHeight: {
        tight: '1.25',
        relaxed: '1.625',
      },
      boxShadow: {
        brand: '0 4px 6px rgba(0, 0, 0, 0.1)',
        brandLG: '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to bottom, #0d0d1a, #05050f)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config