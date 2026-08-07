import type { JSX } from 'solid-js'
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'

const themeKey = 'darkTheme'
// 初始值：仅客户端读取 localStorage，否则 ''
export const [theme, setTheme] = createSignal<string>(
  typeof localStorage !== 'undefined' ? localStorage.getItem(themeKey) || '' : '',
)

/** 用户是否手动点过切换（自动匹配系统时不视为手动选择） */
let userManuallyPicked = false

/** 主题切换 */
export function ThemeChange(props: { class?: string }) {
  const root = () => document.querySelector<HTMLElement>('html')
  function toDark() {
    setTheme('dark')
    root()?.classList.remove('light')
    root()?.classList.add('dark')
  }
  function toLight() {
    setTheme('light')
    root()?.classList.remove('dark')
    root()?.classList.add('light')
  }
  createEffect(() => {
    // 只在用户手动选择时持久化（自动匹配系统时不写入，保持跟随系统）
    if (userManuallyPicked && (theme() === 'dark' || theme() === 'light'))
      localStorage.setItem(themeKey, theme())
  })
  onMount(() => {
    const stored = localStorage.getItem(themeKey)
    // 有存储 → 用户之前手动选过；无存储 → 跟随系统
    if (stored) {
      userManuallyPicked = true
      const isDark = stored === 'true' || stored === 'dark'
      isDark ? toDark() : toLight()
    }
    else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark ? toDark() : toLight()
    }
  })

  // 监听系统主题变化：仅当用户未手动选择时自动跟随
  if (typeof window !== 'undefined') {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      if (!userManuallyPicked)
        (e.matches ? toDark : toLight)()
    }
    mq.addEventListener('change', onChange)
    onCleanup(() => mq.removeEventListener('change', onChange))
  }

  return (
    <div
      class={`col-span2/-1 h-46 w-120 ${props.class}`}
      onClick={() => {
        userManuallyPicked = true
        if (theme() === 'dark')
          toLight()
        else toDark()
      }}
    >
      <img class="s-full" src={theme() === 'dark' ? '/images/switch_moon.svg' : '/images/switchh_sun.svg'} draggable={false} />
    </div>
  )
};

// #region 自动设置主题
/** 自动设置主题 */
export function Thememain(props: JSX.HTMLAttributes<HTMLElement>) {
  // const themeStr = theme() || 'light'
  return (
    <main {...props} class={`  ${props.class}`}>
      {props.children}
    </main>
  )
};
// #endregion
