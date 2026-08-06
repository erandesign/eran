import { For } from 'solid-js'
import { Pagination } from '@ark-ui/solid'
/** 分页器 */
export default function EPagination(props: { total: number, pageSize?: number, onChange?: (value: { page: number, pageSize: number }) => void }) {
  const btn = 'text-12 leading-loose min-w-30'
  return (
    <>
      <span class="text-13 text-gray-6">
        共计
        {props.total}
        条
      </span>
      <Pagination.Root
        class="w-full f-c/s gap-x-4 py-8 outline-none"
        count={props.total}
        pageSize={10}
        siblingCount={2}
        onPageChange={e => props.onChange?.(e)}
      >
        <Pagination.PrevTrigger class={btn}>上一页</Pagination.PrevTrigger>
        <Pagination.Context>
          {api => (
            <For each={api().pages}>
              {(page, index) =>
                page.type === 'page'
                  ? (
                    <Pagination.Item
                      {...page}
                      class={btn}
                      classList={{
                        'bg-blue': api().page === index() + 1,
                      }}
                    >
                      {page.value}
                    </Pagination.Item>
                    )
                  : (
                    <Pagination.Ellipsis index={index()}>
                      &#8230;
                    </Pagination.Ellipsis>
                    )}
            </For>
          )}
        </Pagination.Context>
        <Pagination.NextTrigger class={btn}>下一页</Pagination.NextTrigger>
      </Pagination.Root>
    </>
  )
}
