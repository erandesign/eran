import { Meta } from '@solidjs/meta'
import type { Component } from 'solid-js'
import { i18n } from './i18n'
import { locationPathname } from './i18n'

export interface SeoMetaProps {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}

/**
 * Open Graph + Twitter 元标签
 * 默认使用全站 title/description，path 为空时自动取当前 URL 路径
 */
export default (function (props: SeoMetaProps) {
  const domain = 'https://www.erandesign.cn'
  const title = () => props.title || i18n.title()
  const description = () => props.description || i18n.seo_desc()
  const currentPath = () => {
    try {
      return locationPathname() || '/zh/'
    }
    catch {
      return props.path || '/zh/'
    }
  }
  const url = () => `${domain}${props.path || currentPath()}`
  const image = () => `${domain}${props.image || '/images/cover.webp'}`

  return (
    <>
      <Meta property="og:site_name" content="ERAN DESIGN" />
      <Meta property="og:title" content={title()} />
      <Meta property="og:description" content={description()} />
      <Meta property="og:url" content={url()} />
      <Meta property="og:type" content={props.type || 'website'} />
      <Meta property="og:image" content={image()} />
      <Meta property="og:locale" content="zh_CN" />
      <Meta property="og:locale:alternate" content="en_US" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={title()} />
      <Meta name="twitter:description" content={description()} />
      <Meta name="twitter:image" content={image()} />
    </>
  )
} satisfies Component<SeoMetaProps>)
