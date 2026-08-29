import { For, Show, createSignal, onCleanup, onMount } from 'solid-js'
import { useNavigate, useParams } from '@solidjs/router'
import { createResource } from 'solid-js'
import { getAllWorks } from '~/serverAction/works'
import { cacheWorks } from '~/components/workCache'
import { i18n } from '~/components/i18n'
import DesignWorkRow from '../DesignWorkRow'

/**
 * 首页 Hero：视频 + 作品图交叉淡化 + 序号索引
 */
function Hero() {
  const navigate = useNavigate()
  const param = useParams()
  const [allData] = createResource(() => ({ lang: param.lang, type: '' }), getAllWorks)

  // 从作品提取 hero 图（取前 3 个作品的 cover）
  const heroImgs = () => (allData() || []).slice(0, 3).map(w => w.cover).filter(Boolean)

  const [cur, setCur] = createSignal(0)
  let timer: ReturnType<typeof setTimeout> | undefined

  const goTo = (i: number) => {
    setCur(i)
    scheduleNext()
  }

  const scheduleNext = () => {
    clearTimeout(timer)
    const total = heroImgs().length
    timer = setTimeout(() => {
      setCur(c => (c + 1) % (total + 1)) // +1 = 视频
    }, cur() === 0 ? 10000 : 6000)
  }

  onMount(() => {
    scheduleNext()
  })
  onCleanup(() => clearTimeout(timer))

  const slides = () => {
    const imgs = heroImgs()
    return [
      { type: 'video' as const },
      ...imgs.map(src => ({ type: 'img' as const, src })),
    ]
  }

  return (
    <section id="d-hero">
      <For each={slides()}>
        {(s, i) => (
          <Show when={i() === cur() || (i() === 0 && !heroImgs().length)}>
            <div class={`slide ${i() === cur() ? 'on' : ''}`} data-type={s.type}>
              <Show when={s.type === 'video'} fallback={<img src={s.src} alt="" />}>
                <video autoplay muted loop playsinline preload="auto" poster="/images/cover.webp">
                  <source src="/video/cover.webm" type="video/webm" />
                </video>
              </Show>
            </div>
          </Show>
        )}
      </For>

      <div class="d-hero-content">
        <p class="d-hero-kicker">“我们用空间叙事，<br />链接商业与未来。”</p>
        <div class="d-hero-index">
          <For each={slides()}>
            {(_, i) => (
              <span classList={{ on: i() === cur() }} onClick={() => goTo(i())}>
                {String(i() + 1).padStart(2, '0')}
              </span>
            )}
          </For>
        </div>
      </div>
      <div class="d-scroll-hint"><span>SCROLL</span><span class="ln" /></div>
    </section>
  )
}

/** 能力列表 */
const CAPS = [
  { title: '地产 & 办公', en: 'REAL ESTATE / OFFICE', desc: '先想清楚人怎么走进空间。' },
  { title: '终端 SI', en: 'RETAIL SYSTEM', desc: '让每一家店，说同一句话。' },
  { title: '展示道具 & POSM', en: 'DISPLAY & POSM', desc: '让产品被看见。' },
  { title: '品牌 VI', en: 'BRAND IDENTITY', desc: '空间之前，先定样子。' },
  { title: '网站 & APP', en: 'DIGITAL', desc: '线下的叙事，搬到线上。' },
]

const CLIENTS = ['DJI', '联泰', 'OPPO', 'SHOKZ', '顺络', '天诺', 'vivo', '保利', 'ONEPLUS']

export { Hero, CAPS, CLIENTS }
