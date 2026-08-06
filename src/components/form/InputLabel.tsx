import { Show } from 'solid-js'

interface InputLabelProps {
  name: string
  label?: string
  required?: boolean
  margin?: 'none'
}

/**
 * Input label for a form field.
 */
export function InputLabel(props: InputLabelProps) {
  return (
    <Show when={props.label}>
      <label
        class="inline-block text-14"
        classList={{ 'mb-84 lg:mb-10': !props.margin }}
        for={props.name}
      >
        {props.label}
        {' '}
        {props.required && (
          <span class="ml-1 text-red-600 dark:text-red-400">*</span>
        )}
      </label>
    </Show>
  )
}
