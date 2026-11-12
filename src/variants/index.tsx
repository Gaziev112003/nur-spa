import { V3 } from './v3'

declare global {
  interface Window {
    __VARIANT__?: number
  }
}

// Веер завершён: выбран вариант 3 (Дом на склоне), остальные архивированы.
// Этот роутер больше не используется — приложение показывает Body1/2/3.
export function VariantRouter() {
  return <V3 />
}
