import { I18n, i18n } from '~/components/i18n'
import OurProject from '~/pages/home/section/ourProject'

/**  */
export default function Desc() {
  return (
    <div>
      <div class="flex flex-col pb-100 pl-860 pt-150">
        <I18n class="text-16 text-#656565 tracking-24" lang-en="tracking-1" i18n={i18n.desc_1_1} />
        <I18n class="mt-24 text-36 text-#656565 tracking-12" lang-en="tracking-3" i18n={i18n.desc_1_2} />
      </div>
      <OurProject />
    </div>
  )
}
