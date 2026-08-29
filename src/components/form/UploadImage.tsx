import { useAction } from '@solidjs/router'
import { Show, createSignal } from 'solid-js'
import { toast } from '@thinke/toast'
import { uploadImage } from '~/serverAction/upload'

/**
 * 图片上传控件（后台表单用）
 * - 选择本地图片 → 上传服务器 → 自动把返回的相对路径填入目标字段
 */
export default function UploadImage(props: {
  label?: string
  value?: string
  onUploaded?: (url: string) => void
}) {
  const upload = useAction(uploadImage)
  const [uploading, setUploading] = createSignal(false)
  let fileRef: HTMLInputElement

  const handleFile = async (e: Event) => {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file)
      return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await upload(fd)
      if (res?.code === 0 && res.url) {
        toast.success('上传成功')
        props.onUploaded?.(res.url)
      }
      else {
        toast.error(res?.message || '上传失败')
      }
    }
    catch (err: any) {
      toast.error(err?.message || '上传失败')
    }
    finally {
      setUploading(false)
      if (fileRef)
        fileRef.value = ''
    }
  }

  return (
    <div class="flex items-center gap-12 py-4">
      <input
        ref={fileRef!}
        type="file"
        accept="image/*"
        onChange={handleFile}
        class="text-14"
      />
      <Show when={uploading()}>
        <span class="text-14 text-gray">上传中…</span>
      </Show>
      <Show when={props.value}>
        <span class="text-14 text-gray break-all max-w-300 truncate">{props.value}</span>
      </Show>
    </div>
  )
}
