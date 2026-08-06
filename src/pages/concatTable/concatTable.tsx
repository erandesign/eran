import { For, createResource, createSignal } from 'solid-js'
import EPagination from '~/components/Pagination'
import { getConcatInfo } from '~/serverAction/concat'

/** 展示联系人信息 */
export default function ConcatTable() {
  //
  const [page, setPage] = createSignal({ page: 1, pageSize: 10 })
  const [data, action] = createResource(page, getConcatInfo)
  const td = 'px-1em leading-relaxed  bg-white '
  return (
    <div class="f-c/s flex-col p-16">
      <h1 class="text-center text-26">联系记录</h1>
      <table class="w-full border-spacing-x-4 border-spacing-y-4 b-1 rd-4 b-solid bg-gray-1 p-8">
        <thead>
          <tr>
            <th scope="col" class="b-0">联系方式</th>
            <th scope="col" class="b-0">信息</th>
            <th scope="col" class="b-0">填写时间</th>
          </tr>
        </thead>
        <tbody class="text-left">
          <For each={data()?.list}>
            {item => (
              <tr>
                <td class={td}>{item.phone}</td>
                <td class={td}>{item.info}</td>
                <td class={td}>{item.created_time.toString()}</td>
              </tr>
            )}
          </For>

        </tbody>
      </table>
      <div class="mt-42 flex-c/s gap-x-24 text-oneline">
        <button class="text-12 leading-loose" onClick={action.refetch}>刷新</button>
        <EPagination total={data()?.total || 0} onChange={setPage} />
      </div>

    </div>
  )
};
