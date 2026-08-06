import { theme } from './ThemeChange'

export interface Footer2topProps {
  scroller: HTMLElement | string
}
/** 底部返回顶部 */
export default function Footer2top(props: Footer2topProps) {
  return (
    <div
      class="h-264 f-c/c"
      light="bg-white"
      dark="bg-#1E1E1E"
      style={{ cursor: theme() === 'dark' ? `url("/images/cursor_top_white.svg"),auto` : `url("/images/cursor_top.svg"),auto` }}
      onClick={() => {
        if (props.scroller instanceof HTMLElement)
          props.scroller?.scrollTo({ top: 0, behavior: 'smooth' })
        else
          document.querySelector(props.scroller)?.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      <div class="f-c/c">
        {/* logo */}
        <img class="h-15" dark="hidden" src="/images/logo_tab_dark.svg" />
        <img class="h-15" light="hidden" src="/images/logo_tab.svg" />
        {/* top icon */}
        {/* <img class="invisible s-46" light="visible" src="/images/cursor_top.svg" />
        <img class="invisible s-46" dark="visible" src="/images/cursor_top_white.svg" /> */}
      </div>
    </div>
  )
}
