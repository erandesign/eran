import { For } from 'solid-js'
import { I18n, i18n } from '~/components/i18n'
import TaiChi from '~/components/taiChi'

/**  */
export default function Desc() {
  return (
    <div class="leading-none">
      <TaiChi>
        <div
          class="mx-150 mt-175 h-126 w-auto f-i/c flex-col bg-right bg-full-y"
          style={{ 'background-image': 'url("/images/bg_desc_text.svg")' }}
        >
          <I18n class="text-16 text-#656565 tracking-24" lang-en="tracking-1" i18n={i18n.desc_1_1} />
          <I18n class="mt-24 text-36 text-#656565 tracking-12" lang-en="tracking-3" i18n={i18n.desc_1_2} />
        </div>
      </TaiChi>

      <div class="overflow-hidden bg-black text-white">
        <div
          class="relative mt-120 h-1200 w-1517 bg-full"
          style={{ 'background-image': 'url(\'/images/circle_big.svg\')' }}
        >
          <img class="absolute right-365 top-60 s-67" src="/images/dot_light.webp" />
          <div
            class="absolute right-382 top-183 s-235 f-c/c text-16 tracking-5 bg-full"
            lang-en="tracking-1"
            style={{ 'background-image': 'url(\'/images/circle_left.svg\')' }}
          >
            <I18n class="text-center leading-19" i18n={i18n.desc_c_1} />
          </div>
          <div
            class="absolute right-1060 top-691 s-235 f-c/c text-16 tracking-5 bg-full"
            lang-en="tracking-1"
            style={{ 'background-image': 'url(\'/images/circle_left.svg\')' }}
          >
            <I18n class="text-center leading-19" i18n={i18n.desc_c_2} />
          </div>
          <div
            class="absolute right-592 top-760 s-235 f-c/c text-16 tracking-5 bg-full"
            lang-en="tracking-1"
            style={{ 'background-image': 'url(\'/images/circle_left.svg\')' }}
          >
            <I18n class="text-center leading-19" i18n={i18n.desc_c_3} />
          </div>
          <div
            class="absolute right-763 top-300 s-440 f-c/c flex-col text-24 tracking-8 bg-full"
            lang-en="tracking-1"
            style={{ 'background-image': 'url(\'/images/circle_main.svg\')' }}
          >
            <I18n class="mb-18 text-12 tracking-4" i18n={i18n.desc_c_m_1} />
            <I18n class="text-center leading-30" i18n={i18n.desc_c_m_2} />
          </div>

          {/* line */}
          <div
            class="absolute left-670 top-535 h-1.25 w-420 bg-white after:content-['']"
            after=" block s-8 rd-full bg-white absolute right-0 -top-3"
          />
          {/*  */}
          <div class="absolute left-1145 top-524 flex flex-col gap-50 leading-none">
            <For each={[i18n.desc_l_1, i18n.desc_l_2, i18n.desc_l_3, i18n.desc_l_4, i18n.desc_l_5]}>
              {(item, i) => (
                <I18n
                  class="text-16 text-#fff tracking-5"
                  lang-en="text-14 tracking-1"
                  style={{ '--un-text-opacity': 1 - i() * 0.2 }}
                  i18n={item}
                />
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  )
}
