import { For, Show } from 'solid-js'
import { I18n, i18n } from '~/components/i18n'
import SiteTitle from '~/components/SiteTitle'
import SeoMeta from '~/components/SeoMeta'
import DesignCursor from '~/design/DesignCursor'
import DesignHeader from '~/design/DesignHeader'
import DesignFooter from '~/design/DesignFooter'
import DesignReveal from '~/design/DesignReveal'
import useMomentumScroll from '~/design/useMomentumScroll'

/** 关于团队页（新设计风格） */
export default function About() {
  useMomentumScroll()

  return (
    <div class="eran-design">
      <SiteTitle>{i18n.nav_p_2()}</SiteTitle>
      <SeoMeta />

      <DesignCursor />
      <DesignHeader />

      <div id="d-scaleWrap">
        {/* 页面引言 */}
        <section id="d-page-intro">
          <DesignReveal><span class="kicker">ABOUT US</span></DesignReveal>
          <DesignReveal>
            <h1>
              <I18n i18n={i18n.about_title} component="span" />
            </h1>
          </DesignReveal>
        </section>

        {/* 公司介绍 */}
        <section id="d-about-company" style={{ padding: '40px 48px 120px' }}>
          <DesignReveal>
            <div class="d-about-grid" style={{
              display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '60px', 'align-items': 'start',
            }}>
              <div>
                <img
                  src={i18n.about_company_img()}
                  alt="ERAN DESIGN Studio"
                  style={{ width: '100%', height: 'auto', 'object-fit': 'cover', aspect: '4/3' }}
                  loading="lazy"
                />
              </div>
              <div>
                <span class="kicker" style={{ color: 'var(--gold)', 'font-size': '11px', 'letter-spacing': '.14em', 'text-transform': 'uppercase', 'margin-bottom': '26px', display: 'block' }}>
                  ABOUT ERAN
                </span>
                <I18n
                  i18n={i18n.about_company_desc}
                  class="d-about-desc"
                  style={{
                    'font-family': 'var(--f-serif)', 'font-size': 'clamp(18px, 1.8vw, 24px)',
                    'line-height': '1.8', color: 'var(--ink)', 'white-space': 'pre-line',
                  }}
                />
              </div>
            </div>
          </DesignReveal>
        </section>

        {/* 创始人 */}
        <section id="d-about-founder" style={{ padding: '0 48px 120px' }}>
          <DesignReveal>
            <div class="d-about-grid" style={{
              display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '60px', 'align-items': 'start',
            }}>
              <div style={{ order: 2 }}>
                <img
                  src={i18n.about_founder_img()}
                  alt={i18n.about_founder_user()}
                  style={{ width: '100%', height: 'auto', 'object-fit': 'cover', aspect: '4/3' }}
                  loading="lazy"
                />
              </div>
              <div style={{ order: 1 }}>
                <span class="kicker" style={{ color: 'var(--gold)', 'font-size': '11px', 'letter-spacing': '.14em', 'text-transform': 'uppercase', 'margin-bottom': '26px', display: 'block' }}>
                  FOUNDER
                </span>
                <h2 style={{ 'font-family': 'var(--f-serif)', 'font-weight': '400', 'font-size': 'clamp(28px, 3vw, 44px)', 'margin-bottom': '8px' }}>
                  {i18n.about_founder_user()}
                </h2>
                <div style={{ 'font-family': 'var(--f-label)', 'font-size': '11px', 'letter-spacing': '.1em', color: 'var(--grey)', 'text-transform': 'uppercase', 'margin-bottom': '32px' }}>
                  {i18n.about_founder_user_job()}
                </div>
                <I18n
                  i18n={i18n.about_founder_desc}
                  style={{
                    'font-family': 'var(--f-serif)', 'font-size': 'clamp(16px, 1.6vw, 21px)',
                    'line-height': '1.8', color: 'var(--ink)', 'white-space': 'pre-line', opacity: '.92',
                  }}
                />
              </div>
            </div>
          </DesignReveal>
        </section>

        {/* WHAT WE DO 能力列表 */}
        <section id="d-capabilities">
          <div id="capList">
            <For each={i18n.about_wwd_list()}>
              {(c, i) => (
                <DesignReveal>
                  <div class="d-cap-row">
                    <span class="no">{String(i() + 1).padStart(2, '0')}</span>
                    <div>
                      <h4>{typeof c === 'string' ? c : (c as any).title || ''}</h4>
                      <p class="desc">{typeof c === 'string' ? '' : (c as any).desc || ''}</p>
                    </div>
                    <span class="en" />
                  </div>
                </DesignReveal>
              )}
            </For>
          </div>
        </section>

        {/* 联系区块 */}
        <section id="d-contact">
          <DesignReveal><span class="kicker">GET IN TOUCH</span></DesignReveal>
          <DesignReveal>
            <h2>有个项目，<br />想聊聊吗？</h2>
          </DesignReveal>
          <DesignReveal>
            <a class="mail" href="mailto:info@erandesign.cn">info@erandesign.cn</a>
          </DesignReveal>
          <DesignReveal>
            <div class="d-contact-cols">
              <div><b>+86 185 6565 0856</b>PHONE / WECHAT</div>
              <div><b>中国 · 深圳</b>BASED ON</div>
            </div>
          </DesignReveal>
        </section>

        <DesignFooter rev="ABOUT — REV.2026.08" />
      </div>
    </div>
  )
}
