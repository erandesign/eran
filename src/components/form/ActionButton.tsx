import { Show } from 'solid-js'
import clsx from 'clsx'
import type { DefaultButtonProps } from './UnstyledButton'
import { UnstyledButton } from './UnstyledButton'

type ActionButtonProps = DefaultButtonProps & {
  variant: 'primary' | 'secondary'
  label: string
}

/**
 * Button that is used for navigation, to confirm form entries or perform
 * individual actions.
 */
export function ActionButton(props: ActionButtonProps) {
  return (
    <UnstyledButton
      class={clsx(
        'relative flex items-center justify-center rounded-2xl px-1.5em py-.5em font-medium no-underline transition-colors  text-16 b-0 cursor-pointer',
        props.variant === 'primary'
        && 'bg-sky-600 text-white hover:bg-sky-600/80 dark:bg-sky-400 dark:text-gray-900 dark:hover:bg-sky-400/80',
        props.variant === 'secondary'
        && 'bg-sky-600/10 text-sky-600 hover:bg-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:hover:bg-sky-400/20',
        (props as any).loading && 'cursor-not-allowed',
      )}
      {...props}
    >
      {renderProps => (
        <Show when={renderProps.loading} fallback={props.label}>
          <Spinner label={`${props.label} is loading`} />
        </Show>
      )}
    </UnstyledButton>
  )
}

interface SpinnerProps {
  label?: string
}

/**
 * Spinner provide a visual cue that an action is being processed.
 */
export function Spinner(props: SpinnerProps) {
  return (
    <div
      class="s-16 animate-spin border-r-2 border-t-2 border-transparent border-t-yellow rounded-full b-solid"
      aria-label={props.label || 'Loading'}
    />
  )
}
