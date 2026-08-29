import { useParams } from '@solidjs/router'
import { ErrorBoundary, For, Show, createEffect, createResource, onCleanup } from 'solid-js'
import dayjs from 'dayjs'
import { Title } from '@solidjs/meta'
import { contentTypeMap } from './contentTypeMap'
import { I18n, i18n } from '~/components/i18n'
import SeoMeta from '~/components/SeoMeta'
import { WorkJsonLd } from '~/components/JsonLd'
import { getPublicWorkById, getWorkById } from '~/serverAction/works'
import Image from '~/components/Image'
import Lightbox from '~/components/Lightbox'
import DesignCursor from '~/design/DesignCursor'
import DesignHeader from '~/design/DesignHeader'
import DesignFooter from '~/design/DesignFooter'
import DesignReveal from '~/design/DesignReveal'
import useMomentumScroll from '~/design/useMomentumScroll'
import { getWorkFromCache, getAllCachedWorks } from '~/components/workCache'
import { languageTag } from '~/components/i18n'
import { A } from '@solidjs/router'

/** 作品详情页（新设计：错落排版 + NEXT PROJECT） */
export default function Detail() {
  const param = useParams()
  const lang = () => languageTag() || param.lang || 'zh'
  const [data] = createResource(
    () => Number(param.id || 0),
    async (id) => {
      const cached = await getWorkFromCache(lang(), id)
      if (cached)
        return cached
      return await getWorkById(id)
    },
    {},
  )

  // SPA 导航 title 兜底
  createEffect(() => {
    if (typeof document === 'undefined')
      return
    const item = data()
    if (item?.name) {
      document.title = `${item.name} | ${i18n.title()}`
      const desc = document.querySelector('meta[name="description"]')
      if (desc)
        desc.setAttribute('content', `${item.name} - ${item.address || ''} - ${item.investor || ''}`)
    }
  })
  onCleanup(() => {
    if (typeof document !== 'undefined')
      document.title = i18n.title()
  })

  useMomentumScroll()

  // NEXT PROJECT：从缓存列表取当前作品的下一个（同语言，公开）
  const nextWork = createResource(
    () => data()?.id,
    (id) => {
      const list = getAllCachedWorks(lang()) || []
      if (!list.length)
        return undefined
      const idx = list.findIndex(w => w.id === id)
      if (idx < 0)
        return undefined
      return list[(idx + 1) % list.length]
    },
    {},
  )

  return (
    <div class="eran-design">
      <Show when={data()}>
        <Title>{data()!.name} | {i18n.title()}</Title>
        <meta name="description" content={`${data()!.name} - ${data()!.address} - ${data()!.investor} - ${(data()!.description || '').slice(0, 120)}`} />
        <link rel="canonical" href={`https://www.erandesign.cn/${data()!.lang === 'en' ? 'en' : 'zh'}/work/${data()!.id}`} />
        <SeoMeta
          title={`${data()!.name} | ${i18n.title()}`}
          description={`${data()!.name} - ${data()!.address} - ${data()!.investor}`}
          image={data()!.cover}
          type="article"
        />
        <WorkJsonLd
          name={data()!.name}
          description={data()!.description}
          address={data()!.address}
          investor={data()!.investor}
          area={data()!.area}
          timeStart={data()!.time_start}
          timeEnd={data()!.time_end}
          image={data()!.cover}
          id={data()!.id}
          lang={data()!.lang}
        />
      </Show>

      <DesignCursor />
      <DesignHeader />

      <div id="d-scaleWrap">
        <Show when={data()} fallback={<NotShow />}>
            {/* 封面 */}
            <div style={{ 'height': '100vh', overflow: 'hidden' }}>
              <Image class="s-full object-cover" src={data()!.cover} alt={data()!.name} lazy={false} />
            </div>

            {/* 信息区：标题 + 描述/元数据错落两栏 */}
            <section id="d-work-detail-info" style={{ padding: '120px 48px' }}>
              <DesignReveal>
                <div style={{
                  display: 'flex', 'justify-content': 'space-between', 'align-items': 'flex-end',
                  'flex-wrap': 'wrap', gap: '24px', 'padding-bottom': '48px',
                  'border-bottom': '1px solid var(--line)',
                }}>
                  <h1 style={{
                    'font-family': 'var(--f-serif)', 'font-weight': '300',
                    'font-size': 'clamp(32px, 4.6vw, 64px)', 'line-height': '1.2', 'max-width': '720px',
                  }}>
                    {data()!.name}
                  </h1>
                  <div style={{ 'font-family': 'var(--f-label)', 'font-size': '11px', 'letter-spacing': '.1em', color: 'var(--grey)', 'text-transform': 'uppercase' }}>
                    {data()!.type} · {data()!.address}
                  </div>
                </div>
              </DesignReveal>

              <div style={{
                display: 'grid', 'grid-template-columns': '7fr 5fr', gap: '80px',
                'margin-top': '64px',
              }}>
                <DesignReveal>
                  <I18n
                    i18n={data()!.description}
                    style={{
                      'font-family': 'var(--f-serif)', 'font-size': 'clamp(18px, 1.8vw, 24px)',
                      'line-height': '1.8', color: 'var(--ink)', 'white-space': 'pre-line',
                    }}
                  />
                </DesignReveal>
                <DesignReveal>
                  <div class="d-meta-list">
                    <div style={{ display: 'flex', 'justify-content': 'space-between', 'padding': '18px 0', 'border-bottom': '1px solid var(--line)', 'font-family': 'var(--f-label)', 'font-size': '12px' }}>
                      <span style={{ color: 'var(--grey)' }}>时间</span>
                      <span>{dayjs(data()!.time_start).format('YYYY/MM')} ～ {dayjs(data()!.time_end).format('YYYY/MM')}</span>
                    </div>
                    <div style={{ display: 'flex', 'justify-content': 'space-between', 'padding': '18px 0', 'border-bottom': '1px solid var(--line)', 'font-family': 'var(--f-label)', 'font-size': '12px' }}>
                      <span style={{ color: 'var(--grey)' }}>业主</span>
                      <span>{data()!.investor}</span>
                    </div>
                    <Show when={+(data()!.area) > 0}>
                      <div style={{ display: 'flex', 'justify-content': 'space-between', 'padding': '18px 0', 'border-bottom': '1px solid var(--line)', 'font-family': 'var(--f-label)', 'font-size': '12px' }}>
                        <span style={{ color: 'var(--grey)' }}>面积</span>
                        <span>{data()!.area} m<sup>2</sup></span>
                      </div>
                    </Show>
                    <div style={{ display: 'flex', 'justify-content': 'space-between', 'padding': '18px 0', 'border-bottom': '1px solid var(--line)', 'font-family': 'var(--f-label)', 'font-size': '12px' }}>
                      <span style={{ color: 'var(--grey)' }}>地址</span>
                      <span>{data()!.address}</span>
                    </div>
                  </div>
                </DesignReveal>
              </div>
            </section>

            {/* 内容（错落排列：大图全宽 / 左右分栏交替） */}
            <section id="d-work-detail-content" style={{ padding: '0 48px 140px' }}>
              <div style={{ display: 'flex', 'flex-direction': 'column', gap: '64px' }}>
                <For each={data()?.content || []}>
                  {(item, i) => {
                    const Ele = contentTypeMap[item.type]
                    if (Ele)
                      return (
                        <DesignReveal delay={Math.min(i() * 0.05, 0.3)}>
                          {/* 错落：偶数块窄 88%，奇数块全宽，模拟设计稿的错落节奏 */}
                          <div style={{ width: i() % 2 === 0 ? '100%' : '88%', 'margin-left': i() % 2 === 0 ? '0' : 'auto' }}>
                            {/* @ts-expect-error content type spread */}
                            <Ele {...item} />
                          </div>
                        </DesignReveal>
                      )
                    return null
                  }}
                </For>
              </div>
            </section>

            {/* NEXT PROJECT */}
            <Show when={nextWork()}>
              <section id="d-next-project" style={{ padding: '0 48px 140px' }}>
                <DesignReveal>
                  <A
                    href={`/${lang()}/work/${nextWork()!.id}`}
                    style={{ display: 'block', 'text-decoration': 'none' }}
                  >
                    <div style={{
                      display: 'flex', 'justify-content': 'space-between', 'align-items': 'flex-end',
                      'padding': '32px 0', 'border-top': '1px solid var(--line)', 'border-bottom': '1px solid var(--line)',
                    }}>
                      <div>
                        <div style={{ 'font-family': 'var(--f-label)', 'font-size': '11px', 'letter-spacing': '.14em', color: 'var(--gold)', 'text-transform': 'uppercase', 'margin-bottom': '14px' }}>
                          NEXT PROJECT
                        </div>
                        <h2 style={{ 'font-family': 'var(--f-serif)', 'font-weight': '400', 'font-size': 'clamp(24px, 3vw, 44px)', 'line-height': '1.2' }}>
                          {nextWork()!.name}
                        </h2>
                        <div style={{ 'font-family': 'var(--f-label)', 'font-size': '11px', color: 'var(--grey)', 'letter-spacing': '.05em', 'text-transform': 'uppercase', 'margin-top': '12px' }}>
                          {nextWork()!.type} · {nextWork()!.address}
                        </div>
                      </div>
                      <div style={{ 'font-family': 'var(--f-it)', 'font-style': 'italic', 'font-size': 'clamp(20px, 2vw, 30px)', color: 'var(--ink)' }}>
                        下一个 →
                      </div>
                    </div>
                  </A>
                </DesignReveal>
              </section>
            </Show>
          </Show>

        <DesignFooter rev={`WORK ${data()?.id || ''} — REV.2026.08`} />
      </div>

      {/* 图片灯箱 */}
      <Lightbox />
    </div>
  )
}

function NotShow() {
  return (
    <div style={{ 'min-height': '60vh', display: 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
      <span style={{ 'font-size': '24px', color: 'var(--grey)' }}>无法查看</span>
    </div>
  )
}
