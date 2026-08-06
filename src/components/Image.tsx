import type { ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'

/** 可自动加载模糊图的图片组件 */
export default function Image(_props: ComponentProps<'img'>) {
  const [props, otherProps] = splitProps(_props, ['src', 'loading', 'style'])

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
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        ...(props.style || {}),
      }}
      src={props.src}
      loading={props.loading || 'lazy'}
      data-tag="img"
    />
  )
};
