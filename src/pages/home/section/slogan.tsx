import { I18n, i18n } from '~/components/i18n'

/** 口号 */
export default function Slogan() {
  return (
    <div class="h-600 w-full bg-black" id="home-slogan">
      <img class="absolute right-130 top-150 z-11 w-12" src="/images/logo_side.svg" />

      <h2
        class="relative m-0 block s-full f-c/c flex-col gap-42 p-1 text-32 text-#616161 font-normal leading-none tracking-11"
        lang-en="text-30 tracking-3"
      >
        <I18n i18n={i18n.slogan_1} id="home-slogan-1" class="block" />
        <I18n i18n={i18n.slogan_2} id="home-slogan-2" class="block overflow-hidden" />
        <I18n i18n={i18n.slogan_3} id="home-slogan-3" class="block text-white" />
        <I18n i18n={i18n.slogan_4} id="home-slogan-4" class="block overflow-hidden" />
      </h2>
    </div>
  )
}
