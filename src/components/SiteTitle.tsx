import { Title } from '@solidjs/meta'
import type { Component } from 'solid-js'
import { i18n } from './i18n'

export interface SiteTitleProps {
  children?: string
  description?: string
  image?: string
}
/** 网站标题：子页面标题 | 站点名 */
export default (function (props) {
  const siteTitle = i18n.title()
  const pageTitle = () => props.children ? `${props.children} | ${siteTitle}` : siteTitle
  return (
    <>
      <Title>{pageTitle()}</Title>
      <meta name="description" content={props.description || i18n.seo_desc()} />
    </>
  )
} satisfies Component<SiteTitleProps>)
