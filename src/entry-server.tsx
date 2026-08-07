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
            {/* 移动端覆盖：修复 autoRem 在窄屏下字号过度压缩问题 */}
            <style>{`
              /* 移动端：--rem 固定为 50px 基准（text-24→24px 可读，px-150→75px 内边距） */
              @media (max-width: 768px) {
                html {
                  font-size: 50px !important;
                  --rem: 50px !important;
                }
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
