/* eslint-disable unused-imports/no-unused-vars */
import { Title } from '@solidjs/meta'
import type { Component } from 'solid-js'
import { i18n } from './i18n'

export interface SiteTitleProps {
  children?: string
}
/** 网站标题 */
export default (function (props) {
  const siteTitle = i18n.title()
  // return <Title>{props.children ? `${props.children} | ${siteTitle}` : siteTitle}</Title>
  return <Title>{ siteTitle}</Title>
} satisfies Component<SiteTitleProps>)
