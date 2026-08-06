import { For } from 'solid-js'
import { isDev } from 'solid-js/web'
import { I18n, i18n, languageTag } from '~/components/i18n'
import Nav from '~/components/nav/nav'

export interface CoverProps {}
/** 首页-首屏 */
export default function Cover() {
  return (
    <section class="h-1080 flex flex-col overflow-hidden bg-full 2xl:h-100vh" style={{ 'background-image': 'url(\'/images/cover.webp\')' }} id="home-cover">
      {/* 背景，暂时用图片 */}
      <video
        class="absolute z-0 h-1080 w-full object-cover 2xl:h-100vh"
        autoplay={!import.meta.env.DEV}
        muted
        loop
        poster="/images/cover.webp"
      >
        <source src="/video/cover.webm" type="video/webm" />
      </video>

      {/* 内容 */}
      <div class="relative z-1 grid grid-rows-[auto_auto_1fr_auto] e-grid w-full flex-1 bg-black/18 p-1 px-150">
        {/* logo */}
        <img class="absolute right-130 top-150 z-11 w-12" src="/images/logo_side.svg" id="cover-logo-y" />

        {/* 文本 */}
        <I18n
          class="col-span-full col-start-7 mt-160 block text-12 text-white leading-30 tracking-3"
          lang-en="tracking-1"
          i18n={i18n.home_1_desc}
          id="cover-desc"
        />
        <h1
          class="col-span-full mt-130 flex-s/s flex-col text-72 text-white font-normal leading-none tracking-25"
          lang-en="text-60 tracking-7 font-ml"
          id="cover-title"
        >
          <For each={i18n
            .home_1_title()
            .split('\n')}
          >
            {(t, i) => (
              <span
                class="my-21 block"
                lang-en="my-16"
                classList={{
                  // 'ml-170': i() === 2 && languageTag() !== 'zh',
                  'relative lang-zh:after:(content-["®️"] absolute bottom-55% right-48 text-40)': i() === 1,
                  'lang-en:font-mm': i() === 1 || i() === 2,
                }}
              >
                {t}
              </span>
            )}
          </For>
        </h1>
        <div />
        <Nav sticky class="" stickyClass="px-150" theme="dark" />
      </div>

    </section>

  )
}
