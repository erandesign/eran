import type { JSXElement } from 'solid-js'
import { For, createMemo, createSignal } from 'solid-js'
import { useElementBounding } from 'solidjs-use'
import Link from '../Link'
import LangChange from './langChange'
import cm from './nav.module.less'
import { i18n } from '~/components/i18n'

export interface NavProps {
  sticky?: boolean
  class?: string
  themeEle?: JSXElement
  oClass?: string
  stickyClass?: string
  theme?: string
}
/** 导航栏 */
export default function Nav(props: NavProps) {
  const [target, setTarget] = createSignal<HTMLElement>()
  const { top } = useElementBounding(target)

  const isSticky = createMemo(() => top() <= -2) // 判断是否固定
  const dark = () => props.theme === 'dark'
  return (
    <div class={`${props.oClass} col-span-full h-48 w-full`} ref={setTarget}>
      <div
        class={`z-199 grid-c/st col-span-full grid-cols-[auto_1fr_auto] w-full  h-48 ${props.class}`}
        classList={{
          'fixed top-0 left-0 backdrop-blur-4 bg-white/80': isSticky(),
          // 'fixed top-0': !(props.sticky && !isVisible()),
          [props.stickyClass || '-']: isSticky(),
        }}
        id="cover-nav-main"
      >
        {/* logo */}
        <Link href="/" class="mr-170 h-max" id="cover-logo-x">
          <img class="h-11.25" src={dark() ? (isSticky() ? '/images/logo_tab_dark.svg' : '/images/logo_tab.svg') : '/images/logo_tab_dark.svg'} />
        </Link>
        {/* nav */}
        <div class="f-c/e gap-120 px-120" id="cover-nav">
          <For
            each={[
              { text: i18n.nav_p_1(), href: '/works' },
              { text: i18n.nav_p_2(), href: '/about' },
              // { text: i18n.nav_p_3(), href: '/concat' },
            ]}
          >
            {item => (
              <Link href={item.href} class={`h-full f-c/c decoration-none ${cm.navItem} `} style={{ '--bg': dark() ? (isSticky() ? '#000' : '#fff') : '#000' }}>
                <span
                  class="[text-align-last:justify] relative block min-w-50 text-justify text-12 tracking-2"
                  classList={{
                    'text-black': !dark(),
                    'text-white': dark() && !isSticky(),
                    'text-black 2': dark() && isSticky(),
                  }}
                >
                  {item.text}
                </span>
              </Link>
            )}
          </For>
        </div>
        {/* concat & lang */}
        <div class="f-c/s gap-12">
          {props.themeEle}
          <Link href="/concat" class="decoration-none">
            <div
              class="h-34 f-c/c b-1 rd-full b-solid px-20 text-12 tracking-.24em transition-colors-300 btn"
              classList={{
                'b-white text-white hover:(text-black bg-white)': dark() && !isSticky(),
                'b-black text-black hover:(text-white bg-black)': dark() && isSticky(),
                'b-black text-black hover:(bg-black text-white)': !dark(),
              }}
            >
              {i18n.nav_btn()}
            </div>
          </Link>

          <LangChange class={`ml-20 h-full w-100 ${dark() ? (isSticky() ? 'text-black!' : 'text-white!') : 'text-black!'}`} />
        </div>
      </div>
    </div>
  )
}
