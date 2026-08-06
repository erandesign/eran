import { I18n, i18n } from '~/components/i18n'

/** */
export default function First() {
  return (
    <div class="relative pb-50 pt-120">
      <I18n
        class="m-0 px-150 text-72 text-black leading-93 tracking-17"
        lang-en="text-60 tracking-7 font-mm [&>*:first-child]:font-ml"
        i18n={i18n.concat_title}
        component="h1"
      />
      <img class="absolute right-150 top-120 w-11.25" src="/images/logo_side_dark.svg" />
      <div class="mt-265 overflow-hidden text-24 leading-30 tracking-32 text-oneline" lang-en="tracking-16">
        <I18n
          class="marquee animate-16s px-6em py-25"
          i18n={i18n.subTitles().concat(i18n.subTitles()).join('   /   ')}
          component="div"
        />
      </div>
    </div>
  )
}
