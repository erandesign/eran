import { action } from '@solidjs/router'
import { checkAdmin } from './admin'
import { getConcatList, saveConcatInfo2DB } from '~/DB'
import { form2obj } from '~/utils'

/** 保存联系信息到本地（仅存 phone/info 两列，表单其他字段忽略，避免 concatinfo 表无对应列报错） */
export const saveConcatInfo = action(async (formData: FormData) => {
  'use server'

  const obj = form2obj(formData)
  const payload = {
    phone: String(obj.phone || ''),
    info: String(obj.info || ''),
  }

  return await saveConcatInfo2DB(payload)
    .then(() => ({ message: 'success', code: 0 }))
    .catch((err) => {
      return ({ message: err.message || 'error', code: 1 })
    })
})

/** 获取联系信息 */
export async function getConcatInfo(param: { page: number, pageSize: number }) {
  'use server'

  await checkAdmin()
  return await getConcatList(param.page, param.pageSize)
}
