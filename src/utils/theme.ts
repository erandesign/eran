import { createSignal, onMount } from 'solid-js'
import { isServer } from 'solid-js/web'

export const [darkTheme, setDarkTheme] = createSignal(false)

/** 检测当前黑暗主题，并设置 */
export function autoDarkTheme() {
  if (isServer)
    return

  onMount(() => {
    const darkTheme = localStorage.getItem('darkTheme')
    let theme = darkTheme === 'true'
    if (darkTheme == null)
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches

    setDarkTheme(theme)
  })
}
