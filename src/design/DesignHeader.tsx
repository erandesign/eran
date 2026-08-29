import { Show } from 'solid-js'
import { A, useLocation, useNavigate, useParams } from '@solidjs/router'
import { availableLanguageTags, i18n, setLanguageTag } from '~/components/i18n'

/**
 * 新设计顶部导航（mix-blend-difference 自动适应明暗背景）
 * - 所有页面统一显示「作品」「联系」两个按钮，位置格式与首页一致
 * - 链接带 lang 前缀（/zh/works、/zh/concat），避免 SPA 跳转丢 lang → 404
 * - 语言切换：zh/en 按钮，切换时保持当前页面路径
 */
export default function DesignHeader(props: {
  active?: 'works' | 'contact'
}) {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const lang = () => params.lang || 'zh'

  // 切换语言：保持当前路径（/works、/concat、/work/1 等），替换 lang 前缀
  const switchLang = (to: 'zh' | 'en') => {
    if (to === lang())
      return
    const path = location.pathname
    // 去掉当前 lang 前缀
    const rest = path.replace(/^\/(zh|en)/, '') || '/'
    setLanguageTag(to)
    navigate(`/${to}${rest === '/' ? '' : rest}`)
  }

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
        {/* 语言切换 */}
        <span class="d-lang">
          <span
            classList={{ active: lang() === 'zh' }}
            onClick={() => switchLang('zh')}
          >中</span>
          <span class="d-lang-sep">/</span>
          <span
            classList={{ active: lang() === 'en' }}
            onClick={() => switchLang('en')}
          >EN</span>
        </span>
      </nav>
    </header>
  )
}
