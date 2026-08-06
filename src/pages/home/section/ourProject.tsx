import { useNavigate } from '@solidjs/router'
import { For } from 'solid-js'
import { I18n, i18n } from '~/components/i18n'

/**  */
export default function OurProject() {
  const navigator = useNavigate()
  return (
    <div class="grid-s/i e-grid px-150 py-132">
      <I18n
        class="col-1/span10 text-36 font-semibold tracking-36 font-[semibold]"
        i18n={i18n.our_project}
      />

      <div class="col-span4/-1 f-i/c flex-col">
        <For each={[i18n.subTitle_all(), ...i18n.subTitles()]}>
          {item => (
            <div
              class="h-46 flex-c/s cursor-pointer gap-5"
              hover="[&_img]:h-46 [&_span]:text-#000"
              onClick={() => {
                navigator('works')
              }}
            >
              <span class="w-120 text-16 text-#6B6B6B tracking-4">{item}</span>
              <img class="h-0 w-46" src="/images/cursor_goto.svg" />
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
