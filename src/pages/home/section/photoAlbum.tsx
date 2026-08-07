import { useNavigate, useParams } from '@solidjs/router'
import type { KeenSliderInstance, KeenSliderPlugin } from 'keen-slider'
import KeenSlider from 'keen-slider'
import { For, Show, Suspense, createEffect, createMemo, createResource, createSignal, onCleanup, onMount } from 'solid-js'
import { isServer } from 'solid-js/web'
import Image from '~/components/Image'
import Link from '~/components/Link'
import { i18n } from '~/components/i18n'
import { getAllWorks } from '~/serverAction/works'
import useMouseScrollX from '~/utils/useMouseScrollX'

/**  */
export default function PhotoAlbum() {
  let mouseDowm = false
  let move = false
  const navigator = useNavigate()
  let slider: KeenSliderInstance
  // autoplay 定时器引用（供 onCleanup 清理）
  let autoPlayTimer: ReturnType<typeof setTimeout> | undefined

  let sBox: HTMLDivElement
  let sBoxItem: HTMLDivElement

  const [sNum, setSNum] = createSignal(0)
  const param = useParams()
  // 一次性加载全部公开作品（type=''），切换 tab 时纯前端过滤，避免 server-fn 431
  const [allData] = createResource(() => ({ lang: param.lang, type: '' }), getAllWorks)
  // 按当前 tab 类型过滤
  const data = createMemo(() => {
    const type = i18n.subTitles({}, { lang: 'zh' })[sNum()]
    return (allData() || []).filter(v => v.type === type)
  })

  // tab 切换或数据变化时更新 slider（数据就绪后）
  createEffect(() => {
    const list = data()
    if (list.length && slider) {
      // 延迟到 DOM 更新后 update（数量变化时 keen-slider 需要重建 slides）
      queueMicrotask(() => {
        if (slider) {
          slider.update()
          slider.moveToIdx(0)
        }
      })
    }
  })

  const sLen = () => sBox.clientWidth - sBoxItem.clientWidth
  const { mouseX, setMouseX, isMoveIng } = useMouseScrollX(() => sBox, () => sBoxItem, {
    // onEnd() {
    //   const i = slider.track.distToIdx(slider.track.details.progress)
    //   slider.moveToIdx(i)
    // },
  })
  createEffect(() => {
    if (isMoveIng()) {
      const i = ((mouseX() / sLen()) * slider.track.details?.length)
      slider.track.to(i)
    }
  })
  const carousel: KeenSliderPlugin = (slider) => {
    slider.on('detailsChanged', () => {
      !isMoveIng() && slider.track.details?.progress && setMouseX(sLen() * slider.track.details.progress)
      slider.slides.forEach((element, idx) => {
        const p = slider.track.details.slides[idx].portion
        element.style.setProperty('--item-op', (0.1 + 0.9 * p).toString())
        element.style.setProperty('z-index', Math.floor(4 * p).toString())
        element.querySelector<HTMLDivElement>('.keen-slider__slidemain')!.style.setProperty('transform', `scale(${1 + 0.15 * p})`)
      })
    })
  }

  /**
   * 柔和自然自动滚动：
   * - 平滑滑动到下一张（2s 缓动，easeOutCubic 减速自然）
   * - 停留 3.5s 后继续
   * - 悬停/拖拽时暂停，离开后恢复
   */
  const autoplay = (target: KeenSliderInstance) => {
    let paused = false
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const scheduleNext = () => {
      clearTimeout(autoPlayTimer)
      if (paused || target.track.details.length <= 1)
        return
      autoPlayTimer = setTimeout(() => {
        const current = target.track.details.relativeSlide
        const next = (current + 1) % Math.max(target.track.details.length, 1)
        // 平滑滑动：2s 缓动 + 自然的减速
        target.moveToIdx(next, false, { duration: 2000, easing: easeOutCubic })
        scheduleNext()
      }, 3500)
    }

    target.on('created', () => {
      target.container.addEventListener('mouseenter', () => {
        paused = true
        clearTimeout(autoPlayTimer)
      })
      target.container.addEventListener('mouseleave', () => {
        paused = false
        scheduleNext()
      })
      scheduleNext()
    })
    target.on('dragStarted', () => {
      paused = true
      clearTimeout(autoPlayTimer)
    })
    target.on('dragEnded', () => {
      paused = false
      scheduleNext()
    })
    target.on('destroyed', () => {
      clearTimeout(autoPlayTimer)
    })
  }

  onMount(() => {
    if (isServer && !document.querySelector('#my-keen-slider')?.lastChild) {
      return
    }
    slider = new KeenSlider('#my-keen-slider', {
      loop: !true,
      // renderMode: 'performance',
      drag: true,
      mode: 'free-snap',
      slides: {
        origin: 'center',
        perView: 1.75,
        spacing: 15,

      },
    }, [
      carousel,
      // WheelControls,
      autoplay,
    ])
  })
  onCleanup(() => {
    clearTimeout(autoPlayTimer)
    slider && slider.destroy()
  })
  return (
    <div class="w-full bg-black py-1">
      <div
        class="overflow-auto py-50 scrollbar-none"
      >
        <div
          id="my-keen-slider"
          class="keen-slider [--item-op:0.2] h-666 w-auto flex-c/i flex-row transform-preserve-3d"
        >
          <Suspense>
            <Show
              when={data().length}
              fallback={(
                <div class="flex h-666 w-full items-center justify-center text-16 tracking-5 text-white/40">
                  <span>暂无该类型作品</span>
                </div>
              )}
            >
              <For each={data()}>
                {(item) => {
                  return (
                    <div
                      class="keen-slider__slide h-666 w-1080 f-c/c shrink-0 cursor-pointer bg-white/10 opacity-[--item-op] [&:hover_.main]:opacity-100 hover:[--item-op:1]!"
                      onMouseDown={() => { mouseDowm = true }}
                      onMouseMove={() => { if (mouseDowm) { move = true } }}
                      onClick={() => {
                        mouseDowm = false
                        if (move) {
                          move = false
                        }
                        else {
                          navigator(`work/${item.id}`)
                        }
                      }}
                    >
                      <div class="keen-slider__slidemain relative s-full f-c/c">
                        <Image class="s-full select-none object-cover" draggable="false" src={item.cover} />
                        <div
                          class="main absolute s-full f-s/e flex-col px-30 py-43 op-0 transition-all"
                          style={{
                            cursor: `url('/images/cursor_goto_white.svg'),auto`,
                          }}
                        >
                          <span class="mb-8 text-14 text-white">查看详情</span>
                          <div class="flex flex-col b-0 b-t-1 b-white b-solid py-12">
                            <span class="text-20 text-white">{item.name}</span>
                            <span class="text-14 text-white">{item.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }}
              </For>
            </Show>
          </Suspense>

        </div>
      </div>
      {/* 滚动条 */}
      <div
        class="relative my-44 ml-614 h-3 w-1220 overflow-hidden rd-full bg-#d9d9d9/18"
        ref={(r) => {
          sBox = r
        }}
      >
        <div
          class="absolute h-3 w-166 cursor-pointer select-none rd-full bg-white"
          style={{ left: `${mouseX()}px` }}
          ref={r => (sBoxItem = r)}
        />
      </div>
      {/* 文字 */}
      <div class="h-30 f-c/s gap-56 px-56 text-12 text-#797979 tracking-5" lang-en="tracking-1">
        <For each={i18n.subTitles()}>
          {(item, i) => (
            <span
              onClick={() => {
                setSNum(i())
                // scrollContent.children[i()].scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
              }}
              class="cursor-pointer select-none transition-500"
              classList={{ 'text-white scale-160 transform-origin-cb': i() === sNum() }}
            >
              {item}
            </span>
          )}
        </For>
      </div>
      <div class="mb-164 mt-20 f-c/c">
        <Link href="/works" class="decoration-none">
          <div
            class="h-46 f-c/c select-none b-1px b-white rd-full b-solid px-36 text-12 text-white tracking-3 transition-colors-500 btn"
            hover="bg-white text-black"
            lang-en="tracking-1"
          >
            {i18n.photoAlbum_btn()}
            {/* <img  src="/images/ico-shape.svg" /> */}
            <svg class="ml-10" width="17.2" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g fill-rule="evenodd" clip-rule="evenodd" fill="currentColor">
                <path d="M0 4a.5.5 0 0 1 .5-.5h16a.5.5 0 0 1 0 1H.5A.5.5 0 0 1 0 4" />
                <path d="M12.646.146a.5.5 0 0 1 .708 0L17.207 4l-3.853 3.854a.5.5 0 0 1-.708-.708L15.793 4 12.646.854a.5.5 0 0 1 0-.708" />
              </g>
            </svg>
          </div>
        </Link>

      </div>
    </div>
  )
}
/** 自动播放（保留旧插件名导出以兼容） */
function KSautoPlayFn(slider: any, _options?: any, _name?: string) {
  const shared = slider.container as HTMLElement & { __eranAutoplayTimeout?: string | number | NodeJS.Timeout }
  let timeout: string | number | NodeJS.Timeout | undefined
  let mouseOver = false
  function clearNextTimeout() {
    clearTimeout(timeout)
    if (shared)
      shared.__eranAutoplayTimeout = undefined
  }
  function nextTimeout() {
    clearTimeout(timeout)
    if (mouseOver)
      return
    timeout = setTimeout(() => {
      try {
        slider?.next()
      }
      catch {
        /* slider 已销毁 */
      }
    }, 4000)
    if (shared)
      shared.__eranAutoplayTimeout = timeout
  }
  slider.on('created', () => {
    if (shared && shared.__eranAutoplayTimeout)
      timeout = shared.__eranAutoplayTimeout
    slider.container.addEventListener('mouseover', () => {
      mouseOver = true
      clearNextTimeout()
    })
    slider.container.addEventListener('mouseout', () => {
      mouseOver = false
      nextTimeout()
    })
    nextTimeout()
  })
  slider.on('dragStarted', clearNextTimeout)
  slider.on('animationEnded', nextTimeout)
  slider.on('updated', nextTimeout)
}

function _WheelControls(slider: any) {
  let touchTimeout: string | number | NodeJS.Timeout | undefined
  let position: { x: number, y: number } = { x: 0, y: 0 }
  let wheelActive: boolean

  function dispatch(e: any, name: any) {
    position.x -= e.deltaY
    position.y -= e.deltaY
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      }),
    )
  }

  function wheelStart(e: any) {
    position = {
      x: e.pageX,
      y: e.pageY,
    }
    dispatch(e, 'ksDragStart')
  }

  function wheel(e: any) {
    dispatch(e, 'ksDrag')
  }

  function wheelEnd(e: any) {
    dispatch(e, 'ksDragEnd')
  }

  function eventWheel(e: any) {
    e.preventDefault()
    if (!wheelActive) {
      wheelStart(e)
      wheelActive = true
    }
    wheel(e)
    clearTimeout(touchTimeout)
    touchTimeout = setTimeout(() => {
      wheelActive = false
      wheelEnd(e)
    }, 50)
  }

  slider.on('created', () => {
    slider.container.addEventListener('wheel', eventWheel, {
      passive: false,
    })
  })
}
