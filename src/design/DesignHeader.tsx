import { Show } from 'solid-js'
import { A, useParams } from '@solidjs/router'
import { i18n } from '~/components/i18n'

/**
 * 新设计顶部导航（mix-blend-difference 自动适应明暗背景）
 * - 链接带 lang 前缀（/zh/works、/zh/concat），避免 SPA 跳转丢 lang → 404
 * - 设计稿：作品页导航只有「联系」，联系页导航只有「作品」
 */
export default function DesignHeader(props: {
  active?: 'works' | 'contact'
}) {
  const params = useParams()
  const lang = () => params.lang || 'zh'
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
          <A href={`/${lang()}/works`} classList={{ active: props.active === 'works' }}>
            {i18n.nav_p_1()}
          </A>
        </Show>
        <Show when={showContact()}>
          <A href={`/${lang()}/concat`} classList={{ active: props.active === 'contact' }}>
            {i18n.nav_p_3().replace('联系我们', '联系')}
          </A>
        </Show>
      </nav>
    </header>
  )
}
