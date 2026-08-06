import { A, useParams } from '@solidjs/router'
import { ErrorBoundary, For, Show, Suspense, createEffect, createResource } from 'solid-js'
import { getCurrType } from './header'
import { I18n, i18n } from '~/components/i18n'
import { getAllWorks } from '~/serverAction/works'
import Image from '~/components/Image'

const n = 5
/** 作品列表 */
export default function WorkList() {
  const param = useParams()
  const [data] = createResource(() => ({ lang: param.lang, type: getCurrType() }), getAllWorks)

  return (
    <div class="grid grid-cols-14 min-h-80vh px-150 pb-172">
      <ErrorBoundary fallback="error">
        <Suspense fallback="">
          <Show when={data()?.length} fallback={<I18n i18n={i18n.noData} class="col-span-full h-full f-c/c text-16 text-gray" />}>
            <For each={data() || []}>
              {(item, i) => (
                <div classList={{
                  'col-1/span9 mt-350': i() % n === 0,
                  'col-span4/-1 mt-132': i() % n === 1,
                  'col-1/span4 mt-132': i() % n === 2,
                  'col-span9/-1 mt-350': i() % n === n - 2,
                  'col-span-full mt-132': i() % n === n - 1,
                }}
                >
                  <div
                    class="grid-b/i mb-14 gap-x-25 gap-y-12"
                    classList={{
                      'grid-cols-[auto_auto_1fr]': [0, 3, 4].includes (i() % n),
                      'justify-items-end': i() % n === 1,
                    }}
                  >
                    <I18n
                      class="block w-full overflow-hidden text-ellipsis text-20 leading-none tracking-7"
                      classList={{
                        'text-right': i() % n === 1,
                      }}
                      light="text-#030303"
                      dark="text-white"
                      i18n={item.name}
                    />
                    <I18n class="text-14 leading-none tracking-5 text-oneline" light="text-#6B6B6B" dark="text-white/48" i18n={item.address} />
                    <I18n
                      class="text-14 leading-none tracking-5 text-oneline"
                      light="text-#6B6B6B"
                      dark="text-white/48"
                      classList={{ 'text-end': [0, 3, 4].includes (i() % n) }}
                      i18n={i18n.subTitles()[i18n.subTitles({}, { lang: 'zh' }).findIndex(f => f === item.type)]}
                    />
                  </div>
                  <A href={`../work/${item.id}`}>
                    <Image
                      class="w-full object-cover object-center"
                      classList={{
                        'h-630': i() % n === 0 || i() % n === 3,
                        'h-636': i() % n === 1 || i() % n === 2,
                        'h-800': i() % n === n - 1,
                      }}
                      src={item.cover}
                      alt={item.name}
                      loading="lazy"
                    />
                  </A>
                </div>
              )}
            </For>
          </Show>

        </Suspense>
      </ErrorBoundary>
    </div>
  )
};
