import { useNavigate } from '@solidjs/router'
import { sourceLanguageTag } from '~/components/i18n'

/** "/" 重定向到默认语言 */
export default function Index() {
  const navigate = useNavigate()
  navigate(sourceLanguageTag, { replace: true })
  return null
}
