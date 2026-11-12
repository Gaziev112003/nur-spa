import type { Service } from '../data/services'

export type BookingData = {
  name: string
  age: string
  when: string
  items: Service[]
  total: number
}

export function buildMessage({ name, age, when, items, total }: BookingData): string {
  const lines = items.map((s) => `— ${s.name} (${s.price.toLocaleString('ru-RU').replace(/ /g, ' ')} ₽)`)
  const sum = total.toLocaleString('ru-RU').replace(/ /g, ' ')
  return [
    'Ассаляму алейкум ва рахматуЛлагьи ва баракатух!',
    `Меня зовут ${name.trim()}, мне ${age.trim()} лет.`,
    'Хочу записаться в студию NUR на процедуры:',
    ...lines,
    `Итоговая стоимость: ${sum} ₽.`,
    `Удобное время для визита: ${when.trim()}.`,
    'Подскажите, пожалуйста, есть ли свободные окошки?',
  ].join('\n')
}

// +7 928 805-96-74 из брифа; wa.me требует международный вид без плюса
export const WHATSAPP_NUMBER = '79288059674'
export const TELEGRAM_HANDLE = 'elmahava_531'

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export function telegramUrl() {
  // Telegram не принимает готовый текст в ссылке — сообщение копируется в буфер перед переходом
  return `https://t.me/${TELEGRAM_HANDLE}`
}
