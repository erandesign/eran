import { A } from '@solidjs/router'
import { HttpStatusCode } from '@solidjs/start'
import { i18n } from '~/components/i18n'

export default function Page404() {
  return (
    <div class="w-full f-c/c flex-col h-dvh">
      <HttpStatusCode code={404} />
      <h1>{i18n.msg404()}</h1>
      <A href="/">{i18n.msg404_brack_home()}</A>
    </div>
  )
}
