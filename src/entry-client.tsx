// @refresh reload
import { StartClient, mount } from '@solidjs/start/client'
import { setTheme } from '~/components/ThemeChange'

/**
 * 全局主题初始化（原生 DOM 操作，不依赖 SolidJS 水合时序）：
 * - 有 localStorage 存储 → 用存储值（用户手动选择）
 * - 无存储 → 跟随系统 prefers-color-scheme，并监听系统变化自动跟随
 */
function applyTheme(isDark: boolean) {
  const root = document.querySelector<HTMLElement>('html')
  if (!root)
    return
  root.classList.toggle('dark', isDark)
  root.classList.toggle('light', !isDark)
  try {
    setTheme(isDark ? 'dark' : 'light')
  }
  catch {
    /* signal 未就绪忽略 */
  }
}

function initTheme() {
  if (typeof document === 'undefined')
    return
  const themeKey = 'darkTheme'
  const stored = localStorage.getItem(themeKey)
  if (stored) {
    applyTheme(stored === 'true' || stored === 'dark')
    return
  }
  // 跟随系统
  applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches)
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  const onChange = (e: MediaQueryListEvent) => {
    // 用户手动选择后不再跟随
    if (!localStorage.getItem(themeKey))
      applyTheme(e.matches)
  }
  mq.addEventListener('change', onChange)
}

// 立即执行（脚本在 body 末尾，DOM 已就绪）
initTheme()

mount(() => <StartClient />, document.getElementById('app')!)
