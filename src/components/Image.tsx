import type { ComponentProps } from 'solid-js'
import { createSignal, onCleanup, onMount, splitProps, untrack } from 'solid-js'

interface ImageProps extends ComponentProps<'img'> {
  /** 宽高比占位，如 "3/2"、"4/3"、"16/9"，用于防止 CLS */
  ratio?: string
  /** 是否启用懒加载（默认 true）；首屏关键图传 false 立即加载 */
  lazy?: boolean
}

/** 并发加载队列（全站共享，最多同时加载 2 张） */
const MAX_CONCURRENT = 2
let activeLoads = 0
const pendingQueue: Array<() => void> = []

function acquireSlot(cb: () => void) {
  if (activeLoads < MAX_CONCURRENT) {
    activeLoads++
    cb()
  }
  else {
    pendingQueue.push(cb)
  }
}

function releaseSlot() {
  activeLoads--
  const next = pendingQueue.shift()
  if (next) {
    activeLoads++
    next()
  }
}

/** 预加载单张图片（浏览器缓存命中后立即 resolve） */
function preloadOne(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`加载失败: ${src}`))
    img.src = src
  })
}

/** 生成 srcset 缩略图路径（name.750.ext） */
function thumbOf(src: string): string {
  const pathArr = src.split(/(\.png|\.jpe?g|\.webp|\.gif)/i)
  if (pathArr.length < 3)
    return src
  return `${pathArr[0]}.750${pathArr[1]}`
}

/**
 * 图片组件（稳健版）：
 * - 默认可见：SSR/预渲染 HTML 图片完整（SEO），且不依赖 observer 时序
 * - 客户端水合后：视口前 300px 内保持可见并预加载；视口外进入懒加载队列
 * - IntersectionObserver：进入视口前 300px 触发预加载
 * - new Image() 预加载完成后才淡入显示，避免闪烁
 * - 全站并发限制 2 张，避免网络拥堵
 * - srcset 响应式：移动端加载 .750 缩略图
 */
export default function Image(_props: ImageProps) {
  const [props, otherProps] = splitProps(_props, ['src', 'loading', 'style', 'ratio', 'lazy', 'alt', 'classList', 'class'])
  // 默认可见：保证 SSR/首屏/SPA 导航图片一定能显示
  const [loaded, setLoaded] = createSignal(true)
  const [failed, setFailed] = createSignal(false)
  let el: HTMLImageElement | undefined
  let observer: IntersectionObserver | undefined

  /** 构造 srcset：优先 .750 缩略图（移动端），原图为大屏 */
  const srcset = () => {
    const src = props.src || ''
    if (!src)
      return undefined
    const thumb = thumbOf(src)
    // 缩略图 750w，原图 1920w（浏览器按视口宽度自动选择）
    return `${thumb} 750w, ${src} 1920w`
  }

  /** 进入视口前 300px 触发：预加载（并发限制）完成后淡入 */
  const startLoad = () => {
    untrack(() => {
      const src = props.src
      if (!src || loaded() || failed())
        return
      acquireSlot(() => {
        const thumb = thumbOf(src)
        // 确保缩略图 + 原图均进入缓存（浏览器 srcset 会选择其一）
        const jobs = thumb !== src
          ? [preloadOne(thumb).catch(() => undefined), preloadOne(src)]
          : [preloadOne(src)]
        Promise.all(jobs)
          .then(() => setLoaded(true))
          .catch(() => setFailed(true))
          .finally(() => releaseSlot())
      })
    })
  }

  onMount(() => {
    const src = props.src
    if (!src)
      return
    // 图片加载完成/失败事件兜底：无论懒加载时序如何，加载完必定显示
    const onLoad = () => setLoaded(true)
    const onError = () => setFailed(true)
    el?.addEventListener('load', onLoad)
    el?.addEventListener('error', onError)
    onCleanup(() => {
      el?.removeEventListener('load', onLoad)
      el?.removeEventListener('error', onError)
    })

    // 首屏关键图：保持可见
    if (props.lazy === false)
      return
    // 图片已被加载完成：保持可见
    if (el?.complete && el.naturalWidth > 0)
      return
    // 环境不支持 IntersectionObserver：保持可见（降级）
    if (typeof IntersectionObserver === 'undefined')
      return

    // 延迟到布局完成后判断视口位置（SPA 导航时序安全）
    requestAnimationFrame(() => {
      if (!el)
        return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      // 视口前 300px 内：保持可见，直接预加载（并发控制）
      if (rect.top < vh + 300 && rect.bottom > -300) {
        startLoad()
        return
      }
      // 视口外：隐藏图片，进入懒加载队列
      setLoaded(false)
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              observer?.disconnect()
              startLoad()
              break
            }
          }
        },
        // 进入视口前 300px 即触发
        { rootMargin: '300px 0px', threshold: 0 },
      )
      if (el)
        observer.observe(el)
      onCleanup(() => observer?.disconnect())
    })
  })

  const bgMinimg = () => {
    const path = props.src || ''
    const pathArr = path.split(/(\.png|\.jpe?g|\.webp|\.gif)/)
    const hasMin = pathArr.includes('?min')
    if (hasMin) {
      pathArr[1] = `.min${pathArr[1]}`
      pathArr[2] = ''
      return `url('${pathArr.join('')}')`
    }
    return undefined
  }

  return (
    <img
      {...otherProps}
      ref={el}
      class={`${props.class || ''} transition-opacity-700 duration-700 ${loaded() && !failed() ? 'opacity-100' : 'opacity-0'}`}
      classList={props.classList}
      style={{
        'background-size': '100% 100%',
        'background-image': bgMinimg(),
        'aspect-ratio': props.ratio || undefined,
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        ...(props.style || {}),
      }}
      src={props.src}
      srcset={srcset()}
      alt={props.alt || ''}
      loading={props.lazy === false ? undefined : (props.loading || 'lazy')}
      data-tag="img"
    />
  )
}
