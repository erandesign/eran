import { A } from '@solidjs/router'
import { i18n } from '~/components/i18n'

/** 新设计顶部导航（mix-blend-difference 自动适应明暗背景） */
export default function DesignHeader(props: {
  active?: 'works' | 'contact'
}) {
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
        <A href="/works" classList={{ active: props.active === 'works' }}>
          {i18n.nav_p_1()}
        </A>
        <A href="/concat" classList={{ active: props.active === 'contact' }}>
          {i18n.nav_p_3().replace('联系我们', '联系')}
        </A>
      </nav>
    </header>
  )
}
