import { useNavigate, useParams } from '@solidjs/router'
import { availableLanguageTags, sourceLanguageTag } from '~/components/i18n'
import Home from '~/pages/home/home'

/**  */
export default function lang() {
  const params = useParams()
  const navigate = useNavigate()
  if (!availableLanguageTags.includes(params.lang as 'zh'))
    navigate(`/${sourceLanguageTag}`)

  return (<Home />)
}
