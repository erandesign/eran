import { A, createAsync, useLocation } from '@solidjs/router'
import type { JSXElement } from 'solid-js'
import { Show } from 'solid-js'
import { isAdminC } from '~/serverAction/admin'

/** 限制为管理员访问 */
export default function OnlyAdmin(props: { children: JSXElement }) {
  const isadmin = createAsync(() => isAdminC())
  const location = useLocation()
  return (
    <Show
      when={isadmin()}
      fallback={(
        <Show when={isadmin() === false}fallback="authing...">
          <div class="s-full f-c/c flex-col min-h-dvh">
            <span class="text-32 font-bold">仅管理员可访问</span>
            <A href="/login" state={{ redirectPath: location.pathname }}>前往登录</A>
          </div>
        </Show>
      )}
    >
      {props.children}
    </Show>
  )
};
