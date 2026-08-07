import { onCleanup, onMount } from 'solid-js'
import { I18n, i18n } from '~/components/i18n'

/** 口号：滚动进入视口时，文字依行放大再缩回正常（一次性动画） */
export default function Slogan() {
  onMount(() => {
    const section = document.getElementById('home-slogan')
    if (!section)
      return
    const rows = Array.from(section.querySelectorAll<HTMLElement>('.home-slogan-row'))

    // 观察区块进入视口：触发一次逐行 放大→缩小 动画
    let triggered = false
    const trigger = () => {
      if (triggered)
        return
      triggered = true
      rows.forEach((row, i) => {
        // 每行依次错开 0.15s 开始，动画 1s（放大到1.2再缩回1）
        row.style.animation = `slogan-pulse 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s both`
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect()
            trigger()
            break
          }
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(section)

    // 兜底：滚动到 slogan 附近时触发（兼容 IO 失效场景）
    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < vh * 0.85 && rect.bottom > 0) {
        window.removeEventListener('scroll', onScroll)
        observer.disconnect()
        trigger()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onCleanup(() => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    })
  })

  return (
    <div class="h-600 w-full bg-black" id="home-slogan">
      {/* keyframes 注入一次（SSR 安全：只影响客户端） */}
      <style>{`
        @keyframes slogan-pulse {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
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
