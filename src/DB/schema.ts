import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const concatinfo = sqliteTable('concatinfo', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  phone: text('phone'),
  info: text('info'),
  created_time: integer('created_time', { mode: 'timestamp' }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
})

export const workList = sqliteTable('worklist', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  address: text('address').notNull(), // 所在地
  type: text('type').notNull(),
  time_start: text('time_start').notNull(),
  time_end: text('time_end').notNull(),
  investor: text('investor').notNull(),
  area: text('area').notNull(), // 占地面积 平方米
  cover: text('cover').notNull(),
  lang: text('lang').notNull(),
  status: text('status').notNull(),
  content: text('content', { mode: 'json' }).$type<{ type: string, [key: string]: string }[]>().notNull(),
  index: integer('index').notNull().default(0),
})
// console.log('[ aaa ] >', text('content', { mode: 'json' }))
