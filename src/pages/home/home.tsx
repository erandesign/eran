import Cover from './section/cover'
import FirstIn from './section/firstIn'
import PhotoAlbum from './section/photoAlbum'
import Slogan from './section/slogan'
import Desc from './section/desc'
import Customer from './section/customer'
import { i18n } from '~/components/i18n'
import SiteTitle from '~/components/SiteTitle'
import SeoMeta from '~/components/SeoMeta'
import { OrganizationJsonLd } from '~/components/JsonLd'
import Concat from '~/components/concatBlock/concatBlock'
import Footer2top from '~/components/Footer2top'

/** 首页 */
export default function Home() {
  return (
    <>
      <SiteTitle>{i18n.title_home()}</SiteTitle>
      <SeoMeta />
      <OrganizationJsonLd />
      <main id="home-main" class="relative snap-x snap-proximity overflow-auto h-dvh">
        {/* 动画 */}
        {/* <Gsap /> */}

        {/* dom */}
        <FirstIn />
        <Cover />
        <Slogan />
        <PhotoAlbum />
        <Desc />
        <Customer />
        <Concat />
        <Footer2top scroller="#home-main" />
      </main>
    </>
  )
}
