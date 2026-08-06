import type { JSX } from 'solid-js'
import { createMemo, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { InputError } from './InputError'
import { InputLabel } from './InputLabel'

export interface TextInputProps {
  ref: (element: HTMLTextAreaElement) => void
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'number' | 'date'
  name: string
  value: string | number | undefined
  onInput: JSX.EventHandler<HTMLTextAreaElement, InputEvent>
  onChange: JSX.EventHandler<HTMLTextAreaElement, Event>
  onBlur: JSX.EventHandler<HTMLTextAreaElement, FocusEvent>
  placeholder?: string
  required?: boolean
  class?: string
  label?: string
  error?: string
  padding?: 'none'
  /** @default true */
  widthFull?: boolean
}

/**
 * Text input field that users can type into. Various decorations can be
 * displayed in or around the field to communicate the entry requirements.
 */
export function TextInput(props: TextInputProps) {
  // Split input element props
  const [, inputProps] = splitProps(props, [
    'class',
    'value',
    'label',
    'error',
    'padding',
  ])

  // Create memoized value
  const getValue = createMemo<string | number | undefined>(
    prevValue =>
      props.value === undefined
        ? ''
        : !Number.isNaN(props.value)
            ? props.value
            : prevValue,
    '',
  )

  return (
    <div
      class="w-full flex-s/s flex-col"
      classList={{
        [props.class as string]: !!props.class,
        'px-8 lg:px-10': !props.padding,
      }}
    >
      <InputLabel
        name={props.name}
        label={props.label}
        required={props.required}
      />
      <Dynamic
        component={props.type === 'text' ? 'textarea' : 'input'}
        {...inputProps}
        rows={1}
        placeholder={inputProps.placeholder ?? `请输入 ${props.label}`}
        class="border-1 border-slate-200/1 rounded-2xl b-solid bg-white p-.5em text-16 outline-none focus:border-sky-600/50 hover:border-slate-300 placeholder:text-13 placeholder:text-slate-500"
        classList={{
          'border-red-600/50 dark:border-red-400/50': !!props.error,
          'border-slate-200/1 hover:border-slate-300 focus:border-sky-600/50 dark:border-slate-800/1 dark:hover:border-slate-700 dark:focus:border-sky-400/50': !props.error,
          'w-full': props.widthFull ?? true,
          'resize-y': props.type === 'text',
        }}

        id={props.name}
        value={getValue()}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
      />
      <InputError name={props.name} error={props.error} />
    </div>
  )
}
