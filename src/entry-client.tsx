// @refresh reload
import { StartClient, mount } from '@solidjs/start/client'
import { theme, setTheme } from '~/components/ThemeChange'

// 全局主题初始化：所有页面水合后执行（含首页等无 ThemeChange 组件的页面）
function initTheme() {
  if (typeof window === 'undefined')
    return
  const themeKey = 'darkTheme'
  const stored = localStorage.getItem(themeKey)
  const apply = (isDark: boolean) => {
    const root = document.querySelector<HTMLElement>('html')
    root?.classList.toggle('dark', isDark)
    root?.classList.toggle('light', !isDark)
    try {
      setTheme(isDark ? 'dark' : 'light')
    }
    catch {
      /* signal 尚未就绪时忽略 */
    }
  }

  if (stored) {
    // 用户之前手动选择过 → 用存储值
    apply(stored === 'true' || stored === 'dark')
  }
  else {
    // 未选择 → 跟随系统
    apply(window.matchMedia('(prefers-color-scheme: dark)').matches)
    // 监听系统变化，自动跟随（用户未手动选择时）
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      // 若用户已手动选择则不再跟随系统
      if (!localStorage.getItem(themeKey))
        apply(e.matches)
    }
    mq.addEventListener('change', onChange)
  }
}

// 先 mount 再初始化（确保 SolidJS signal 可用），同时水合前用原生方式预置 class 防闪烁
if (typeof document !== 'undefined') {
  // 水合前快速设置（同步，防闪烁）
  try {
    const stored = localStorage.getItem('darkTheme')
    const isDark = stored
      ? stored === 'true' || stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
    document.querySelector('html')?.classList.toggle('dark', isDark)
    document.querySelector('html')?.classList.toggle('light', !isDark)
  }
  catch {
    /* ignore */
  }
}

mount(() => <StartClient />, document.getElementById('app')!)

// mount 后执行完整逻辑（含系统变化监听）
setTimeout(() => initTheme(), 0)
