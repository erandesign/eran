import { getAllWorks } from '~/serverAction/works'

/**
 * 作品数据客户端缓存
 * - SPA 导航时：详情页优先从已加载的全量数据（getAllWorks）按 id 查找，零网络请求
 * - 直接刷新详情页 URL 时：没有缓存，回退到服务端 getWorkById
 * 原理：首页/作品列表已调用 getAllWorks 拿到全部公开作品（含 content），缓存在内存供详情页复用
 */

// 模块级缓存：{ lang: Map<id, work> }
const cache: Record<string, Map<number, any>> = {}

/** 记录一次 getAllWorks 结果到缓存（供详情页复用） */
export function cacheWorks(lang: string, works: any[]) {
  if (!works || !Array.isArray(works))
    return
  if (!cache[lang])
    cache[lang] = new Map()
  for (const w of works)
    cache[lang].set(Number(w.id), w)
}

/**
 * 按 id 获取作品：
 * 1. 先查内存缓存（SPA 导航场景，零请求）
 * 2. 缓存未命中（直接刷新详情页）→ 调 getAllWorks 拉一次并缓存
 * 3. 仍无 → 返回 undefined（由调用方决定是否回退 server-fn）
 */
export async function getWorkFromCache(lang: string, id: number): Promise<any | undefined> {
  const langCache = cache[lang]
  if (langCache?.has(id))
    return langCache.get(id)

  // 缓存未命中：拉取该语言全部作品（SSR 时可能已内联在 HTML，客户端请求一次后缓存）
  const works = await getAllWorks({ lang, type: '' })
  cacheWorks(lang, works as any[])
  return (works as any[]).find(w => Number(w.id) === id)
}
