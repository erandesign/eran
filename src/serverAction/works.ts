import { action, cache } from '@solidjs/router'
import { and, desc, eq, sql } from 'drizzle-orm'
import { checkAdmin } from './admin'
import { db, getConcatList, getWorkListFormDB, saveConcatInfo2DB } from '~/DB'
import { form2obj } from '~/utils'
import { workList } from '~/DB/schema'

/** 添加 项目信息 */
export const addWork = action(async (data: IWorkListItem) => {
  'use server'
  await checkAdmin()

  return await db.insert(workList).values(data)
    .then(() => ({ message: 'success', code: 0 }))
    .catch((err) => {
      return ({ message: err.message || 'error', code: 1 })
    })
})
/** 保存 项目信息 */
export const saveWork = action(async (data: IWorkListItem) => {
  'use server'
  if (!(Number(data.id) > 0))
    throw new Error('id is not exist')

  await checkAdmin()

  return await db.update(workList).set(data).where(eq(workList.id, data.id!))
    .then(() => ({ message: 'success', code: 0 }))
    .catch((err) => {
      return ({ message: err.message || 'error', code: 1 })
    })
})

/** 通过id获取 项目信息 */
export const getWorkById = cache (async (id: number) => {
  'use server'
  if (!(id > 0))
    return undefined
  const res = (await db.select().from(workList).where(and(eq(workList.id, id), eq(workList.status, 'public'))).then(([item]) => {
    if (typeof item?.content === 'string')
      item.content = JSON.parse(item.content)

    return item
  }))
  if (res)
    return res

  await checkAdmin()
  return await db.select().from(workList).where(eq(workList.id, id)).then(([res]) => {
    if (typeof res?.content === 'string')
      res.content = JSON.parse(res.content)

    return res
  })
}, 'getWorkById')

/**   获取 项目信息 */
export async function getWorkList(param: { type: string }) {
  'use server'
  const whereParam = []
  if (param.type && param.type !== '全部') {
    whereParam.push(eq(workList.type, param.type))
  }
  await checkAdmin()
  const sq = db.select().from(workList)
    .orderBy(desc(workList.index), desc(workList.id))
    .where(and(...whereParam))
    .then((res) => {
      return res.map((v) => {
        if (typeof v?.content === 'string')
          v.content = JSON.parse(v.content)
        return v
      })
    })
    .catch(() => ([] as const))

  return await sq
}

/**   项目最大的序号 */
export async function getMaxWorkIndex() {
  'use server'

  await checkAdmin()
  const sq = db.select({
    maxIndex: sql<number>`max(${workList.index})`.as('maxIndex'),
  }).from(workList).catch(() => [{ maxIndex: 0 }])

  return await sq
}

/** 获取 对应语言的 所有 项目信息 */
export const getAllWorks = cache(async (param: { lang: string, type: string }) => {
  'use server'
  const whereParam = [eq(workList.lang, param.lang), eq(workList.status, 'public')]
  if (param.type) {
    whereParam.push(eq(workList.type, param.type))
  }

  const sq = db.select().from(workList)
    .where(and(...whereParam))
    .orderBy(desc(workList.index), desc(workList.id))
    .then((res) => {
      return res.map((v) => {
        if (typeof v?.content === 'string')
          v.content = JSON.parse(v.content)
        return v
      })
    }).catch(() => ([] as const))

  return await sq
}, 'getAllWorks')

/** 通过id获取 公开的项目信息 */
export const getPublicWorkById = cache(async (id: number) => {
  'use server'
  if (!(id > 0))
    return undefined

  const sq = db.selectDistinct().from(workList).where(and(eq(workList.id, id), eq(workList.status, 'public'))).then(([res]) => {
    if (typeof res?.content === 'string')
      res.content = JSON.parse(res.content)

    return res
  })

  return await sq
}, 'getPublicWorkById')

/** 删除 项目信息 */
export const deleWork = action(async (id: number) => {
  'use server'
  if ((id <= 0))
    throw new Error('id is not exist')

  await checkAdmin()

  return await db.delete(workList).where(eq(workList.id, id)).returning()
    .then(() => ({ message: 'success', code: 0 }))
    .catch((err) => {
      return ({ message: err.message || 'error', code: 1 })
    })
})
// eslint-disable-next-line ts/consistent-type-definitions
export type IWorkListItem = {
  id?: number
  name: string
  description: string
  address: string
  type: string
  time_start: string
  time_end: string
  investor: string
  area: string
  cover: string
  lang: string
  status: string
  index: number
  content: {
    type: string
    // ... 每个类型不一样，，，，，，
    [k: string]: string
  }[]
}
