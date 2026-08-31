/** 新设计页脚 */
export default function DesignFooter(props: {
  rev?: string
}) {
  return (
    <footer class="d-footer">
      <span>ERAN DESIGN CO., LTD.</span>
      <span>© 2026 保留所有权利</span>
      <span>{props.rev || 'CONCEPT 03 — REFINED REV.2026.08'}</span>
    </footer>
  )
}
