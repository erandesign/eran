import { action } from '@solidjs/router'
import { checkAdmin } from './admin'

/**
 * 图片上传（后台用）：保存到 .data/uploads/{filename}
 * 返回可访问路径 /api/upload/{filename}（server route 提供，不受 Nitro public manifest 限制）
 * .data 目录 CI 部署不覆盖，上传文件持久保留
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

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  // 安全文件名：时间戳 + 随机
  const filename = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`

  try {
    const { mkdir, writeFile } = await import('node:fs/promises')
    const dir = path_join('.data', 'uploads')
    await mkdir(dir, { recursive: true })
    const buf = Buffer.from(await file.arrayBuffer())
    await writeFile(path_join(dir, filename), buf)
    return { message: 'success', code: 0, url: `/api/upload/${filename}` }
  }
  catch (err: any) {
    return { message: err?.message || '上传失败', code: 1, url: '' }
  }
})

function path_join(...parts: string[]): string {
  return parts.join('/')
}
