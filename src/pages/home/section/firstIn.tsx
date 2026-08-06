import { i18n } from '~/components/i18n'

export interface FirstInProps {}

/** 白屏+logo */
export default function FirstIn() {
  return (
    <div id="firstIn" class="absolute z-88 w-full f-c/c bg-white h-dvh" style={{ display: 'none' }}>
      <div class="overflow-hidden">
        <span id="logo" class="invisible block text-32 text-black leading-none">
          {i18n.title()}
        </span>
      </div>
    </div>
  )
}
