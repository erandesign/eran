import { revalidate, useLocation, useNavigate, useSubmission } from '@solidjs/router'
import toast from '@thinke/toast'
import { createEffect } from 'solid-js'
import { isAdminC, login } from '~/serverAction/admin'

/** 登陆 */
export default function Login() {
  const { state } = useLocation<{ redirectPath: string }>()
  const echoing = useSubmission(login)
  const navigate = useNavigate()

  createEffect (() => {
    if (echoing.result === false) {
      toast.warn('密码错误')
      echoing.clear()
    }
    if (echoing.result === true && state?.redirectPath) {
      // revalidate(isAdminC.key)
      navigate(state.redirectPath, { replace: true })
    }
  })
  return (
    <div class="f-full f-c/c min-h-dvh">
      <form method="post" class="rd-8 bg-gray-1 p-56 text-26" action={login}>
        <span class="">密码：</span>
        <input type="password" name="password" class="b-none text-32" id="admin_password" required />
        <button
          class="mt-30 h-68 f-c/c flex-shrink-1 cursor-pointer rd-68 b-none bg-green-3 px-50 text-20 text-black tracking-7 active:bg-#ddd"
          type="submit"
        >
          登陆
        </button>
      </form>
    </div>
  )
};
