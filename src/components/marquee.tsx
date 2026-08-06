import { For } from 'solid-js'
import { i18n } from '~/components/i18n'
/** logo滚动 */
export default function Marquee() {
  const speed = i18n.customers().length * (9 / 5)
  return (
    <div class="flex flex-col gap-64 overflow-hidden pt-88">
      <For each={[speed, speed * (11 / 9), speed * (13 / 9)]}>
        {item => (
          <div class="marquee f-c/e gap-160 px-80" style={{ 'animation-duration': `${item}s` }}>
            <For each={i18n.customers().concat(i18n.customers())}>
              {item => (<img class="w-150" src={item.logo} />)}
            </For>
          </div>
        )}
      </For>
    </div>
  )
};
