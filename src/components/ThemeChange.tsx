import type { JSX } from 'solid-js'
import { createEffect, createSignal, onMount } from 'solid-js'

const themeKey = 'darkTheme'
export const [theme, setTheme] = createSignal<string>(typeof localStorage !== 'undefined' ? localStorage.getItem(themeKey)! : '')

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
    localStorage.setItem(themeKey, String(theme()))
  })
  onMount(() => {
    const darkTheme = theme()
    let isDark = darkTheme === 'true' || darkTheme === 'dark'
    if (theme() === '')
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    isDark ? toDark() : toLight()
  })

  return (
    <div
      class={`col-span2/-1 h-46 w-120 ${props.class}`}
      onClick={() => {
        if (theme() === 'dark')
          toLight()
        else toDark()
      }}
    >
      <img class="s-full" src={theme() === 'dark' ? '/images/switch_moon.svg' : '/images/switchh_sun.svg'} draggable={false} />
    </div>
  )
  // return (
  //   <div class="grid-c/c col-span2/-1 grid-cols-2 h-46 w-120 rd-full bg-#F2F2F2 px-5" dark="bg-#111">
  //     <div class="h-36 w-61 f-c/c cursor-pointer rd-full" light="bg-white" onClick={toLight}>🌞</div>
  //     <div class="h-36 w-61 f-c/c cursor-pointer rd-full" dark="bg-white" onClick={toDark}>🌛</div>
  //   </div>
  // )
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
