import { For } from 'solid-js'
import ConcatForm from './concatForm'
import { I18n, i18n } from '~/components/i18n'

/**  */
export default function ConcatBlock() {
  return (
    <div
      class="grid-e/i e-grid bg-black bg-bottom px-150 pb-66 pt-132 text-white bg-full-x"
      style={{ 'background-image': `url("/images/letstalk.svg")` }}
    >
      <ConcatForm class="col-1/span6" />
      <div class="col-span4/-1 flex flex-col gap-66">
        <For each={i18n.concat_information()}>
          {(item, i) => (
            <div class="flex flex-col">
              <I18n i18n={item.label} class="text-14 text-#858585 leading-none tracking-3 font-mr" />
              <I18n i18n={item.value} class="mt-16 text-20 text-white leading-none tracking-3" classList={{ 'font-mr': i() !== 2 }} />
            </div>
          )}
        </For>
      </div>
      {/* <div class="col-span-full h-530 f-e/sb pb-60"> */}
      <div class="col-1/span10 flex flex gap-12 text-12 text-#858585 tracking-3">
        <I18n i18n={i18n.concat_copyright} class="font-mr" />
      </div>

      <div class="col-span4/-1 mt-132">
        <I18n i18n={i18n.concat_label} class="text-14 text-#969696 tracking-3" />

        <div class="mt-33 flex gap-40">
          <For
            each={[
              { img: i18n.concat_qr_1(), text: i18n.concat_qr_text_1() },
              { img: i18n.concat_qr_2(), text: i18n.concat_qr_text_2() },
            ]}
          >
            {item => (
              <div class="flex-c/c flex-col">
                <img class="mb-10 s-110" src={`/images/${item.img}`} />
                <span class="text-12 text-white tracking-2.5">{item.text}</span>
              </div>
            )}
          </For>
        </div>
      </div>
      {/* </div> */}
      {/* <img class="col-span-full h-182 w-full" src="/images/letstalk.svg" /> */}
    </div>
  )
}
