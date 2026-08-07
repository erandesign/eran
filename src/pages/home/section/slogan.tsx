import { onCleanup, onMount } from 'solid-js'
import { I18n, i18n } from '~/components/i18n'

/**
 * 口号：滚动驱动逐行放大动画（原生实现）
 * - 鼠标滚轮滚动时，文字逐行依次放大（第1行先动，第2、3、4行依次跟上）
 * - 每行延迟 0.2 相位，形成明显的逐行波浪
 * - 滚动继续则逐行缩回；回滚即还原
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
    const scroller = document.querySelector<HTMLElement>('#home-main')

    let rafId = 0
    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = scroller ? scroller.clientHeight : window.innerHeight
      // 滚动进度：0（刚进入）→ 0.5（正中）→ 1（离开）
      const total = rect.height + vh
      const progress = Math.min(Math.max((vh - rect.top) / total, 0), 1)

      rows.forEach((row, i) => {
        // 每行错开 0.2 相位（行0先动，行3最后），形成明显的逐行放大
        const p = Math.min(Math.max((progress - i * 0.2) / 0.6, 0), 1)
        const scale = 1 + 0.25 * Math.sin(p * Math.PI)
        row.style.transform = `scale(${scale.toFixed(4)})`
        row.style.transformOrigin = 'center center'
        row.style.willChange = 'transform'
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
