import type { JSX } from 'solid-js'
import { createSignal, onCleanup, onMount, splitProps } from 'solid-js'

interface RevealProps {
  children: JSX.Element
  /** 透传给外层 div 的 class（保留 col-* 网格定位） */
  class?: string
  /** 透传给外层 div 的 classList（保留 col-* 网格定位） */
  classList?: Record<string, boolean | undefined>
  /** 每个元素动画间隔 ms（默认 150） */
  delayStep?: number
  /** 一批结束后的空闲重置时间 ms（默认 400） */
  resetIdle?: number
}

// 全局批次计数器 + 空闲重置定时器（跨所有卡片实例共享）
let batchIndex = 0
let resetTimer: ReturnType<typeof setTimeout> | undefined

/**
 * 依次出现动画（滚动入场）：
 * - IntersectionObserver 监听（threshold 0.2）
 * - 同一批触发元素按触发顺序设置 transition-delay（0.15s 递增，全局计数器）
 * - 400ms 内无新元素触发则重置计数器，下一批滚动进来的元素从头错开
 * - opacity 0 + translateY(40px) → 1 + 0，cubic-bezier(0.16,1,0.3,1)，0.8s，一次性
 * - 保留现有 class/classList 透传（不破坏 col-* 网格定位）
 */
export default function Reveal(props: RevealProps) {
  const [local, rest] = splitProps(props, ['children', 'delayStep', 'resetIdle', 'class', 'classList'])
  const [visible, setVisible] = createSignal(true)
  let el: HTMLDivElement | undefined
  let observer: IntersectionObserver | undefined

  const delayStep = props.delayStep ?? 150
  const resetIdle = props.resetIdle ?? 400

  const resetBatch = () => {
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      batchIndex = 0
    }, resetIdle)
  }

  const reveal = () => {
    // 按触发顺序累加延迟
    const delay = batchIndex * delayStep
    batchIndex++
    resetBatch()
    setTimeout(() => setVisible(true), delay)
  }

  onMount(() => {
    if (!el)
      return
    // 环境不支持：保持可见
    if (typeof IntersectionObserver === 'undefined')
      return
    // 先隐藏（浏览器尚未 paint，用户看不到闪变），再依次淡入
    setVisible(false)

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer?.unobserve(entry.target)
            reveal()
          }
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    onCleanup(() => {
      observer?.disconnect()
      clearTimeout(resetTimer)
    })
  })

  return (
    <div
      ref={el}
      class={local.class}
      classList={local.classList}
      style={{
        opacity: visible() ? 1 : 0,
        transform: visible() ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      {...rest}
    >
      {local.children}
    </div>
  )
}
