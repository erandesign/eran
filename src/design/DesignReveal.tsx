import { Show, createEffect, onCleanup, onMount } from 'solid-js'
import type { JSX } from 'solid-js'

/**
 * 新设计 Reveal（滚动进入视口后显现）
 * - 兼容 SSR：初始 opacity 由 CSS（.d-reveal）控制，进入视口加 .in
 */
export default function DesignReveal(props: {
  children?: JSX.Element
  class?: string
  delay?: number
  style?: JSX.CSSProperties
}) {
  let ref: HTMLDivElement

  onMount(() => {
    const el = ref
    if (!el)
      return
    if (props.delay)
      el.style.transitionDelay = `${props.delay}s`

    // SSR 首屏已渲染：如果已在视口内立即显示
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          el.classList.add('in')
          io.unobserve(el)
        }
      })
    }, { threshold: 0.12 })
    io.observe(el)

    // 兜底：已滚动到元素位置但 IO 未触发（如页面加载后立即滚动）
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh * 0.9 && rect.bottom > 0) {
      requestAnimationFrame(() => el.classList.add('in'))
    }

    onCleanup(() => io.disconnect())
  })

  return (
    <div ref={ref!} class={`d-reveal ${props.class || ''}`} style={props.style}>
      {props.children}
    </div>
  )
}
