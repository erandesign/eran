import type { JSX } from 'solid-js'
import { For } from 'solid-js'
import { I18n, i18n } from './i18n'

export interface TaiChiProps {
  children: JSX.Element
}

/** 黑白 半圆块 */
export default function TaiChi(props: TaiChiProps) {
  return (
    <>
      {/* 白 */}
      <div class="relative h-650 overflow-hidden bg-white">
        <div
          class="absolute bottom-0 right-50% z-0 h-480 w-880 f-c/e flex-col pb-80 pl-70 bg-full"
          style={{ 'background-image': 'url("/images/bg_desc_white.svg")' }}
        >
          <div class="absolute bottom-214 left-360 s-18 rd-full bg-black" />
          <I18n class="text-12 text-#000 tracking-4" i18n={i18n.desc_2_1} />
          <I18n class="mt-18 text-24 text-#202020 tracking-8" i18n={i18n.desc_2_2} lang-en="tracking-2" />
        </div>
        {props.children}
      </div>
      {/* 黑 */}
      <div class="relative h-400 bg-black py-1 text-white">
        <div
          class="absolute left-50% top-0 h-518 w-880 f-c/s flex-col pr-65 pt-80 bg-full"
          style={{ 'background-image': 'url("/images/bg_desc_dark.svg")' }}
        >
          <div class="absolute left-153 top-157 s-18 rd-full bg-white" />
          <I18n class="text-12 tracking-4" i18n={i18n.desc_3_1} />
          <I18n class="mt-18 text-24 tracking-8" i18n={i18n.desc_3_2} lang-en="tracking-2" />
        </div>

        <div class="mx-auto mt-350 text-center text-12 font-300 tracking-16" lang-en="tracking-14">
          <For each={i18n.subTitles()}>
            {(item, i) => (
              <>
                {i() !== 0 && <span class="mx-42">/</span>}
                {item}
              </>
            )}
          </For>
        </div>
      </div>
    </>
  )
}
