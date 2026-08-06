import type { Component } from 'solid-js'
import { For, createSignal } from 'solid-js'
import { I18n, i18n } from '~/components/i18n'
import Marquee from '~/components/marquee'

// #region WWD
export const Wwd: Component = () => {
  const [hoverIndex, setHoverIndex] = createSignal(0)
  return (
    <div class="px-150 pb-164 pt-300">
      <I18n class="text-48 font-bold tracking-23" i18n={i18n.about_wwd_title} />
      <div class="relative mt-50 f-s/sb">
        <div class="h-315 w-560" />
        <div class="w-600 flex flex-col gap-24">
          <For each={i18n.about_wwd_list()}>
            {(item, i) => (
              <div
                class="f-c/ gap-12 [&>*]:transition-all-500"
                classList={{ '[&>img]:left-0 [&>img]:top-0 [&>.n,&>img]:opacity-100 [&>.t]:text-#6B6B6B [&>.t]:text-24 [&>.t]:ml-0 [&>.t]:mb-12': i() === hoverIndex() }}
                onMouseEnter={() => setHoverIndex(i())}
              >
                <img class="absolute left-10% top-25% h-315 w-560 opacity-0" src={item.img} />
                <span class="n w-72 text-48 text-#6B6B6B font-bold opacity-0 text-oneline">
                  {`0${i() + 1}`}
                </span>
                <I18n
                  class="t ml-100 text-16 leading-30 tracking-5"
                  lang-en="tracking-1 text-14"
                  i18n={item.title}
                />
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}
// #endregion

/** 创始人人介绍 */
export default function Founder() {
  return (
    <div class="bg-white pb-80 pt-120">
      <div class="f-e/sb gap-120 px-150">
        <I18n
          class="block w-670 overflow-hidden text-16 text-#282828 leading-29 tracking-5"
          lang-en="tracking-1 text-14 [&>span]:font-mb"
          i18n={i18n.about_founder_desc}
        />
        <img class="h-600 w-1030" src={i18n.about_founder_img()} />
      </div>
      {/*  */}
      <div class="f-e/s flex-col px-150 pt-8">
        <I18n
          class="text-32 leading-48 tracking-11"
          lang-en="tracking-3"
          i18n={i18n.about_founder_user}
        />
        <I18n
          class="text-16 text-#282828 leading-24 tracking-5"
          lang-en="tracking-1"
          i18n={i18n.about_founder_user_job}
        />
        {/* <I18n
          class="mt-70 text-right text-16 text-#282828 leading-24 tracking-5"
          lang-en="text-14 tracking-1 mr-300"
          i18n={i18n.about_founder_desc}
        /> */}
      </div>
      {/* <div class="f-c/sb px-150 pt-300">
        <img class="h-125 w-325" src="/images/logo_2line.svg" />
        <div class="pr-64">
          <For each={i18n
            .concat_information()
            .slice(0, 2)}
          >
            {item => (
              <div class="mt-42 flex-s/s flex-col gap-8">
                <I18n class="text-14 text-#000/44 tracking-5" i18n={item.label} />
                <I18n class="text-22 text-black tracking-5" i18n={item.value} />
              </div>
            )}
          </For>
        </div>
      </div> */}
      {/* 公司介绍 */}
      <div class="f-e/sb gap-115 px-150 pt-80">
        <img class="h-465 w-825" src={i18n.about_company_img()} />
        <span class="">
          {/* <img class="mr-8 h-14" src="/images/logo_tab_dark.svg" /> */}
          <I18n
            class="block w-670 text-16 text-#282828 leading-29 tracking-5"
            lang-en="tracking-1 text-14 [&>span]:font-mb"
            i18n={i18n.about_company_desc}
          />
        </span>
      </div>
      {/* 用户信息-滚动 */}
      {/* <div class="overflow-hidden pt-250">
        <Marquee />
      </div> */}
      {/* wwd */}
      {/* <Wwd /> */}
    </div>
  )
};
