import type { RouteDefinition } from '@solidjs/router'
import type { JSXElement } from 'solid-js'
import OnlyAdmin from '~/components/OnlyAdmin'
import { isAdminC } from '~/serverAction/admin'

export const route = {
  load: () => isAdminC(),
} satisfies RouteDefinition

/** 管理员限制 */
export default function Admin(props: { children: JSXElement }) {
  return <OnlyAdmin>{props.children}</OnlyAdmin>
};
