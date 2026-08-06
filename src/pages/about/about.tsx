import Founder from './founder'
import Footer2top from '~/components/Footer2top'
import SiteTitle from '~/components/SiteTitle'
import ConcatBlock from '~/components/concatBlock/concatBlock'
import { I18n, i18n } from '~/components/i18n'
import Nav from '~/components/nav/nav'
import TaiChi from '~/components/taiChi'

/**  */
export default function About() {
  return (
    <main id="about-main">
      <SiteTitle>{i18n.nav_p_2()}</SiteTitle>
      <Nav sticky class="px-150" />
      <TaiChi>
        <I18n
          class="pl-150 text-72 tracking-17"
          lang-en="text-60 tracking-7 font-ml [&>span]:font-mm"
          i18n={i18n.about_title}
          component="h1"
        />
      </TaiChi>
      <div class="h-42 bg-black">1</div>
      <Founder />
      <ConcatBlock />
      <Footer2top scroller="html" />
    </main>
  )
}
