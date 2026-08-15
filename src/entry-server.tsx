// @refresh reload
import { StartServer, createHandler } from '@solidjs/start/server'
import { locationLanguageTag } from '~/components/i18n'

/** 根据请求 URL 生成 SEO 兜底标签（预渲染/爬虫无 JS 时可见，水合后由 @solidjs/meta 动态覆盖） */
function seoFallback(event: any) {
  const url = event?.request?.url || ''
  const path = url ? new URL(url).pathname : ''
  const lang = locationLanguageTag() || 'zh'
  const siteTitle = 'ERAN DESIGN'
  const siteDesc = 'ERAN DESIGN 空间设计事务所，立足中国深圳。专注地产&办公、终端SI、展示道具、品牌VI、网站&APP，提供整体化、可持续性、高识别度的空间设计解决方案。'

  // 作品详情页：/zh/work/:id → 动态 title 由运行时 SSR 提供（@solidjs/meta），这里给通用兜底
  let title = siteTitle
  let desc = siteDesc
  if (path.includes('/works'))
    title = `${siteTitle} | 作品案例`
  else if (path.includes('/about'))
    title = `${siteTitle} | 关于我们`
  else if (path.includes('/work/'))
    title = `${siteTitle} | 空间设计案例`

  return { title, desc, lang }
}

export default createHandler((event) => {
  const seo = seoFallback(event)
  const url_language_tag = seo.lang
  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang={url_language_tag} class="dark">
          <head>
            <meta charset="utf-8" />
            <title>{seo.title}</title>
            <meta name="description" content={seo.desc} />
            {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover"
            />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="/font/LXGWFasmartGothic/font.css" />
            {/* Bing 站长验证 */}
            <meta name="msvalidate.01" content="083970CADEBC65FD631053903BE3DBAE" />
            {/* 预渲染 SEO 兜底（og 标签） */}
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.desc} />
            <meta property="og:image" content="https://www.erandesign.cn/images/cover.webp" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://www.erandesign.cn${seo.lang === 'zh' ? '/zh/' : '/en/'}`} />
            {/* 移动端覆盖：响应式字号 + 排版适配 */}
            <style>{`
              @media (max-width: 768px) {
                /* --rem 随视口宽度平滑缩放（350px→14px, 768px→26px），间距/字号同步响应 */
                html {
                  font-size: clamp(14px, 3.8vw, 26px) !important;
                  --rem: clamp(14px, 3.8vw, 26px) !important;
                }
                body {
                  font-size: clamp(12px, 3.2vw, 15px) !important;
                }
                /* 网格列间隙收窄，防止 14 列溢出 */
                .e-grid { column-gap: clamp(6px, 1.6vw, 12px) !important; }
                .grid-cols-14 { grid-template-columns: repeat(14, minmax(0, 1fr)) !important; }
                /* 关键字号：视口响应式（小屏小、大屏大），相对 html 基准 */
                .text-72 { font-size: 1.9rem !important; line-height: 1.25 !important; letter-spacing: 0.1em !important; }
                .text-60 { font-size: 1.7rem !important; line-height: 1.25 !important; letter-spacing: 0.08em !important; }
                .text-32 { font-size: 1.35rem !important; line-height: 1.3 !important; }
                .text-30 { font-size: 1.35rem !important; line-height: 1.3 !important; }
                .text-24 { font-size: 1.15rem !important; }
                .text-20 { font-size: 1.05rem !important; }
                .text-16 { font-size: 0.9rem !important; }
                .text-14 { font-size: 0.82rem !important; }
                .text-12 { font-size: 0.72rem !important; }
                .leading-94 { line-height: 1.25 !important; }
                /* 导航：移动端紧凑布局 */
                #cover-nav-main { grid-template-columns: auto 1fr auto !important; padding: 0 0.4rem !important; }
                #cover-nav { gap: 0.6rem !important; padding: 0 0.6rem !important; }
                #cover-logo-x { margin-right: 0.6rem !important; }
                /* 关键布局间距在移动端收窄，避免横向溢出 */
                .px-150 { padding-left: 1.1rem !important; padding-right: 1.1rem !important; }
                .px-120 { padding-left: 0.6rem !important; padding-right: 0.6rem !important; }
                .px-56  { padding-left: 1rem !important; padding-right: 1rem !important; }
                .gap-120 { gap: 1rem !important; }
                .gap-88  { gap: 0.8rem !important; }
                .gap-56  { gap: 0.8rem !important; }
                .gap-80  { gap: 0.8rem !important; }
                .ml-614 { margin-left: 0 !important; }
                .w-1220 { width: 100% !important; }
                .w-166  { width: 2rem !important; }
                /* 固定宽度容器在移动端自适应 */
                .w-670 { width: 100% !important; }
                .w-1030 { width: 100% !important; }
                .w-825 { width: 100% !important; }
                .w-600 { width: 100% !important; }
                .w-560 { width: 100% !important; }
                .w-315 { width: 100% !important; }
                .w-325 { width: 100% !important; }
                .w-460 { width: 100% !important; }
                /* 大图在移动端保持比例（宽满、高自动） */
                .h-600 { height: auto !important; }
                .h-465 { height: auto !important; }
                .h-315 { height: auto !important; }
                .h-250 { height: auto !important; }
                /* about/founder 两端布局移动端改为纵向堆叠 */
                .f-e\\/sb { flex-direction: column !important; align-items: stretch !important; }
                .f-e\\/s { flex-direction: column !important; }
                .gap-115 { gap: 1rem !important; }
                .gap-120 { gap: 1rem !important; }
                .pt-300 { padding-top: 2rem !important; }
                .pt-120 { padding-top: 1.5rem !important; }
                .pt-80 { padding-top: 1rem !important; }
                .pb-164 { padding-bottom: 2rem !important; }
                .pb-80 { padding-bottom: 1rem !important; }
                .h-1080 { height: 100vh !important; }
                .my-132 { margin-top: 1rem !important; margin-bottom: 1rem !important; }
                .mt-350 { margin-top: 2rem !important; }
                .mt-132 { margin-top: 1rem !important; }
                .mb-164 { margin-bottom: 2rem !important; }
                .mb-50  { margin-bottom: 0.6rem !important; }
                .py-88  { padding-top: 1rem !important; padding-bottom: 1rem !important; }
                .py-50  { padding-top: 1rem !important; padding-bottom: 1rem !important; }
                .py-43  { padding-top: 0.8rem !important; padding-bottom: 0.8rem !important; }
                /* 字距在移动端收窄 */
                .tracking-17 { letter-spacing: 0.12em !important; }
                .tracking-11 { letter-spacing: 0.15em !important; }
                .tracking-8  { letter-spacing: 0.12em !important; }
                .tracking-7  { letter-spacing: 0.12em !important; }
                .tracking-5  { letter-spacing: 0.1em !important; }
                /* 分类 tab 在移动端可换行/滚动 */
                .col-1\\/span9 { flex-wrap: wrap !important; gap: 0.5rem !important; }
                .f-c\\/sb { flex-wrap: wrap !important; }
                /* 作品卡片在移动端改为单列堆叠（避免三列最小宽度撑破） */
                .grid-cols-\\[auto_auto_1fr\\] { grid-template-columns: 1fr !important; }
                .gap-x-25 { column-gap: 0.4rem !important; }
                .gap-y-12 { row-gap: 0.3rem !important; }
                .justify-items-end { justify-items: start !important; }
                .text-end { text-align: left !important; }
                .text-right { text-align: left !important; }
                /* footer/其他溢出元素兜底 */
                .text-oneline { white-space: normal !important; }
                /* 首页 slogan 高度适配 */
                #home-slogan { height: 24rem !important; }
                body { overflow-x: hidden !important; }
              }
            `}</style>
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />
  )
})
