import { For, Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import type { IWorkListItem } from '~/serverAction/works'
import { useNavigate, useParams } from '@solidjs/router'

/** 从 content 数组提取全部图片 URL */
function extractImages(item: IWorkListItem): string[] {
  if (!item.content || !Array.isArray(item.content))
    return item.cover ? [item.cover] : []
  const urls = item.content
    .map(c => (c.image || c.L_image || c.R_image || c.M_image || ''))
    .filter(Boolean)
  if (!urls.length && item.cover)
    return [item.cover]
  return urls
}

/**
 * 新设计作品行：media 75% : label 25%
 * - 点击展开：media 扩到 100%，信息面板滑入
 * - 展开后滚轮/拖拽横向滑动浏览多图
 * - 移动端：上下堆叠，面板在图片下方展开
 * 互斥：模块级 expandedId 共享，同时只展开一行（Solid 响应式）
 */
const [expandedId, setExpandedId] = createSignal(0)

export default function DesignWorkRow(props: {
  item: IWorkListItem
  index: number
  hide?: boolean
}) {
  const navigate = useNavigate()
  const params = useParams()
  const goDetail = () => {
    // 带 lang 前缀跳转（旧版 workList 用 ../work/id 相对路径，绝对路径会丢 lang → 404）
    const lang = params.lang || 'zh'
    navigate(`/${lang}/work/${props.item.id}`)
  }
  const imgs = extractImages(props.item)
  // expanded = 全局互斥状态（响应式）：当前行展开 ⇔ expandedId === item.id
  const [expanded, setExpanded] = createSignal(false)
  // 监听全局展开 id：其他行展开时本行收起
  createEffect(() => {
    if (expandedId() !== props.item.id)
      setExpanded(false)
  })
  let mediaRef: HTMLDivElement
  let trackRef: HTMLDivElement
  let trackTarget = 0
  let trackRunning = false
  let raf = 0

  // 展开时重置到第一张
  const toggle = () => {
    const isOpen = expanded()
    if (!isOpen && trackRef) {
      trackRef.scrollLeft = 0
      trackTarget = 0
    }
    // 互斥：展开自己时先收其他行；收起自己时清空
    setExpandedId(isOpen ? 0 : props.item.id)
    setExpanded(!isOpen)
  }

  // 滚轮横向翻页（展开后）：滚轮 = 翻一张（scroll-snap mandatory 下渐进滚动会被吸回，逐张翻页最稳）
  const onWheel = (e: WheelEvent) => {
    if (!expanded() || !trackRef)
      return
    const max = trackRef.scrollWidth - trackRef.clientWidth
    if (max <= 0)
      return
    e.preventDefault()
    e.stopPropagation()
    const dir = e.deltaY > 0 ? 1 : -1
    const cur = Math.round(trackRef.scrollLeft / trackRef.clientWidth)
    const next = Math.max(0, Math.min(cur + dir, Math.round(max / trackRef.clientWidth)))
    if (next !== cur) {
      trackRef.scrollTo({ left: next * trackRef.clientWidth, behavior: 'smooth' })
    }
  }

  // 拖动（拖拽滑动）
  let dragStartX = 0
  let dragStartLeft = 0
  let dragging = false
  const onMouseDown = (e: MouseEvent) => {
    if (!expanded())
      return
    dragging = true
    dragStartX = e.clientX
    dragStartLeft = trackRef.scrollLeft
  }
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging || !trackRef)
      return
    trackRef.scrollLeft = dragStartLeft - (e.clientX - dragStartX)
  }
  const onMouseUp = () => {
    dragging = false
  }

  onMount(() => {
    // Solid 的 onWheel JSX 属性在水合后可能未绑定，手动 addEventListener 确保滚轮翻页生效
    if (typeof window !== 'undefined') {
      // mediaRef 在 Suspense 动态渲染下可能尚未赋值，用 DOM 查询兜底
      const el = mediaRef || document.querySelector(`[data-work-row="${props.item.id}"] .d-work-media`)
      if (el) {
        el.addEventListener('wheel', onWheel, { passive: false })
        // 记录绑定，供调试
        ;(el as any).__wheelBound = true
      }
    }
  })

  onCleanup(() => {
    // SSR cleanNode 也会调用 onCleanup —— 浏览器 API 需保护
    if (typeof cancelAnimationFrame !== 'undefined')
      cancelAnimationFrame(raf)
    if (typeof window !== 'undefined' && mediaRef) {
      mediaRef.removeEventListener('wheel', onWheel)
    }
  })

  // 当前幻灯索引（圆点高亮）
  const [activeIdx, setActiveIdx] = createSignal(0)
  const onTrackScroll = () => {
    if (trackRef && trackRef.clientWidth > 0)
      setActiveIdx(Math.round(trackRef.scrollLeft / trackRef.clientWidth))
  }

  return (
    <div
      class={`d-work-row ${expanded() ? 'expanded' : ''} ${props.hide ? 'hide' : ''}`}
      data-cat={props.item.type}
      data-work-row={props.item.id}
    >
      {/* 媒体区 */}
      <div
        class="d-work-media"
        ref={mediaRef!}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div class="d-media-track" ref={trackRef!} onScroll={onTrackScroll}>
          <For each={imgs}>
            {(src) => (
              <div class="d-media-slide">
                <img src={src} alt={props.item.name} loading="lazy" draggable="false" />
              </div>
            )}
          </For>
        </div>

        <Show when={imgs.length > 1}>
          <div class="d-media-dots">
            <For each={imgs}>
              {(_, i) => (
                <span
                  classList={{ on: i() === activeIdx() }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (trackRef)
                      trackRef.scrollTo({ left: i() * trackRef.clientWidth, behavior: 'smooth' })
                  }}
                />
              )}
            </For>
          </div>
        </Show>

        {/* 展开信息面板 */}
        <div class="d-expand-info">
          <span class="close" onClick={(e) => { e.stopPropagation(); toggle() }}>✕ 收起</span>
          <span class="no">{String(props.index + 1).padStart(2, '0')}</span>
          <h3>{props.item.name}</h3>
          <div class="meta">{props.item.type} · {props.item.address}</div>
          <p>{props.item.description?.split('\n')[0] || ''}</p>
          <div style={{ 'margin-top': '28px' }}>
            <span
              class="close"
              style={{ position: 'static', color: 'var(--gold)' }}
              onClick={(e) => {
                e.stopPropagation()
                goDetail()
              }}
            >
              查看详情 →
            </span>
          </div>
        </div>

        {/* 点击展开/收起（面板与圆点 z-index 更高，不受遮挡） */}
        <div
          class="d-media-hit"
          style={{
            position: 'absolute', inset: 0, zIndex: 3, cursor: 'pointer',
          }}
          onClick={() => toggle()}
        />
      </div>

      {/* 文字标签 */}
      <div class="d-wtext">
        <span class="no">{String(props.index + 1).padStart(2, '0')}</span>
        <h3>{props.item.name}</h3>
        <div class="meta"><span>{props.item.type}</span><span>{props.item.address}</span></div>
      </div>
    </div>
  )
}
