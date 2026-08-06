// import { Expandable } from './Expandable'

interface InputErrorProps {
  name: string
  error?: string
}

/**
 * Input error that tells the user what to do to fix the problem.
 */
export function InputError(props: InputErrorProps) {
  return (
    <div
      class="pt-4 text-12 text-red-500 dark:text-red-400"
      id={`${props.name}-error`}
    >
      {props.error}
    </div>
  )
}
