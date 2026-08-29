import { onCleanup, onMount } from 'solid-js'

/** 自定义光标（仅桌面端显示，CSS 控制） */
export default function DesignCursor() {
  let dotRef: HTMLDivElement

  onMount(() => {
    const dot = dotRef
    if (!dot)
      return
    const move = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
    }
    const big = () => dot.classList.add('big')
    const small = () => dot.classList.remove('big')

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', (e) => {
      const t = e.target as HTMLElement
      if (t.closest?.('.d-work-media, .d-view-all a, .d-nav a, .mail, .d-cap-row'))
        big()
    })
    document.addEventListener('mouseout', (e) => {
      const t = e.target as HTMLElement
      if (t.closest?.('.d-work-media, .d-view-all a, .d-nav a, .mail, .d-cap-row'))
        small()
    })

    onCleanup(() => {
      window.removeEventListener('mousemove', move)
    })
  })

  return <div id="dot" ref={dotRef!}><span class="lbl">查看</span></div>
}
