import { Show } from 'solid-js'
import { A } from '@solidjs/router'
import { i18n } from '~/components/i18n'

/**
 * 新设计顶部导航（mix-blend-difference 自动适应明暗背景）
 * - 设计稿：作品页导航只有「联系」，联系页导航只有「作品」
 * - 首页/其他页：显示「作品」「联系」
 */
export default function DesignHeader(props: {
  active?: 'works' | 'contact'
}) {
  const showWorks = () => props.active !== 'works' // 作品页自身不显示「作品」链接
  const showContact = () => props.active !== 'contact' // 联系页自身不显示「联系」链接

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
        <Show when={showWorks()}>
          <A href="/works" classList={{ active: props.active === 'works' }}>
            {i18n.nav_p_1()}
          </A>
        </Show>
        <Show when={showContact()}>
          <A href="/concat" classList={{ active: props.active === 'contact' }}>
            {i18n.nav_p_3().replace('联系我们', '联系')}
          </A>
        </Show>
      </nav>
    </header>
  )
}
