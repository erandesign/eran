import Detail from './section/detail'
import NextWork from './section/nextWork'
import Footer2top from '~/components/Footer2top'
import { ThemeChange, Thememain, theme } from '~/components/ThemeChange'
import ConcatBlock from '~/components/concatBlock/concatBlock'
import { i18n } from '~/components/i18n'
import Nav from '~/components/nav/nav'

/** 项目详细介绍 */
export default function Details() {
  return (
    <Thememain class=" " id="workDetails-main">
      <div class="s-full" dark="bg-black text-white" light="bg-white text-black">
        <Nav
          sticky
          class="px-150"
          // 不加会影响主题判断
          themeEle={<ThemeChange class="hidden" />}
          theme={theme()}
        />
        <Detail />
        <NextWork />
        <ConcatBlock />
        <Footer2top scroller="html" />
      </div>
    </Thememain>
  )
};
