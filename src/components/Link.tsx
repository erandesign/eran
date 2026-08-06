import type { AnchorProps } from '@solidjs/router'
import { A, useLocation } from '@solidjs/router'
import { languageTagInPathname, normalizePathname, sourceLanguageTag } from './i18n'

export type LinkProps = AnchorProps
/** 优化跳转，自动保留lang前缀 */
export default function Link(props: LinkProps) {
  return <A {...props} href={getNextLink(props.href)} />
}

export function getNextLink(nextLink: string): string {
  const { pathname: from } = useLocation()
  const to = nextLink
  let next = to
  if (to) {
    const from_pathname = normalizePathname(from)
    const from_language_tag = languageTagInPathname(from_pathname)
    const to_pathname = normalizePathname(to)
    const to_language_tag = languageTagInPathname(to_pathname)

    //  /en/foo → /bar  |  /de/foo → /bar
    if (!to_language_tag)
      next = `/${from_language_tag}${to_pathname}`

    //  /foo → /en/bar
    else if (to_language_tag === sourceLanguageTag && !from_language_tag)
      next = to_pathname.slice(to_language_tag.length + 1)

    //  /de/foo → /en/bar  |  /foo → /de/bar
    else
      next = to_pathname
  }
  return next
}
