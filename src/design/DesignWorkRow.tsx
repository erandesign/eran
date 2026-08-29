import { For, Show, createSignal, onCleanup, onMount } from 'solid-js'
import type { IWorkListItem } from '~/serverAction/works'
import { useNavigate } from '@solidjs/router'

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
 */
export default function DesignWorkRow(props: {
  item: IWorkListItem
  index: number
  hide?: boolean
}) {
  const navigate = useNavigate()
  const imgs = extractImages(props.item)
  const [expanded, setExpanded] = createSignal(false)
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
    setExpanded(!isOpen)
  }

  // 滚轮横向滑动（展开后）
  const onWheel = (e: WheelEvent) => {
    if (!expanded() || !trackRef)
      return
    const max = trackRef.scrollWidth - trackRef.clientWidth
    if (max <= 0)
      return
    e.preventDefault()
    e.stopPropagation()
    trackTarget = Math.max(0, Math.min(trackTarget + e.deltaY * 1.15, max))
    if (!trackRunning) {
      trackRunning = true
      const ease = () => {
        if (!trackRef) {
          trackRunning = false
          return
        }
        trackRef.scrollLeft += (trackTarget - trackRef.scrollLeft) * 0.16
        if (Math.abs(trackTarget - trackRef.scrollLeft) > 0.5)
          raf = requestAnimationFrame(ease)
        else {
          trackRef.scrollLeft = trackTarget
          trackRunning = false
        }
      }
      raf = requestAnimationFrame(ease)
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

  onCleanup(() => {
    // SSR cleanNode 也会调用 onCleanup —— 浏览器 API 需保护
    if (typeof cancelAnimationFrame !== 'undefined')
      cancelAnimationFrame(raf)
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
    >
      {/* 媒体区 */}
      <div
        class="d-work-media"
        ref={mediaRef!}
        onWheel={onWheel}
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
                navigate(`/work/${props.item.id}`)
              }}
            >
              查看详情 →
            </span>
          </div>
        </div>

        {/* 点击展开/收起（避开圆点与面板） */}
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
