import { useParams } from '@solidjs/router'
import { ErrorBoundary, For, Match, Show, Switch, createEffect, createResource, onCleanup } from 'solid-js'
import dayjs from 'dayjs'
import { Dynamic } from 'solid-js/web'
import { Title } from '@solidjs/meta'
import { contentTypeMap } from './contentTypeMap'
import { I18n, i18n } from '~/components/i18n'
import SeoMeta from '~/components/SeoMeta'
import { WorkJsonLd } from '~/components/JsonLd'
import { getPublicWorkById, getWorkById } from '~/serverAction/works'
import Image from '~/components/Image'
import Lightbox from '~/components/Lightbox'
import Reveal from '~/components/Reveal'
/**  */
export default function Detail() {
  const param = useParams()
  const [data] = createResource(() => Number(param.id || 0), getWorkById, {})

  // SPA 导航 title 兜底：数据到达后直接设置 document.title（绕过 @solidjs/meta SPA bug）
  createEffect(() => {
    const item = data()
    if (item?.name) {
      document.title = `${item.name} | ${i18n.title()}`
      // 同步更新 meta description（客户端）
      const desc = document.querySelector('meta[name="description"]')
      if (desc)
        desc.setAttribute('content', `${item.name} - ${item.address || ''} - ${item.investor || ''}`)
    }
  })
  // 离开详情页时恢复默认 title（避免留在作品名）
  onCleanup(() => {
    document.title = i18n.title()
  })

  return (
    <div class="min-h-100vh">
      <Show when={data()}>
        <Title>{data()!.name} | {i18n.title()}</Title>
        <meta name="description" content={`${data()!.name} - ${data()!.address} - ${data()!.investor} - ${(data()!.description || '').slice(0, 120)}`} />
        <link rel="canonical" href={`https://www.erandesign.cn/${data()!.lang === 'en' ? 'en' : 'zh'}/work/${data()!.id}`} />
        <SeoMeta
          title={`${data()!.name} | ${i18n.title()}`}
          description={`${data()!.name} - ${data()!.address} - ${data()!.investor}`}
          image={data()!.cover}
          type="article"
        />
        <WorkJsonLd
          name={data()!.name}
          description={data()!.description}
          address={data()!.address}
          investor={data()!.investor}
          area={data()!.area}
          timeStart={data()!.time_start}
          timeEnd={data()!.time_end}
          image={data()!.cover}
          id={data()!.id}
          lang={data()!.lang}
        />
      </Show>

      <ErrorBoundary fallback={<NotShow />}>
        <Show when={data()} fallback={<NotShow />}>
          {/* 封面 */}
          <Image class="h-1080 w-full object-cover" src={data()!.cover} alt={data()!.name} lazy={false} />
          {/* 信息 */}
          <div class="grid grid-rows-[auto_1fr] e-grid w-full px-150 py-88">
            <h1 class="col-span-full m-0 mb-50 text-24 font-normal tracking-8">{data()!.name}</h1>
            <I18n i18n={data()!.description} class="[word-wrap:break-word] col-1/span6 row-2/3 block max-h-251 overflow-x-hidden overflow-y-auto text-justify text-16 leading-normal tracking-5 scrollbar-none" />
            <div class="col-span6/-1 row-2/3">
              <div class="mb-16 flex-c/sb b-0 b-b-.5 b-solid py-20" light="b-black text-#6B6B6B" dark="b-white text-white/48">
                <I18n i18n={data()!.address} class="text-24 tracking-8" />
                <I18n i18n={i18n.subTitles()[i18n.subTitles({}, { lang: 'zh' }).findIndex(f => f === data()!.type)]} class="text-24 tracking-8" />
              </div>
              <div class="flex gap-80 py-10 text-16 tracking-5">
                <span>时间</span>
                <span>
                  {dayjs(data()!.time_start).format('YYYY/MM')}
                  ～
                  {dayjs(data()!.time_end).format('YYYY/MM')}
                </span>
              </div>
              <div class="flex gap-80 py-10 text-16 tracking-5">
                <span>业主</span>
                <span>
                  {data()!.investor}
                </span>
              </div>
              <Show when={+(data()!.area) > 0}>
                <div class="flex gap-80 py-10 text-16 tracking-5">
                  <span>面积</span>
                  <span>
                    {data()!.area}
                    <span class="tracking-0">
                      m
                      <sup>2</sup>
                    </span>
                  </span>
                </div>
              </Show>

            </div>
          </div>
          {/* 内容 */}
          <div class="flex flex-col gap-150">
            <For each={data()?.content || []}>
              {(item, i) => {
                const Ele = contentTypeMap[item.type]
                if (Ele)
                  return (
                    <Reveal delayStep={120}>
                      <Dynamic component={Ele}{...item} />
                    </Reveal>
                  )

                return null
              }}
            </For>
          </div>

          {/* <div class="">{JSON.stringify(data())}</div> */}
        </Show>
      </ErrorBoundary>
      {/* 图片灯箱：点击详情页图片放大查看 */}
      <Lightbox />
    </div>
  )
};

function NotShow() {
  return (
    <div class="min-h-60vh s-full f-c/c">
      <span class="text-32" dark="text-white" light="text-black">无法查看</span>
    </div>
  )
}
