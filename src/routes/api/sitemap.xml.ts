import { db } from '~/DB'
import { workList } from '~/DB/schema'
import { eq, and } from 'drizzle-orm'

/**
 * 动态 sitemap.xml：静态页面 + 全部公开作品详情页（中/英）
 * URL: /sitemap.xml
 */
export async function GET() {
  const publicWorks = await db.select({ id: workList.id, lang: workList.lang })
    .from(workList)
    .where(and(eq(workList.status, 'public')))
    .catch(() => [])

  const domain = 'https://www.erandesign.cn'
  const today = new Date().toISOString().slice(0, 10)

  const staticUrls = [
    '/zh/',
    '/en/',
    '/zh/works',
    '/en/works',
    '/zh/about',
    '/en/about',
    '/zh/concat',
    '/en/concat',
  ].map(path => `<url><loc>${domain}${path}</loc><changefreq>weekly</changefreq><priority>${path === '/zh/' ? '1.0' : '0.8'}</priority><lastmod>${today}</lastmod></url>`)

  const workUrls = publicWorks.map((w) => {
    const lang = w.lang === 'en' ? 'en' : 'zh'
    return `<url><loc>${domain}/${lang}/work/${w.id}</loc><changefreq>monthly</changefreq><priority>0.9</priority><lastmod>${today}</lastmod></url>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join('\n')}
${workUrls.join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
