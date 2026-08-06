import { useNavigate } from '@solidjs/router'
import type { JSX } from 'solid-js'
import { createSignal } from 'solid-js'
import { Dynamic, getRequestEvent, isServer } from 'solid-js/web'
import type {
  AvailableLanguage,
} from '~/i18n'
import {
  adapter,
  availableLanguage,
  currentLanguage,
  defaultLanguage,
  i18n,
  setLanguage,
} from '~/i18n'

//
adapter(...createSignal(defaultLanguage))

export { i18n }
type IMessage = typeof i18n
type IMessageKeys = keyof IMessage

export type AvailableLanguageTag = AvailableLanguage
export const availableLanguageTags = availableLanguage
export const sourceLanguageTag = defaultLanguage
export const languageTag = currentLanguage

type I18nProps<T extends IMessageKeys> = JSX.HTMLAttributes<HTMLSpanElement> & {
  options?: Parameters<IMessage[T]>[1]
  i18n: IMessage[T] | string
  component?: keyof JSX.IntrinsicElements
} & Parameters<IMessage[T]>[0]

/** i18n 元素，默认为 span */
export function I18n<T extends IMessageKeys>(props: I18nProps<T>) {
  const setProps: any = {}
  Object.entries(props).forEach(([k, v]) => {
    if (k.includes('lang-') || ['dark', 'light', 'after'].includes(k))
      setProps[k] = v
  })

  const text = () => {
    if (typeof props.i18n === 'string')
      return handelText(props.i18n)
    if (typeof props.i18n === 'function')
      return handelText(props.i18n(props as any, props.options))
    return '?'
  }

  return (
    <Dynamic
      {...setProps}
      ref={props.ref}
      class={props.class}
      classList={props.classList}
      style={props.style}
      id={props.id}
      component={props.component || 'span'}
      // eslint-disable-next-line solid/no-innerhtml
      innerHTML={text()}
    />
  )
}

export function handelText(text: any): any {
  if (typeof text !== 'string')
    return text

  return text.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;')
}

/**
 * Normalize a pathname.
 * (e.g. "/foo" → "/foo")
 * (e.g. "foo" → "/foo")
 */
export function normalizePathname(pathname: string): string {
  return pathname[0] === '/' ? pathname : `/${pathname}`
}

/**
 * Get the language tag from the URL.
 *
 * @param pathname The pathname to check. (e.g. "/en/foo") (use {@link normalizePathname} first)
 * @param all_language_tags All available language tags. (From paraglide, e.g. "en", "de")
 * @returns The language tag from the URL, or `undefined` if no language tag was found.
 */
export function languageTagFromPathname<T extends string>(
  pathname: string,
  all_language_tags: readonly T[],
): T | undefined {
  for (const tag of all_language_tags) {
    if (pathname.startsWith(tag, 1) && (pathname.length === tag.length + 1 || pathname[tag.length + 1] === '/'))
      return tag
  }
  return undefined
}

/**
 * Changes a provided url to include the correct language tag.
 *
 * To be used on `<A href="...">` components to make sure that the anchor tag will link to the correct language, when server side rendered.
 *
 * **Use only on internal links. (e.g. `<A href="/foo">` or `<A href="/en/foo">`)**
 *
 * @param pathname The pathname to link to. (e.g. "/foo/bar")
 * @param page_language_tag The current language tag. (e.g. "en")
 * @param available_language_tags All available language tags. (From paraglide, e.g. "en", "de")
 * @param source_language_tag The source language tag. (From paraglide, e.g. "en")
 * @returns The translated pathname. (e.g. "/en/bar")
 */
export function translateHref<T extends string>(
  pathname: string,
  page_language_tag: T,
  available_language_tags: readonly T[],
): string {
  const to_normal_pathname = normalizePathname(pathname)
  const to_language_tag = languageTagFromPathname(to_normal_pathname, available_language_tags)

  return to_language_tag
    ? to_normal_pathname.replace(to_language_tag, page_language_tag)
    : `/${page_language_tag}${to_normal_pathname}`
}

/**
 * Returns the current pathname. From request on server, from window on client.
 *
 * Use with {@link languageTagFromPathname} to get the language tag from the URL.
 *
 * @example
 * ```ts
 * const pathname = useLocationPathname()
 * const language_tag = languageTagFromPathname(pathname, all_language_tags)
 * ```
 */
export function locationPathname(): string {
  return isServer
    ? new URL(getRequestEvent()!.request.url).pathname
    : window.location.pathname
}

/**
 * Get the language tag from the URL.
 *
 * @param pathname The pathname to check. (e.g. "/en/foo")
 * @returns The language tag from the URL, or `undefined` if no language tag was found.
 */
export function languageTagInPathname(pathname: string): AvailableLanguageTag | undefined {
  return languageTagFromPathname(pathname, availableLanguageTags)
}

/**
 * Get the language tag from the URL.
 */
export function locationLanguageTag(): AvailableLanguageTag {
  const pathname = locationPathname()
  return languageTagInPathname(pathname) ?? sourceLanguageTag
}

export function setLanguageTag(newTag: AvailableLanguageTag) {
  setLanguage(newTag)
}

export function useLanguage() {
  const navigate = useNavigate()

  const languageTag = locationLanguageTag
  const setLanguageTag = (newTag: AvailableLanguageTag) => {
    setLanguage(newTag)

    navigate(normalizePathname(newTag))
  }
  return { languageTag, setLanguageTag }
}
