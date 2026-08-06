import { createDatabase } from 'db0'
import sqlite from 'db0/connectors/better-sqlite3'
import { drizzle } from 'db0/integrations/drizzle/index'
import { asc, count, desc } from 'drizzle-orm'
import type { SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core'
import { concatinfo, workList } from './schema'
import type { anyObj } from '~/type'

const sqlite_db0 = createDatabase(sqlite({}))
export const db = drizzle(sqlite_db0)

export async function saveConcatInfo2DB(params: anyObj) {
  return await db.insert(concatinfo).values(params)
}

export const getConcatList = pagingQuery(concatinfo)

export const getWorkListFormDB = pagingQuery(workList)

/** 分页查询 */
export function pagingQuery<T extends SQLiteTableWithColumns<any>>(table: T) {
  return async (page: number, pageSize: number) => {
    const [[{ total }], list] = await Promise.all([
      db.select({ total: count().as('total') }).from(table),
      db.select().from(table).limit(pageSize).offset((page - 1) * pageSize).orderBy(desc(table.index), desc(table.id)).then((res) => {
        return res.map((v) => {
          if (typeof v?.content === 'string')
            // eslint-disable-next-line ts/ban-ts-comment
            // @ts-expect-error
            v.content = JSON.parse(v.content)
          return v
        })
      }),
    ])
    return { list, total }
  }
}
