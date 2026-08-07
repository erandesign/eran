import { onCleanup, onMount } from 'solid-js'
import { I18n, i18n } from '~/components/i18n'

/**
 * 口号：滚动驱动动画（原生实现，不依赖 gsap）
 * - 鼠标滚轮滚动时，文字随滚动进度实时放大（到 1.2）再缩回正常
 * - 每行依次错开偏移，形成波浪层次
 * - scrub 模式：滚动位置决定放大程度，回滚即还原
 */
export default function Slogan() {
  onMount(() => {
    if (typeof window === 'undefined')
      return
    const section = document.getElementById('home-slogan')
    if (!section)
      return
    const rows = Array.from(section.querySelectorAll<HTMLElement>('.home-slogan-row'))
    if (!rows.length)
      return

    // 首页滚动容器
    const scroller = document.querySelector<HTMLElement>('#home-main') || window as any

    let rafId = 0
    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = (scroller === (window as any)) ? window.innerHeight : (scroller as HTMLElement).clientHeight
      // 计算 slogan 在视口中的进度：0（刚进入）→ 0.5（正中）→ 1（离开）
      const total = rect.height + vh
      const progress = Math.min(Math.max((vh - rect.top) / total, 0), 1)
      // 0→0.5 放大到 1.2，0.5→1 缩回 1（正弦波：中段最大）
      const wave = Math.sin(progress * Math.PI)
      rows.forEach((row, i) => {
        // 每行错开 0.15 相位，形成依次放大层次
        const p = Math.min(Math.max(progress * 1.3 - i * 0.06, 0), 1)
        const scale = 1 + 0.2 * Math.sin(p * Math.PI)
        row.style.transform = `scale(${scale.toFixed(4)})`
        row.style.transformOrigin = 'center center'
      })
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)

    onCleanup(() => {
      cancelAnimationFrame(rafId)
    })
  })

  return (
    <div class="h-600 w-full bg-black" id="home-slogan">
      <img class="absolute right-130 top-150 z-11 w-12" src="/images/logo_side.svg" />

      <h2
        class="relative m-0 block s-full f-c/c flex-col gap-42 p-1 text-32 text-#616161 font-normal leading-none tracking-11"
        lang-en="text-30 tracking-3"
      >
        <I18n i18n={i18n.slogan_1} id="home-slogan-1" class="home-slogan-row block" />
        <I18n i18n={i18n.slogan_2} id="home-slogan-2" class="home-slogan-row block overflow-hidden" />
        <I18n i18n={i18n.slogan_3} id="home-slogan-3" class="home-slogan-row block text-white" />
        <I18n i18n={i18n.slogan_4} id="home-slogan-4" class="home-slogan-row block overflow-hidden" />
      </h2>
    </div>
  )
}
