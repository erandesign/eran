import { For, Show, Suspense, createMemo, createResource } from 'solid-js'
import { useParams } from '@solidjs/router'
import { A } from '@solidjs/router'
import { getAllWorks } from '~/serverAction/works'
import { cacheWorks } from '~/components/workCache'
import { i18n } from '~/components/i18n'
import SiteTitle from '~/components/SiteTitle'
import SeoMeta from '~/components/SeoMeta'
import { OrganizationJsonLd } from '~/components/JsonLd'
import DesignCursor from '~/design/DesignCursor'
import DesignHeader from '~/design/DesignHeader'
import DesignFooter from '~/design/DesignFooter'
import DesignReveal from '~/design/DesignReveal'
import DesignWorkRow from '~/design/DesignWorkRow'
import Hero, { CAPS, CLIENTS } from '~/design/DesignHomeParts'
import useMomentumScroll from '~/design/useMomentumScroll'

/** 首页（新设计 REFINED） */
export default function Home() {
  const param = useParams()
  // 一次性加载全部作品（唯一数据源，SSR 安全）
  const [allData] = createResource(() => ({ lang: param.lang, type: '' }), getAllWorks)
  createMemo(() => {
    const list = allData()
    if (list?.length)
      cacheWorks(param.lang, list)
  })
  const works = () => (allData() || []).slice(0, 5)
  const heroImgs = () => works().map(w => w.cover).filter(Boolean)

  useMomentumScroll()

  return (
    <div class="eran-design">
      <SiteTitle>{i18n.title_home()}</SiteTitle>
      <SeoMeta />
      <OrganizationJsonLd />

      <DesignCursor />
      <DesignHeader />

      <div id="d-scaleWrap">
        <Hero heroImgs={heroImgs()} />

        {/* Intro 引言 */}
        <section id="d-intro">
          <DesignReveal>
            <span class="kicker">ERAN DESIGN · 深圳</span>
          </DesignReveal>
          <DesignReveal>
            <p>
              覆盖<b>地产与办公</b>、<b>终端 SI</b>、<b>展示道具</b>、<b>品牌 VI</b>、<b>网站 APP</b>
              ——一支团队，从判断到落地。
            </p>
          </DesignReveal>
        </section>

        {/* 作品行 */}
        <section id="d-works">
          <Suspense fallback="">
            <div id="d-workRows">
              <For each={works()}>
                {(item, i) => (
                  <DesignReveal>
                    <DesignWorkRow item={item} index={i()} />
                  </DesignReveal>
                )}
              </For>
            </div>
          </Suspense>
          <div class="d-view-all">
            <DesignReveal>
              <A href="/works">查看全部项目 →</A>
            </DesignReveal>
          </div>
        </section>

        {/* 能力列表 */}
        <section id="d-capabilities">
          <div id="capList">
            <For each={CAPS}>
              {(c, i) => (
                <DesignReveal>
                  <div class="d-cap-row">
                    <span class="no">{String(i() + 1).padStart(2, '0')}</span>
                    <div>
                      <h4>{c.title}</h4>
                      <p class="desc">{c.desc}</p>
                    </div>
                    <span class="en">{c.en}</span>
                  </div>
                </DesignReveal>
              )}
            </For>
          </div>
        </section>

        {/* 客户 */}
        <section id="d-clients">
          <DesignReveal><span class="kicker">TRUSTED BY</span></DesignReveal>
          <DesignReveal>
            <div class="d-client-grid">
              <For each={CLIENTS}>
                {(name) => <span>{name}</span>}
              </For>
            </div>
          </DesignReveal>
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

        <DesignFooter />
      </div>
    </div>
  )
}
