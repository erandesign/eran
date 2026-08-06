import { useSubmission } from '@solidjs/router'
import { For, createEffect } from 'solid-js'
import { toast } from '@thinke/toast'
import { I18n, i18n } from '~/components/i18n'
import { saveConcatInfo } from '~/serverAction/concat'

/** 信息表单 */
export default function ConcatForm(props: {
  class?: string
}) {
  let $from: HTMLFormElement
  const echoing = useSubmission(saveConcatInfo)
  createEffect(() => {
    if (!echoing.pending && echoing.result?.code === 0) {
      toast.success('提交成功！')
      $from.reset()
      echoing.clear()
    }
  })
  return (
    <form ref={$from!} method="post" class={`flex flex-col ${props.class}`} action={saveConcatInfo}>
      <I18n i18n={i18n.concat_t} class="text-32 tracking-7 text-oneline" lang-en="tracking-3" />
      <input
        name="phone"
        required
        placeholder={i18n.concat_p()}
        class="mb-88 mt-33 b-b-.5 b-#fff b-none b-b-solid bg-transparent text-24 text-white leading-90 tracking-5 placeholder:text-#4E4E4E placeholder:tracking-15"
        autocomplete="off"
        focus="outline-none shadow-none"
      />
      <I18n i18n={i18n.concat_subt} class="text-16 tracking-4" lang-en="tracking-1" />
      <div class="f-c/s flex-wrap gap-y-22 pt-33">
        <For each={[...i18n.subTitles(), i18n.subTitle_other()]}>
          {item => (
            <>
              <input
                class="absolute s-0 opacity-0 [&:checked+label]:bg-white [&:checked+label]:text-black"
                type="radio"
                name="info"
                id={item}
                value={item}
              />
              <label
                for={item}
                class="mr-27 h-52 f-c/c cursor-pointer rd-100 bg-#2C2C2C px-28 text-14 tracking-3 transition-300"
                lang-en="tracking-1"
                hover="bg-white text-black"
              >
                {item}
              </label>
            </>
          )}
        </For>
      </div>
      <button
        class="mt-30 h-60 f-c/c flex-shrink-1 cursor-pointer self-start rd-60 b-none bg-white px-46 text-20 text-black tracking-6 active:bg-#ddd hover:bg-#eee"
        lang-en="tracking-2"
        type="submit"
      >
        <I18n i18n={i18n.concat_submit} />
        <img class="ml-10 s-12" src="/images/ic_submit.svg" />
      </button>
    </form>
  )
}
