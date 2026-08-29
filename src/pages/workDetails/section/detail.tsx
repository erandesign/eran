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
import { getWorkFromCache } from '~/components/workCache'
import { languageTag } from '~/components/i18n'

/** 作品详情页（新设计风格，保留数据/SEO/灯箱） */
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
        <ErrorBoundary fallback={<NotShow />}>
          <Show when={data()} fallback={<NotShow />}>
            {/* 封面 */}
            <div style={{ 'height': '100vh', overflow: 'hidden' }}>
              <Image class="s-full object-cover" src={data()!.cover} alt={data()!.name} lazy={false} />
            </div>

            {/* 信息区 */}
            <section id="d-work-detail-info" style={{ padding: '120px 48px' }}>
              <DesignReveal>
                <div class="d-work-detail-head" style={{
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
                display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '80px',
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
                    <div class="d-meta-row" style={{ display: 'flex', 'justify-content': 'space-between', 'padding': '18px 0', 'border-bottom': '1px solid var(--line)', 'font-family': 'var(--f-label)', 'font-size': '12px' }}>
                      <span style={{ color: 'var(--grey)' }}>时间</span>
                      <span>{dayjs(data()!.time_start).format('YYYY/MM')} ～ {dayjs(data()!.time_end).format('YYYY/MM')}</span>
                    </div>
                    <div class="d-meta-row" style={{ display: 'flex', 'justify-content': 'space-between', 'padding': '18px 0', 'border-bottom': '1px solid var(--line)', 'font-family': 'var(--f-label)', 'font-size': '12px' }}>
                      <span style={{ color: 'var(--grey)' }}>业主</span>
                      <span>{data()!.investor}</span>
                    </div>
                    <Show when={+(data()!.area) > 0}>
                      <div class="d-meta-row" style={{ display: 'flex', 'justify-content': 'space-between', 'padding': '18px 0', 'border-bottom': '1px solid var(--line)', 'font-family': 'var(--f-label)', 'font-size': '12px' }}>
                        <span style={{ color: 'var(--grey)' }}>面积</span>
                        <span>{data()!.area} m<sup>2</sup></span>
                      </div>
                    </Show>
                    <div class="d-meta-row" style={{ display: 'flex', 'justify-content': 'space-between', 'padding': '18px 0', 'border-bottom': '1px solid var(--line)', 'font-family': 'var(--f-label)', 'font-size': '12px' }}>
                      <span style={{ color: 'var(--grey)' }}>地址</span>
                      <span>{data()!.address}</span>
                    </div>
                  </div>
                </DesignReveal>
              </div>
            </section>

            {/* 内容（多图等） */}
            <section id="d-work-detail-content" style={{ padding: '0 48px 140px' }}>
              <div style={{ display: 'flex', 'flex-direction': 'column', gap: '48px' }}>
                <For each={data()?.content || []}>
                  {(item, i) => {
                    const Ele = contentTypeMap[item.type]
                    if (Ele)
                      return (
                        <DesignReveal delay={Math.min(i() * 0.05, 0.3)}>
                          {/* @ts-expect-error content type spread */}
                          <Ele {...item} />
                        </DesignReveal>
                      )
                    return null
                  }}
                </For>
              </div>
            </section>
          </Show>
        </ErrorBoundary>

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
