import { For, Show, createSignal, onCleanup, onMount } from 'solid-js'

/**
 * 图片灯箱：点击详情页图片放大查看
 * - 全屏查看大图，点击/按 Esc 关闭
 * - 支持左右切换（多图时）
 * - 通过全局事件委托捕获 [data-lightbox] 图片点击
 */
export default function Lightbox() {
  const [open, setOpen] = createSignal(false)
  const [images, setImages] = createSignal<string[]>([])
  const [current, setCurrent] = createSignal(0)

  const openLightbox = (src: string, all: string[]) => {
    setImages(all)
    setCurrent(all.indexOf(src) >= 0 ? all.indexOf(src) : 0)
    setOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const close = () => {
    setOpen(false)
    document.body.style.overflow = ''
  }

  const next = () => setCurrent((c) => (c + 1) % Math.max(images().length, 1))
  const prev = () => setCurrent((c) => (c - 1 + images().length) % Math.max(images().length, 1))

  // 全局点击委托：捕获页面上任意 [data-lightbox] 图片
  onMount(() => {
    const handler = (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest?.('[data-lightbox]') as HTMLImageElement | null
      if (img?.dataset?.lightbox) {
        e.preventDefault()
        e.stopPropagation()
        // 收集页面所有可放大图片（去重）
        const all = [...new Set(
          Array.from(document.querySelectorAll<HTMLImageElement>('[data-lightbox]'))
            .map(i => i.dataset.lightbox || '')
            .filter(Boolean),
        )]
        if (all.length)
          openLightbox(img.dataset.lightbox, all)
      }
    }
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')
        close()
      if (e.key === 'ArrowRight')
        next()
      if (e.key === 'ArrowLeft')
        prev()
    }
    document.addEventListener('click', handler)
    document.addEventListener('keydown', keyHandler)
    onCleanup(() => {
      document.removeEventListener('click', handler)
      document.removeEventListener('keydown', keyHandler)
      document.body.style.overflow = ''
    })
  })

  return (
    <Show when={open()}>
      <div
        class="fixed inset-0 z-999 flex items-center justify-center bg-black/90 backdrop-blur-5"
        onClick={(e) => {
          if (e.target === e.currentTarget)
            close()
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* 关闭 */}
        <button
          class="absolute right-30 top-30 z-10 flex h-44 w-44 cursor-pointer items-center justify-center rounded-full bg-white/10 text-24 text-white transition-colors-300 hover:bg-white/25"
          onClick={close}
          aria-label="关闭"
        >
          ✕
        </button>
        {/* 图片 */}
        <div class="max-h-90vh max-w-90vw">
          <img
            src={images()[current()]}
            class="max-h-90vh max-w-90vw object-contain shadow-2xl"
            alt="作品大图"
          />
        </div>
        {/* 左右切换（多图时显示） */}
        <Show when={images().length > 1}>
          <button
            class="absolute left-30 top-1/2 z-10 flex h-44 w-44 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-20 text-white transition-colors-300 hover:bg-white/25"
            onClick={prev}
            aria-label="上一张"
          >
            ‹
          </button>
          <button
            class="absolute right-30 top-1/2 z-10 flex h-44 w-44 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-20 text-white transition-colors-300 hover:bg-white/25"
            onClick={next}
            aria-label="下一张"
          >
            ›
          </button>
          <span class="absolute bottom-30 left-1/2 -translate-x-1/2 text-14 tracking-4 text-white/70">
            {current() + 1} / {images().length}
          </span>
        </Show>
      </div>
    </Show>
  )
}
