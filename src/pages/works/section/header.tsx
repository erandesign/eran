import { For, createSignal } from 'solid-js'
import { ThemeChange } from '~/components/ThemeChange'
import { I18n, i18n } from '~/components/i18n'

const [currType, setCurrType] = createSignal(0)
const allType = () => [i18n.subTitle_all(), ...i18n.subTitles()]
const allZHType = () => [i18n.subTitle_all(), ...i18n.subTitles({}, { lang: 'zh' })]

export const getCurrType = () => currType() > 0 ? allZHType()[currType()] : ''

/** 作品头部 */
export default function Header() {
  return (
    <div class="relative grid e-grid px-150">
      {/* logo */}
      <img class="invisible absolute right-150 top-132 z-11 w-12" light="visible" src="/images/logo_side_dark.svg" id="cover-logo-y" />
      <img class="invisible absolute right-150 top-132 z-11 w-12" dark="visible" src="/images/logo_side.svg" id="cover-logo-y" />
      {/* title */}
      <I18n
        light="text-black/36 [&>span]:text-black"
        dark="text-white/36 [&>span]:text-white"
        class="col-span-full my-132 text-72 font-normal leading-94 tracking-17"
        lang-en="text-60 tracking-7"
        i18n={i18n.works_title}
        component="h1"
      />
      <div class="col-1/span9 f-c/sb gap-x-88">
        <For each={allType()}>
          {(item, i) => (
            <span
              class="cursor-pointer text-16 tracking-4 transition-500 text-oneline"
              light="text-#6B6B6B"
              dark="text-#fff/48"
              classList={{
                'dark:text-#fff! light:text-#000!': i() === currType(),
              }}
              onClick={[setCurrType, i]}
            >
              {item}
            </span>
          )}
        </For>
      </div>
      <ThemeChange />
    </div>
  )
};
