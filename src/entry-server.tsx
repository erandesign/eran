// @refresh reload
import { StartServer, createHandler } from '@solidjs/start/server'
import { locationLanguageTag } from '~/components/i18n'

export default createHandler(() => {
  const url_language_tag = locationLanguageTag()
  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang={url_language_tag} class="dark">
          <head>
            <meta charset="utf-8" />
            {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover"
            />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="/font/LXGWFasmartGothic/font.css" />
            {/* 移动端覆盖：修复 autoRem 在窄屏下字号过度压缩 + 间距溢出 */}
            <style>{`
              /* 移动端：--rem 固定 50px 基准（text-24→24px 可读） */
              @media (max-width: 768px) {
                html {
                  font-size: 50px !important;
                  --rem: 50px !important;
                }
                /* 导航：移动端紧凑布局 */
                #cover-nav-main { grid-template-columns: auto 1fr auto !important; padding: 0 0.4rem !important; }
                #cover-nav { gap: 0.8rem !important; padding: 0 0.6rem !important; }
                #cover-logo-x { margin-right: 0.6rem !important; }
                /* 大标题在移动端缩小 */
                .text-72 { font-size: 1rem !important; line-height: 1.3 !important; letter-spacing: 0.15em !important; }
                .leading-94 { line-height: 1.3 !important; }
                /* 关键布局间距在移动端收窄，避免横向溢出 */
                .px-150 { padding-left: 1rem !important; padding-right: 1rem !important; }
                .px-120 { padding-left: 0.6rem !important; padding-right: 0.6rem !important; }
                .px-56  { padding-left: 1rem !important; padding-right: 1rem !important; }
                .gap-120 { gap: 1rem !important; }
                .gap-88  { gap: 0.8rem !important; }
                .gap-56  { gap: 0.8rem !important; }
                .gap-80  { gap: 0.8rem !important; }
                .ml-614 { margin-left: 0 !important; }
                .w-1220 { width: 100% !important; }
                .w-166  { width: 2rem !important; }
                .h-1080 { height: 13rem !important; }
                .my-132 { margin-top: 1rem !important; margin-bottom: 1rem !important; }
                .mt-350 { margin-top: 2rem !important; }
                .mt-132 { margin-top: 1rem !important; }
                .mb-164 { margin-bottom: 2rem !important; }
                .mb-50  { margin-bottom: 0.6rem !important; }
                .py-88  { padding-top: 1rem !important; padding-bottom: 1rem !important; }
                .py-50  { padding-top: 1rem !important; padding-bottom: 1rem !important; }
                .py-43  { padding-top: 0.8rem !important; padding-bottom: 0.8rem !important; }
                /* 字距在移动端收窄（tracking-N 按 50px 基准会过大） */
                .tracking-17 { letter-spacing: 0.15em !important; }
                .tracking-11 { letter-spacing: 0.2em !important; }
                .tracking-8  { letter-spacing: 0.15em !important; }
                .tracking-7  { letter-spacing: 0.15em !important; }
                .tracking-5  { letter-spacing: 0.1em !important; }
                /* 首页 slogan 高度适配 */
                #home-slogan { height: 22rem !important; }
                /* 详情页封面 */
                .h-1080 { height: 13rem !important; }
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
