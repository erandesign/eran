import { A, useParams } from '@solidjs/router'
import dayjs from 'dayjs'
import { ErrorBoundary, Show, createResource } from 'solid-js'
import { getWorkById } from '~/serverAction/works'
import Image from '~/components/Image'

/**  */
export default function NextWork() {
  const param = useParams()
  const [data] = createResource(() => (Number(param.id || 0) - 1), getWorkById, {})

  return (
    <ErrorBoundary fallback={null}>
      <Show when={data()}>
        <div class="grid-e/st grid-rows-[auto_auto] e-grid mx-150 mt-150 b-0 b-t-.5 b-solid pb-132 pt-30" light="b-black" dark="b-white">
          <div class="col-1/span5 flex flex-col gap-20 text-36 font-bold tracking-27 font-mb">
            <span>NEXT</span>
            <span>PROJECT</span>
          </div>
          <A class="col-span7/-1 row-2/3" href={`../${data()!.id}`}>
            <Image
              class="s-full"
              style={{
                cursor: `url('/images/cursor_goto_white.svg'),auto`,
              }}
              src={data()!.cover}
            />
          </A>
          <div class="col-1/-8 row-2/3 flex-e/e flex-col gap-12">
            <span class="mb-16 text-20 tracking-7 text-oneline">{data()!.name}</span>
            <span class="text-14 text-#6b6b6b tracking-5">{data()!.address}</span>
            <span class="text-14 text-#6b6b6b tracking-5">
              {dayjs(data()!.time_start).format('YYYY')}
              ·
              {data()!.type}
            </span>
          </div>
        </div>
      </Show>
    </ErrorBoundary>
  )
};
