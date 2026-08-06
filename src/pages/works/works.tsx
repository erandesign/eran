import Header from './section/header'
import WorkList from './section/workList'
import Footer2top from '~/components/Footer2top'
import SiteTitle from '~/components/SiteTitle'
import { Thememain, theme } from '~/components/ThemeChange'
import ConcatBlock from '~/components/concatBlock/concatBlock'
import { i18n } from '~/components/i18n'
import Nav from '~/components/nav/nav'

/** 项目列表 */
export default function Works() {
  return (
    <Thememain class="min-h-100vh" id="works-main">
      <div class="s-full" light="bg-white" dark="bg-#1E1E1E">
        <SiteTitle>{i18n.nav_p_1()}</SiteTitle>
        <Nav sticky class="px-150" theme={theme()} />
        <Header />
        <WorkList />
        <ConcatBlock />
        <Footer2top scroller="html" />
      </div>
    </Thememain>
  )
};
