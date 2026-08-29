import { Show, createSignal, onCleanup, onMount } from 'solid-js'
import { A, useLocation, useNavigate, useParams } from '@solidjs/router'
import { i18n, setLanguageTag } from '~/components/i18n'

/**
 * 新设计顶部导航（mix-blend-difference 自动适应明暗背景）
 * - 所有页面统一显示「作品」「联系」两个按钮，位置格式与首页一致
 * - 链接带 lang 前缀（/zh/works、/zh/concat），避免 SPA 跳转丢 lang → 404
 * - 语言切换：点击「中/EN」展开下拉菜单，选择语言后整站切换（保持当前页面路径）
 */
export default function DesignHeader(props: {
  active?: 'works' | 'contact'
}) {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const lang = () => params.lang || 'zh'

  // 下拉菜单开关
  const [open, setOpen] = createSignal(false)

  // 点击外部关闭
  let rootRef: HTMLElement | undefined
  onMount(() => {
    const onDocClick = (e: MouseEvent) => {
      if (rootRef && !rootRef.contains(e.target as Node))
        setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    onCleanup(() => document.removeEventListener('click', onDocClick))
  })

  // 切换语言：保持当前路径（/works、/concat、/work/1 等），替换 lang 前缀
  const switchLang = (to: 'zh' | 'en') => {
    setOpen(false)
    if (to === lang())
      return
    const path = location.pathname
    // 去掉当前 lang 前缀
    const rest = path.replace(/^\/(zh|en)/, '') || '/'
    setLanguageTag(to)
    navigate(`/${to}${rest === '/' ? '' : rest}`)
  }

  const currentLabel = () => lang() === 'zh' ? '中文' : 'EN'

  return (
    <header class="d-header">
      <A href="/" class="d-logo">
        <img
          src="/images/logo_tab.svg"
          alt="ERAN DESIGN"
          style={{ height: '14px', width: 'auto', display: 'block' }}
        />
      </A>
      <nav class="d-nav">
        <A href={`/${lang()}/works`} classList={{ active: props.active === 'works' }}>
          {i18n.nav_p_1()}
        </A>
        <A href={`/${lang()}/concat`} classList={{ active: props.active === 'contact' }}>
          {i18n.nav_p_3().replace('联系我们', '联系')}
        </A>
        {/* 语言切换：下拉菜单 */}
        <span
          ref={rootRef}
          class={`d-lang${open() ? ' open' : ''}`}
          onClick={() => setOpen(!open())}
        >
          <span class="d-lang-current">{currentLabel()}</span>
          <span class="d-lang-arrow">▾</span>
          <span class="d-lang-menu">
            <span
              classList={{ active: lang() === 'zh' }}
              onClick={(e) => { e.stopPropagation(); switchLang('zh') }}
            >中文</span>
            <span
              classList={{ active: lang() === 'en' }}
              onClick={(e) => { e.stopPropagation(); switchLang('en') }}
            >EN</span>
          </span>
        </span>
      </nav>
    </header>
  )
}
