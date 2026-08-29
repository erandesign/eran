import { createForm, email, getValue, insert, move, remove, required, setValue, setValues } from '@modular-forms/solid'
import { useAction, useLocation, useNavigate, useParams } from '@solidjs/router'
import toast from '@thinke/toast'
import { cloneDeep } from 'lodash-es'
import { For, Show, createEffect, createResource, on, onMount } from 'solid-js'
import OnlyAdmin from '~/components/OnlyAdmin'
import { ActionButton } from '~/components/form/ActionButton'
import { InputError } from '~/components/form/InputError'
import { InputLabel } from '~/components/form/InputLabel'
import { Select } from '~/components/form/Select'
import type { TextInputProps } from '~/components/form/TextInput'
import { TextInput } from '~/components/form/TextInput'
import UploadImage from '~/components/form/UploadImage'
import { availableLanguageTags, i18n } from '~/components/i18n'
import type { IWorkListItem } from '~/serverAction/works'
import { addWork, getMaxWorkIndex, getWorkById, saveWork } from '~/serverAction/works'

const contentType: { [key: string]: { label: string, fields: IFieldItem[] } } = {
  cover: { label: '100%大图', fields: [{ label: '图片', key: 'image' }] },
  big: { label: '80%大图', fields: [{ label: '图片', key: 'image' }] },

  Lr: { label: '左大图右小图', fields: [
    { label: '左大图', key: 'L_image' },
    { label: '右小图', key: 'r_image' },
  ] },
  lR: { label: '左小图右大图', fields: [
    { label: '左大图', key: 'l_image' },
    { label: '右小图', key: 'R_image' },
  ] },
  title_desc_image: { label: '标题详情图片', fields: [
    { label: '标题', key: 'title' },
    { label: '详情', key: 'desc' },
    { label: '图片', key: 'image' },
  ] },
  desc_2image: { label: '详情+2图片', fields: [
    { label: '详情', key: 'desc' },
    { label: '图片1', key: 'image1' },
    { label: '图片2', key: 'image2' },
  ] },
}

/** 编辑 新增 作品数据 */
export default function WorkEdit() {
  const navigate = useNavigate()
  const param = useParams()
  const addWorkAction = useAction(addWork)
  const saveWorkAction = useAction(saveWork)
  const [data, getAction] = createResource(() => Number(param.id || 0), getWorkById, {})
  const [workForm, { Form, Field, FieldArray }] = createForm<IWorkListItem>({
    initialValues: { content: [{ type: 'cover' }] },
  })
  createEffect(on(data, () => {
    if (data()) {
      // 更新到表单
      setValues(workForm, data() as any, { shouldValidate: true })
    }
  }))

  const handleSave = async (values: IWorkListItem) => {
    let Fn = addWorkAction
    if (Number(data()?.id) > 0) {
      Fn = saveWorkAction
      values.id = data()!.id
    }
    else {
      const [{ maxIndex }] = await getMaxWorkIndex()
      values.index = maxIndex + 1
    }

    Fn(values).then(() => {
      toast.success('保存成功')
      getAction.refetch()
      navigate(`../list`)
    }).catch((err) => {
      import.meta.env.DEV && console.error(err)
      toast.error('保存失败')
    })
  }

  return (
    <OnlyAdmin>
      <main class="f-c/s flex-col p-16" id="work-edit-main">
        <h1 class="text-28">项目录入</h1>
        <div class="w-full">
          <Form class="space-y-12 lg:space-y-16 md:space-y-14" onSubmit={handleSave}>
            <div class="mb-32 flex-c/sb gap-24">
              <ActionButton type="button" variant="secondary" label="返回" onClick={() => navigate(`${param.id ? '.' : ''}./list`)} />
              <ActionButton type="submit" variant="primary" label="保存" />
            </div>
            <div class="rd-4 bg-gray-1 p-8 space-y-8 lg:space-y-12 md:space-y-10">
              <For each={[
                { label: '项目名称', key: 'name' },
                { label: '描述', key: 'description' },
                { label: '所在地', key: 'address' },
                { label: '业主', key: 'investor' },
                { label: '开始时间', key: 'time_start', type: 'date' },
                { label: '结束时间', key: 'time_end', type: 'date' },
                { label: '占地面积(单位：平方米)', key: 'area' },
                { label: '封面图(图片需提前放在指定位置)', key: 'cover' },
              ] as IFieldItem[]}
              >
                {item => (
                  <Field name={item.key as any} validate={[required('必填项')]}>
                    {(field, props) => (
                      <>
                        <TextInput
                          {...props}
                          label={item.label}
                          type={item.type ?? 'text'}
                          value={field.value}
                          error={field.error}
                          required
                          widthFull={(item.type ?? 'text') === 'text'}
                        />
                        {/* 图片字段：提供本地文件上传（自动填入相对路径） */}
                        <Show when={item.key === 'cover'}>
                          <UploadImage
                            label={item.label}
                            value={field.value}
                            onUploaded={(url) => setValue(workForm, 'cover', url)}
                          />
                        </Show>
                      </>
                    )}
                  </Field>
                )}
              </For>
              <Field name="type" validate={[required('必填项')]}>
                {(field, props) => (
                  <Select
                    {...props}
                    value={field.value}
                    options={i18n.subTitles().map(v => ({ label: v, value: v }))}
                    error={field.error}
                    label="项目类型"
                    placeholder="请选择"
                  />
                )}
              </Field>
              <Field name="lang" validate={[required('必填项')]}>
                {(field, props) => (
                  <Select
                    {...props}
                    value={field.value}
                    options={availableLanguageTags.map(v => ({ label: v, value: v }))}
                    error={field.error}
                    label="项目语言"
                    placeholder="请选择"
                  />
                )}
              </Field>
              <Field name="status" validate={[required('必填项')]}>
                {(field, props) => (
                  <Select
                    {...props}
                    value={field.value}
                    options={[{ label: '私有', value: 'private' }, { label: '公开*', value: 'public' }]}
                    error={field.error}
                    label="项目可见性（只有公开的才会被其他人看到，否则只有管理员可见）"
                    placeholder="请选择"
                  />
                )}
              </Field>

              <FieldArray name="content" validate={[required('必填')]}>
                {fieldArray => (
                  <div class="px-8 space-y-5 lg:px-10" id={fieldArray.name}>
                    <div class="f-c/sb gap-20">
                      <InputLabel name={fieldArray.name} label="项目介绍" margin="none" required />
                      <div class="">
                        <ActionButton
                          type="button"
                          variant="secondary"
                          label="加一项"
                          onClick={() => {
                            insert(workForm, 'content', { value: { type: 'cover' } })
                          }}
                        />
                      </div>
                    </div>
                    <InputError name={fieldArray.name} error={fieldArray.error} />
                    <div class="space-y-16">
                      <For each={fieldArray.items}>
                        {(_, index) => {
                          let $box: HTMLDivElement
                          function hightLight(Ele: HTMLElement) {
                            Ele.classList.add('ani-bg-hightLight')
                            setTimeout(() => {
                              Ele.classList.remove('ani-bg-hightLight')
                            }, 1000)
                          }
                          return (
                            <div ref={$box!} class="flex-s/s flex-col flex-wrap gap-5 rounded-2xl b-none bg-white p-5 shadow dark:bg-gray-2">
                              <Field
                                name={`content.${index()}.type`}
                                validate={required('必填项')}
                              >
                                {(field, props) => (
                                  <Select
                                    {...props}
                                    value={field.value}
                                    options={Object.entries(contentType).map(([key, { label }]) => ({ label, value: key }))}
                                    error={field.error}
                                    label="内容类型"
                                    placeholder="请选择"
                                  />
                                )}
                              </Field>
                              <div class="h-3 w-full bg-slate-200" />
                              <Show when={getValue(workForm, `content.${index()}.type`)}>
                                <For each={contentType[getValue(workForm, `content.${index()}.type`)!].fields}>
                                  {item => (
                                    <Field name={`content.${index()}.${item.key}`} validate={[required('必填项')]}>
                                      {(field, props) => (
                                        <>
                                          <TextInput
                                            {...props}
                                            label={item.label}
                                            type={item.type ?? 'text'}
                                            value={field.value}
                                            error={field.error}
                                            required
                                            widthFull={(item.type ?? 'text') === 'text'}
                                          />
                                          {/* 图片字段：提供本地文件上传（自动填入相对路径） */}
                                          <Show when={typeof item.key === 'string' && (item.key as string).includes('image')}>
                                            <UploadImage
                                              label={item.label}
                                              value={field.value}
                                              onUploaded={(url) => setValue(workForm, `content.${index()}.${item.key}` as any, url)}
                                            />
                                          </Show>
                                        </>
                                      )}
                                    </Field>
                                  )}
                                </For>
                              </Show>
                              <div class="flex gap-32">
                                <ActionButton
                                  type="button"
                                  variant="secondary"
                                  label="删除此项"
                                  onClick={() => {
                                    remove(workForm, 'content', { at: index() })
                                  }}
                                />
                                <Show when={index() > 0}>
                                  <ActionButton
                                    type="button"
                                    variant="secondary"
                                    label="上移"
                                    onClick={() => {
                                      hightLight($box)
                                      move(workForm, 'content', { from: index(), to: index() - 1,
                                      })
                                    }}
                                  />
                                </Show>
                                <Show when={index() < fieldArray.items.length - 1}>
                                  <ActionButton
                                    type="button"
                                    variant="secondary"
                                    label="下移"
                                    onClick={() => {
                                      hightLight($box)
                                      move(workForm, 'content', { from: index(), to: index() + 1,
                                      })
                                    }}
                                  />
                                </Show>
                              </div>
                            </div>
                          )
                        }}
                      </For>
                    </div>

                  </div>

                )}
              </FieldArray>
            </div>
          </Form>
        </div>
      </main>
    </OnlyAdmin>
  )
};

interface IFieldItem { label: string, key: keyof IWorkListItem | string, type?: TextInputProps['type'] }
