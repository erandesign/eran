import { action, cache } from '@solidjs/router'
import { useSession } from 'vinxi/http'

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-insecure-secret-change-me'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123'

/** 登陆 */
export const login = action(async (formData: FormData) => {
  'use server'
  const s = await getSession()
  const password = formData.get('password')
  const res = password === ADMIN_PASSWORD
  console.log(`admin ${s.id} login => ${res}`)
  await s.update((d) => {
    d.isAdmin = res
    return d
  })
  return res
})

export const isAdmin = action(async () => {
  'use server'
  try {
    const s = await getSession()
    const res = Boolean(s.data?.isAdmin)
    console.log(`admin ${s.id} auth => ${res}`)

    return res
  }
  catch (error) {
    return false
  }
})
export const isAdminC = cache(async () => {
  'use server'
  try {
    return Boolean((await getSession()).data?.isAdmin)
  }
  catch (error) {
    return false
  }
}, 'isAdminC')

function getSession() {
  'use server'
  return useSession({
    password: SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
  })
}
/** 检查管理员 */
export async function checkAdmin() {
  'use server'
  const s = await getSession()
  const res = Boolean(s.data?.isAdmin)
  if (res)
    return res

  throw new Error('not admin')
}
