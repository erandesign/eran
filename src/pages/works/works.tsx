import { For, Show, Suspense, createEffect, createMemo, createResource, createSignal } from 'solid-js'
import { useParams, useSearchParams } from '@solidjs/router'
import { getAllWorks } from '~/serverAction/works'
import { cacheWorks } from '~/components/workCache'
import { i18n } from '~/components/i18n'
import SiteTitle from '~/components/SiteTitle'
import SeoMeta from '~/components/SeoMeta'
import DesignCursor from '~/design/DesignCursor'
import DesignHeader from '~/design/DesignHeader'
import DesignFooter from '~/design/DesignFooter'
import DesignReveal from '~/design/DesignReveal'
import DesignWorkRow from '~/design/DesignWorkRow'
import useMomentumScroll from '~/design/useMomentumScroll'

/** 作品页（新设计 REFINED） */
export default function Works() {
  const param = useParams()
  const [params, setParams] = useSearchParams()
  const [allData] = createResource(() => ({ lang: param.lang, type: '' }), getAllWorks)
  createMemo(() => {
    const list = allData()
    if (list?.length)
      cacheWorks(param.lang, list)
  })

  // 全部类型（数据库真实分类）
  const allTypes = createMemo(() => {
    const list = allData() || []
    const zhAll = i18n.subTitles({}, { lang: 'zh' })
    const curAll = i18n.subTitles()
    return ['全部', ...zhAll.map((t, i) => curAll[i] ?? t)]
  })

  // 当前筛选（URL type 参数）
  const [curr, setCurr] = createSignal('全部')
  createEffect(() => {
    const t = typeof params.type === 'string' ? params.type : ''
    const valid = allTypes().find(v => v === t)
    setCurr(valid || '全部')
  })

  // 过滤
  const filtered = createMemo(() => {
    const list = allData() || []
    const c = curr()
    if (c === '全部' || !c)
      return list
    const zhAll = i18n.subTitles({}, { lang: 'zh' })
    const zhType = zhAll[allTypes().indexOf(c)]
    return list.filter(v => v.type === zhType || v.type === c)
  })

  const pick = (t: string) => {
    setCurr(t)
    if (t === '全部')
      setParams({ type: undefined }, { replace: true })
    else
      setParams({ type: t }, { replace: true })
  }

  useMomentumScroll()

  return (
    <div class="eran-design">
      <SiteTitle>{i18n.nav_p_1()}</SiteTitle>
      <SeoMeta />

      <DesignCursor />
      <DesignHeader active="works" />

      <div id="d-scaleWrap">
        {/* 页面引言 */}
        <section id="d-page-intro">
          <DesignReveal><span class="kicker">ALL WORKS</span></DesignReveal>
          <DesignReveal>
            <h1>我们做过的，<br />都在这里。</h1>
          </DesignReveal>
          <DesignReveal>
            <div class="count" id="countLabel">共 {allData()?.length || 0} 个项目</div>
          </DesignReveal>
          <DesignReveal>
            <div class="d-filter-row" id="filterRow">
              <For each={allTypes()}>
                {(t) => (
                  <span classList={{ active: t === curr() }} onClick={() => pick(t)}>
                    {t}
                  </span>
                )}
              </For>
            </div>
          </DesignReveal>
        </section>

        {/* 作品列表 */}
        <section id="d-works">
          <Suspense fallback="">
            <div id="d-workRows">
              <For each={filtered()}>
                {(item, i) => (
                  <DesignReveal>
                    <DesignWorkRow item={item} index={i()} />
                  </DesignReveal>
                )}
              </For>
            </div>
            <Show when={!filtered().length}>
              <div style={{ 'padding': '120px 0', 'text-align': 'center', color: 'var(--grey)' }}>
                {i18n.noData()}
              </div>
            </Show>
          </Suspense>
        </section>

        <DesignFooter rev="ALL WORKS — REV.2026.08" />
      </div>
    </div>
  )
}
