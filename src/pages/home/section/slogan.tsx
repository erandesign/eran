import { onCleanup, onMount } from 'solid-js'
import { I18n, i18n } from '~/components/i18n'
import { ScrollTrigger, gsap } from '~/utils/gsap'

/**
 * 口号：滚动驱动动画
 * - 鼠标滚轮滚动时，文字随滚动进度实时放大（到 1.2）再缩回正常
 * - 每行依次错开（行 0 先动，行 3 后动），形成波浪层次
 * - scrub 模式：滚轮位置决定放大程度，回滚即还原
 */
export default function Slogan() {
  onMount(() => {
    if (typeof window === 'undefined')
      return
    const section = document.getElementById('home-slogan')
    if (!section)
      return
    const rows = section.querySelectorAll<HTMLElement>('.home-slogan-row')
    if (!rows.length)
      return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // 每行错开 0.15 的起始偏移，形成依次放大的层次
      rows.forEach((row, i) => {
        const st = {
          trigger: section,
          scroller: '#home-main', // 首页是 #home-main 滚动容器
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: 0.8, // 滚动驱动，平滑跟随
        }
        gsap.fromTo(
          row,
          { scale: 1 },
          {
            scale: 1.2,
            ease: 'none',
            scrollTrigger: {
              ...st,
              start: 'top 90%',
              end: 'center 40%',
            },
          },
        )
        // 回落到正常（后段）
        gsap.fromTo(
          row,
          { scale: 1.2 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              ...st,
              start: 'center 40%',
              end: 'bottom 10%',
            },
          },
        )
      })
    }, section)

    onCleanup(() => {
      ctx.revert()
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
