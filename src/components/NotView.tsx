import { A, useNavigate } from '@solidjs/router'

/** 无法查看 */
export default function NotView() {
  const navigate = useNavigate()
  return (
    <div class="min-h-60vh f-c/c flex-col h-dvh">
      <span class="mb-16 text-32">无法查看</span>
      <a class="text-blue" onClick={[navigate, -1]}>返回</a>
    </div>
  )
};
