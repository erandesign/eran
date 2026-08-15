import { A, useParams, useSearchParams } from '@solidjs/router'
import { ErrorBoundary, For, Show, Suspense, createMemo, createResource } from 'solid-js'
import { I18n, i18n } from '~/components/i18n'
import { getAllWorks } from '~/serverAction/works'
import Image from '~/components/Image'
import Reveal from '~/components/Reveal'
import { cacheWorks } from '~/components/workCache'

const n = 5
/** 作品列表 */
export default function WorkList() {
  const param = useParams()
  const [params] = useSearchParams()
  // 一次性加载全部公开作品（type=''），分类切换纯前端过滤，避免 server-fn 431 卡顿
  const [allData] = createResource(() => ({ lang: param.lang, type: '' }), getAllWorks)
  // 数据到达后写入共享缓存（详情页复用，避免重复请求）
  createMemo(() => {
    const list = allData()
    if (list?.length)
      cacheWorks(param.lang, list)
  })
  // 按 URL type 参数前端过滤（空 = 全部）
  const data = createMemo(() => {
    const t = typeof params.type === 'string' ? params.type : ''
    const list = allData() || []
    return t ? list.filter(v => v.type === t) : list
  })

  return (
    <div class="grid grid-cols-14 min-h-80vh px-150 pb-172">
      <ErrorBoundary fallback="error">
        <Suspense fallback="">
          <Show when={data().length} fallback={<I18n i18n={i18n.noData} class="col-span-full h-full f-c/c text-16 text-gray" />}>
            <For each={data()}>
              {(item, i) => (
                <Reveal classList={{
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
                  <A href={`../work/${item.id}`} class="group relative block overflow-hidden">
                    <Image
                      class="w-full object-cover object-center transition-transform-500 group-hover:scale-105"
                      classList={{
                        'h-630': i() % n === 0 || i() % n === 3,
                        'h-636': i() % n === 1 || i() % n === 2,
                        'h-800': i() % n === n - 1,
                      }}
                      src={item.cover}
                      alt={item.name}
                      loading="lazy"
                    />
                    {/* hover 提示层 */}
                    <div class="pointer-events-none absolute inset-0 flex items-end bg-black/0 p-30 opacity-0 transition-all-500 group-hover:bg-black/25 group-hover:opacity-100">
                      <span class="text-14 tracking-4 text-white" lang-en="tracking-1">查看详情</span>
                    </div>
                  </A>
                </Reveal>
              )}
            </For>
          </Show>

        </Suspense>
      </ErrorBoundary>
    </div>
  )
};
