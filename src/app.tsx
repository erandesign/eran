import { MetaProvider } from '@solidjs/meta'
import type { RouteSectionProps } from '@solidjs/router'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
// import '@unocss/reset/normalize.css'
// import '@unocss/reset/sanitize/sanitize.css'
import type { Component } from 'solid-js'
import { Suspense } from 'solid-js'
import 'uno.css'
import './app.less'
import SiteTitle from './components/SiteTitle'
import { languageTag, locationLanguageTag, setLanguageTag } from './components/i18n'

/** 布局 & 根 */
const Root: Component<RouteSectionProps> = (props) => {
  setLanguageTag(locationLanguageTag())

  return (
    <div class={`lang-${languageTag()}`}>
      <MetaProvider>
        <SiteTitle />
        <Suspense>{props.children}</Suspense>
      </MetaProvider>
    </div>
  )
}
/** 入口 */
export default function App() {
  return (
    <Router root={Root}>
      <FileRoutes />
    </Router>
  )
}
