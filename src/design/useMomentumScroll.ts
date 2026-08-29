import { onCleanup, onMount } from 'solid-js'

/**
 * 动量滚动 + 页面缩放（BIG 风格）
 * - 滚轮驱动速度，摩擦力减速（惯性滑行）
 * - 滚动速度 → 页面轻微缩放（scale 0.94~1），随速度恢复
 * - 展开的作品行内部滚轮由 WorkRow 自己接管，此处豁免
 */
export default function useMomentumScroll(wrapId = 'd-scaleWrap') {
  onMount(() => {
    if (typeof window === 'undefined')
      return
    const scaleWrap = document.getElementById(wrapId)
    if (!scaleWrap)
      return

    let velocity = 0
    let virtualY = window.scrollY
    let lastT = performance.now()
    let scale = 1
    let raf = 0
    const FRICTION = 0.94
    const WHEEL_GAIN = 0.30
    const MAX_SPEED = 85

    const onWheel = (e: WheelEvent) => {
      // 展开的作品行内部：让 WorkRow 自己处理（横向滑动）
      if (e.target instanceof Element && e.target.closest?.('.d-work-row.expanded .d-work-media'))
        return
      e.preventDefault()
      velocity += e.deltaY * WHEEL_GAIN
      velocity = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, velocity))
    }

    const tick = (now: number) => {
      const dt = Math.min((now - lastT) / (1000 / 60), 3) || 1
      lastT = now

      // 外部滚动接管时（导航跳转/键盘），采用当前真实位置
      if (Math.abs(window.scrollY - virtualY) > 2 && Math.abs(velocity) < 1)
        virtualY = window.scrollY

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      virtualY += velocity * dt
      if (virtualY < 0) {
        virtualY = 0
        velocity = 0
      }
      if (virtualY > maxScroll) {
        virtualY = maxScroll
        velocity = 0
      }
      window.scrollTo(0, virtualY)
      velocity *= Math.pow(FRICTION, dt)
      if (Math.abs(velocity) < 0.02)
        velocity = 0

      // 缩放与速度成正比，回弹
      const speed = Math.abs(velocity)
      const target = 1 - Math.min(speed * 0.0009, 0.06)
      const ease = target < scale ? 0.22 : 0.05
      scale += (target - scale) * Math.min(ease * dt, 0.3)
      scaleWrap.style.transformOrigin = `50% ${virtualY + window.innerHeight / 2}px`
      scaleWrap.style.transform = `scale(${scale.toFixed(4)})`

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    raf = requestAnimationFrame(tick)

    onCleanup(() => {
      window.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(raf)
      scaleWrap.style.transform = ''
    })
  })
}
