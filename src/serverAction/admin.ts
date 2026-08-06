import { action, cache } from '@solidjs/router'
import { useSession } from 'vinxi/http'
/** 是否管理员 */
export const login = action(async (formData: FormData) => {
  'use server'
  const s = await getSession()
  const password = formData.get('password')
  const res = password === '123'
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
    password: `background:#1bd24a;color:#5fff8e;font-size:13px;`, // 这个是密码，暂时不要动
    cookie: {
      secure: false, // 关闭这个才能在http环境下使用
    },
  })
}
// 检测是否管理员
export async function checkAdmin() {
  'use server'
  const s = await getSession()
  const res = Boolean(s.data?.isAdmin)
  if (res)
    return res

  throw new Error('not admin')
}
