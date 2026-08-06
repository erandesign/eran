import { clamp } from 'lodash-es'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { isServer } from 'solid-js/web'
/** 横向滚动条 */
export default function useMouseScrollX(scrollBox: () => HTMLElement, scrollItem: () => HTMLElement, optons?: {
  onSatrt?: (e: MouseEvent) => void
  onEnd?: (e: MouseEvent) => void
  onMove?: (e: MouseEvent) => void
}) {
  const [mouseX, setMouseX] = createSignal(0)
  const [isMoveIng, setIsMoveIng] = createSignal(false)
  if (isServer)
    return { mouseX, setMouseX, isMoveIng }

  let thisX = 0 // 这次初始位置
  let lastX = 0 // 上次停留的位置

  const sLen = () => scrollBox().clientWidth - scrollItem().clientWidth

  const onMove = (e: MouseEvent) => {
    optons?.onMove?.(e)
    if (isMoveIng())
      setMouseX(clamp(e.pageX - thisX + lastX, 0, sLen()))
  }
  const onUp = (e: MouseEvent) => {
    setIsMoveIng(false)
    optons?.onEnd?.(e)
  }
  const onDown = (e: MouseEvent) => {
    if (e.target === scrollItem()) {
      setIsMoveIng(true)
      thisX = e.pageX
      lastX = mouseX()
      optons?.onSatrt?.(e)
    }
  }

  onMount(() => {
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mousedown', onDown)
  })
  onCleanup(() => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
    document.removeEventListener('mousedown', onDown)
  })
  return { mouseX, setMouseX, isMoveIng }
}

export function useMouseScroll(scrollBox: () => HTMLElement) {
  if (isServer)
    return

  let isMoveIng = false
  let thisX = 0 // 这次初始位置

  const onMove = (e: MouseEvent) => {
    if (isMoveIng) {
      const lenghtX = (e.pageX - thisX) * 1.68
      thisX = e.pageX
      scrollBox().scrollTo({ left: scrollBox().scrollLeft - lenghtX })
    }
  }
  const onUp = () => (isMoveIng = false)
  const onDown = (e: MouseEvent) => {
    isMoveIng = true
    thisX = e.pageX
  }

  onMount(() => {
    scrollBox().addEventListener('mousemove', onMove)
    scrollBox().addEventListener('mouseup', onUp)
    scrollBox().addEventListener('mousedown', onDown)
  })
  onCleanup(() => {
    scrollBox().removeEventListener('mousemove', onMove)
    scrollBox().removeEventListener('mouseup', onUp)
    scrollBox().removeEventListener('mousedown', onDown)
  })
}
