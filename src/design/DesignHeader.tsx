import { A, useParams } from '@solidjs/router'
import { i18n } from '~/components/i18n'

/**
 * 新设计顶部导航（mix-blend-difference 自动适应明暗背景）
 * - 所有页面统一显示「作品」「联系」两个按钮，位置格式与首页一致
 * - 链接带 lang 前缀（/zh/works、/zh/concat），避免 SPA 跳转丢 lang → 404
 */
export default function DesignHeader(props: {
  active?: 'works' | 'contact'
}) {
  const params = useParams()
  const lang = () => params.lang || 'zh'

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
      </nav>
    </header>
  )
}
