import { action } from '@solidjs/router'
import { checkAdmin } from './admin'

/**
 * 图片上传（后台用）：保存到 /var/www/eran/public/images/works/{YYYYMMDD}/{filename}
 * 返回可访问的相对路径（/images/works/...），供 cover/content 字段使用
 */
export const uploadImage = action(async (formData: FormData) => {
  'use server'
  await checkAdmin()

  const file = formData.get('file')
  if (!(file instanceof File))
    return { message: '缺少文件', code: 1, url: '' }
  if (!file.type.startsWith('image/'))
    return { message: '仅支持图片文件', code: 1, url: '' }
  if (file.size > 10 * 1024 * 1024)
    return { message: '文件过大（限 10MB）', code: 1, url: '' }

  const dateDir = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  // 安全文件名：时间戳 + 随机
  const filename = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`
  const relDir = `/images/works/${dateDir}`
  const dir = `public${relDir}`
  const dest = `${dir}/${filename}`

  try {
    const { mkdir, writeFile } = await import('node:fs/promises')
    await mkdir(dir, { recursive: true })
    const buf = Buffer.from(await file.arrayBuffer())
    await writeFile(dest, buf)
    return { message: 'success', code: 0, url: `${relDir}/${filename}` }
  }
  catch (err: any) {
    return { message: err?.message || '上传失败', code: 1, url: '' }
  }
})
