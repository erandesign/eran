import First from './section/first'
import Desc from './section/desc'
import SiteTitle from '~/components/SiteTitle'
import SeoMeta from '~/components/SeoMeta'
import { i18n } from '~/components/i18n'
import Nav from '~/components/nav/nav'
import ConcatBlock from '~/components/concatBlock/concatBlock'
import Footer2top from '~/components/Footer2top'

/** 联系我们 */
export default function Concat() {
  return (
    <main id="concat-main">
      <SiteTitle>{i18n.nav_p_3()}</SiteTitle>
      <SeoMeta />
      <Nav sticky class="px-150" />
      <First />
      <ConcatBlock />
      <Desc />
      <Footer2top scroller="html" />
    </main>
  )
}
