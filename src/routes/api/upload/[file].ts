import { readFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * 上传文件访问路由：/api/upload/{filename}
 * 文件存 .data/uploads/（不在 .output public manifest 内，CI 部署保留 .data）
 */
const UPLOAD_ROOT = path.resolve(process.cwd(), '.data', 'uploads')

const MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  avif: 'image/avif',
}

export async function GET(event: any) {
  const file = event.params.file || ''
  // 防路径穿越：仅允许字母数字下划线点
  if (!/^[0-9A-Za-z._-]+$/.test(file))
    return new Response('bad request', { status: 400 })

  try {
    const buf = await readFile(path.join(UPLOAD_ROOT, file))
    const ext = (file.split('.').pop() || '').toLowerCase()
    return new Response(new Uint8Array(buf), {
      headers: {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }
  catch {
    return new Response('not found', { status: 404 })
  }
}
