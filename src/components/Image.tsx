import type { ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'

interface ImageProps extends ComponentProps<'img'> {
  /** 宽高比占位，如 "3/2"、"4/3"、"16/9"，用于防止 CLS */
  ratio?: string
}

/** 可自动加载模糊图的图片组件 */
export default function Image(_props: ImageProps) {
  const [props, otherProps] = splitProps(_props, ['src', 'loading', 'style', 'ratio'])

  // const [src, setSrc] = createSignal('')

  const bgMinimg = () => {
    const path = props.src || ''
    const pathArr = path.split(/(\.png|\.jpe?g|\.webp|\.gif)/)
    const hasMin = pathArr.includes('?min')
    if (hasMin) {
      pathArr[1] = `.min${pathArr[1]}`
      pathArr[2] = ''
      return `url('${pathArr.join('')}')`
    }
    return undefined
  }

  return (
    <img
      {...otherProps}
      style={{
        'background-size': '100% 100%',
        'background-image': bgMinimg(),
        'aspect-ratio': props.ratio || undefined,
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        ...(props.style || {}),
      }}
      src={props.src}
      loading={props.loading || 'lazy'}
      data-tag="img"
    />
  )
}
