import { createMemo } from 'solid-js'

/** 安全转义 JSON-LD 字符串 */
function safeJson(data: object) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

/** JSON-LD 结构化数据 - 组织 */
export function OrganizationJsonLd() {
  const json = createMemo(() => safeJson({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ERAN DESIGN',
    alternateName: 'ERAN DESIGN 空间设计事务所',
    url: 'https://www.erandesign.cn/',
    logo: 'https://www.erandesign.cn/images/logo_tab.svg',
    email: 'info@erandesign.cn',
    telephone: '+86-185-6565-0856',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '深圳',
      addressCountry: 'CN',
    },
    knowsAbout: ['地产&办公', '终端SI', '展示道具', '品牌VI', '网站&APP'],
  }))
  return <script type="application/ld+json" innerHTML={json()} />
}

export interface WorkJsonLdProps {
  name: string
  description: string
  address: string
  investor: string
  area: string
  timeStart: string
  timeEnd: string
  image: string
  id: number
  lang: string
}
/** JSON-LD 结构化数据 - 作品 */
export function WorkJsonLd(props: WorkJsonLdProps) {
  const json = createMemo(() => safeJson({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: props.name,
    description: (props.description || '').slice(0, 200),
    creator: { '@type': 'Organization', name: 'ERAN DESIGN' },
    locationCreated: props.address,
    image: `https://www.erandesign.cn${props.image}`,
    dateCreated: props.timeStart,
    dateModified: props.timeEnd,
    spatialCoverage: props.address,
    url: `https://www.erandesign.cn/${props.lang || 'zh'}/work/${props.id}`,
    additionalProperty: [
      { '@type': 'PropertyValue', name: '业主', value: props.investor },
      { '@type': 'PropertyValue', name: '面积', value: props.area },
    ],
  }))
  return <script type="application/ld+json" innerHTML={json()} />
}

export default OrganizationJsonLd
