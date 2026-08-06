import type { JSXElement } from 'solid-js'
import { ErrorBoundary } from 'solid-js'
import NotView from '~/components/NotView'

/**  */
export default function (props: { children: JSXElement }) {
  return (
    <ErrorBoundary fallback={<NotView />}>
      {props.children}
    </ErrorBoundary>
  )
};
