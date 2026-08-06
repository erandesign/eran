import { useLocation, useParams } from '@solidjs/router'
import { Show, createEffect } from 'solid-js'
import Link from '../Link'
import { useLanguage } from '../i18n'

export interface LangChangeProps {
  class?: string
}
/** 切换语言 */
export default function LangChange(props: LangChangeProps) {
  const param = useParams()
  const location = useLocation()
  const { languageTag, setLanguageTag } = useLanguage()

  const nextlang = () => (languageTag() === 'zh' ? 'en' : 'zh')
  const nextPath = () => {
    const paths = location.pathname.split('/')
    paths[1] = nextlang()
    return paths.join('/')
  }

  return (
    <Link
      href={nextPath()}
      class={`font-bold text-12  f-c/c decoration-none  ${props.class}`}

      onClick={() => {
        setLanguageTag(nextlang())
        document.querySelector('html')?.setAttribute('lang', nextlang())
      }}
    >
      <Show when={param.lang === 'zh'} fallback="中">En</Show>
    </Link>
  )
}
