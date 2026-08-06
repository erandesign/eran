/* eslint-disable ts/ban-ts-comment */
import { Dialog } from '@ark-ui/solid'
import { A, useAction } from '@solidjs/router'
import toast from '@thinke/toast'
import { For, Show, Suspense, createResource, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { ActionButton } from '~/components/form/ActionButton'
import { i18n } from '~/components/i18n'
import { addWork, deleWork, getWorkList, saveWork } from '~/serverAction/works'
import { nextTick } from '~/utils'

/** 项目列表展示 */
export default function WorkList() {
  const [type, setType] = createSignal('全部')
  const [data, action] = createResource(() => ({ type: type() }), getWorkList)
  const addWorkAction = useAction(addWork)
  const saveWorkAction = useAction(saveWork)

  async function hightLight(id: number) {
    await nextTick(200)

    const Eles = document.querySelectorAll(`.item-${id}`)
    // console.log('%c [ Eles ]-57', 'font-size:13px; background:#b12e7b; color:#f572bf;', Eles)
    for (let ei = 0; ei < Eles.length; ei++) {
      const Ele = Eles[ei]
      Ele?.classList.add('ani-bg-hightLight')
      setTimeout(() => {
        Ele?.classList.remove('ani-bg-hightLight')
      }, 1000)
    }
  }
  const td = 'px-.5em leading-normal bg-white max-w-240 overflow-auto text-justify'
  return (
    <div class="f-c/s flex-col p-16">
      <h1 class="text-center text-32">项目列表</h1>
      <div class="mb-6 w-full f-c/sb gap-8 rd-8 bg-blueGray-1 p-8">
        <button class="text-12 leading-loose" onClick={action.refetch}>刷新</button>
        <div class="f-c/c gap-12">
          <For each={['全部', ...i18n.subTitles()]}>
            {item => <div class="cursor-pointer px-12 py-8 text-16" classList={{ 'bg-blue': type() === item }} onClick={() => setType(item)}>{item}</div>}
          </For>
        </div>
        <div>
          <ActionButton type="link" variant="secondary" label="新建" href="../0" />
        </div>

      </div>
      <Suspense fallback="loading...">
        <table class="w-full border-spacing-4 b-1 rd-4 b-solid bg-gray-1 p-8 text-center">
          <thead>
            <tr>
              <th scope="col" class="b-0">序号</th>
              <th scope="col" class="b-0">id</th>
              <th scope="col" class="b-0">语言</th>
              <th scope="col" class="b-0">名称</th>
              <th scope="col" class="b-0">详情</th>
              <th scope="col" class="b-0">状态</th>
              <th scope="col" class="b-0">操作</th>
            </tr>
          </thead>
          <tbody class="text-left">
            <Show when={data()?.length} fallback={<tr><td class="h-100 text-center text-gray" colSpan={7}>无数据</td></tr>}>
              <For each={data() || []}>
                {(item, i) => {
                  const itemclass = `${td} item-${item.id}`
                  const [showIndexChange, setShowIndexChange] = createSignal< boolean>(false)
                  const [indexValue, setIndexValue] = createSignal(item.index)
                  return (
                    <tr class="[&:hover>td]:bg-yellow-1">
                      <td class={itemclass}>{item.index}</td>
                      <td class={itemclass}>{item.id}</td>
                      <td class={itemclass}>{item.lang}</td>
                      <td class={itemclass}>{item.name}</td>
                      <td class={itemclass}>
                        <div class="max-h-100px">{item.description}</div>
                      </td>
                      <td class={itemclass}>{item.status === 'public' ? '公开' : '私有'}</td>
                      <td class={itemclass}>
                        <div class="flex gap-8">
                          <A href={`../${item.id}`}>编辑</A>
                          <A href={`/${item.lang}/work/${item.id}`} target="_blank">查看</A>
                          <DeleItem id={item.id} onDeled={action.refetch} />
                          <button
                            class="b-none bg-transparent text-21 text-blue btn"
                            onClick={() => {
                              const newwork = { ...item }
                              newwork.name = `${newwork.name}(复制)`
                              // @ts-expect-error
                              delete newwork.id
                              addWorkAction(newwork).then(action.refetch)
                            }}
                          >
                            复制
                          </button>
                          {/* <button
                            class="b-none bg-transparent text-21 text-blue btn"
                            onClick={async () => {
                              const p = data()?.[i() - 1]
                              const nextIndex = (p?.index || item.index) + 1
                              await saveWorkAction({ index: nextIndex, id: item.id } as any).then(action.refetch)
                              hightLight(item.id)
                            }}
                          >
                            上移
                          </button> */}
                          <button
                            class="b-none bg-transparent text-21 text-blue btn"
                            onClick={async () => {
                              // const p = data()![i() + 1]
                              // const nextIndex = (p?.index || item.index) - 1
                              // await saveWorkAction({ index: nextIndex, id: item.id } as any).then(action.refetch)
                              // hightLight(item.id)
                              setShowIndexChange(true)
                            }}
                          >
                            调整排序
                            <Portal>
                              <Show when={showIndexChange()}>
                                <div class="fixed bottom-0 left-0 w-dvw w-full f-c/c bg-dark/70 p-16 h-dvh" onClick={() => setShowIndexChange(false)}>
                                  <div class="s-max rd-8 bg-light-7 p-16"onClick={e => e.stopPropagation()}>
                                    <p class="text-20">排序规则：序号大的在前，相同的id大的在前</p>
                                    <div class="f-c/s py-8">
                                      <input value={indexValue()} onInput={e => setIndexValue(e.target.value as any)} type="number" class="h-full b-none px-16 py-8 text-22 placeholder:text-16" placeholder="请输入序号" />
                                      <button
                                        class="h-full b-none bg-blue px-16 py-12 text-18"
                                        onClick={async () => {
                                          await saveWorkAction({ index: indexValue(), id: item.id } as any).then(action.refetch)
                                          hightLight(item.id)
                                        }}
                                      >
                                        确定
                                      </button>
                                    </div>
                                    <div class="f-c/s gap-8">
                                      <button
                                        class="b-none bg-transparent text-16 text-blue btn"
                                        onClick={async () => {
                                          const p = data()![0]
                                          const nextIndex = (p?.index || item.index) + 1
                                          if (nextIndex) {
                                            setIndexValue(nextIndex)
                                          }
                                        }}
                                      >
                                        置顶
                                      </button>
                                      <button
                                        class="b-none bg-transparent text-16 text-blue btn"
                                        onClick={async () => {
                                          const p = data()![i() - 1]
                                          const nextIndex = (p?.index || item.index) + 1
                                          if (nextIndex) {
                                            setIndexValue(nextIndex)
                                          }
                                        }}
                                      >
                                        上移
                                      </button>
                                      <button
                                        class="b-none bg-transparent text-16 text-blue btn"
                                        onClick={async () => {
                                          const p = data()![i() + 1]
                                          const nextIndex = (p?.index || item.index) - 1
                                          if (nextIndex) {
                                            setIndexValue(nextIndex)
                                          }
                                        }}
                                      >
                                        下移
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Show>
                            </Portal>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                }}
              </For>
            </Show>
          </tbody>
        </table>
      </Suspense>

    </div>
  )
};

// #region 删除
/** 删除   */
export function DeleItem(props: { id: number, onDeled?: () => void }) {
  const uDeleWork = useAction(deleWork)
  const handelDele = () => {
    uDeleWork(props.id)
      .then(() => {
        toast.success('删除成功')
        props.onDeled?.()
      })
      .catch(() => {
        toast.error('删除失败')
      })
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger class="b-none bg-transparent btn">
        <span class="text-21 text-red">删除</span>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop class="fixed left-0 top-0 z-100 w-dvw bg-dark-1/20 backdrop-blur-4 h-dvh" />
        <Dialog.Positioner class="fixed left-0 top-0 z-101 s-full f-c/c">
          <Dialog.Content class="rd-4 bg-white p-20 shadow">
            <Dialog.Title class="m-0 text-24">删除项目信息</Dialog.Title>
            <Dialog.Description class="mt-16 text-18">删除后不可找回！！！请谨慎操作</Dialog.Description>
            <div class="mt-24 flex-c/sb">
              <Dialog.CloseTrigger class="b-none bg-gray-3 px-16 py-8 btn">取消</Dialog.CloseTrigger>
              <Dialog.CloseTrigger onClick={handelDele} class="b-none bg-red px-16 py-8 btn">删除</Dialog.CloseTrigger>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
};
// #endregion
