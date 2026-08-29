import { onMount } from 'solid-js'

/**
 * 自定义光标（已停用：按用户要求恢复常规鼠标状态）
 * 组件保留空实现避免改动所有引用处；CSS 已禁用 #dot 与 cursor:none
 */
export default function DesignCursor() {
  onMount(() => {
    // 常规鼠标：无操作
  })

  return null
}
