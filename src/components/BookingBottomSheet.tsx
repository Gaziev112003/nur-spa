import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { formatPrice, useCart } from '../state/cart'
import { buildMessage, telegramUrl, whatsappUrl } from '../lib/message'

const TIMES = ['Утро', 'День', 'Вечер']

export function BookingBottomSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, remove } = useCart()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [touched, setTouched] = useState(false)
  const [copied, setCopied] = useState(false)

  const nameOk = name.trim().length >= 2
  const ageOk = /^\d{1,3}$/.test(age) && Number(age) >= 14 && Number(age) <= 99

  const when = useMemo(() => {
    const parts = [time, date.trim()].filter(Boolean)
    return parts.join(', ')
  }, [time, date])

  const message = useMemo(
    () => buildMessage({ name, age, when: when || 'уточним', items, total }),
    [name, age, when, items, total],
  )

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  function send(kind: 'wa' | 'tg') {
    setTouched(true)
    if (!nameOk || !ageOk || items.length === 0) return
    if (kind === 'wa') {
      window.open(whatsappUrl(message), '_blank', 'noopener')
    } else {
      navigator.clipboard?.writeText(message).catch(() => {})
      setCopied(true)
      setTimeout(() => setCopied(false), 6000)
      window.open(telegramUrl(), '_blank', 'noopener')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="sheet-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          <motion.div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Оформление записи"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.26, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose()
            }}
          >
            <div className="sheet__handle" />
            <div className="sheet__head">
              <h2>Запись</h2>
              <button className="sheet__close" onClick={onClose} aria-label="Закрыть">
                <X size={18} />
              </button>
            </div>

            <div className="sheet__scroll">
              <ul className="sheet__list">
                {items.map((s) => (
                  <li key={s.id} className="sheet__item">
                    <span>
                      {s.name}
                      <small>{s.minutes} мин</small>
                    </span>
                    <span className="sheet__price">{formatPrice(s.price)}</span>
                    <button
                      className="sheet__remove"
                      onClick={() => remove(s.id)}
                      aria-label={`Убрать ${s.name}`}
                    >
                      <X size={15} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="sheet__total">
                <span>Итого к оплате</span>
                <b>{formatPrice(total)}</b>
              </div>

              <label className="field">
                <span>Ваше имя</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Гульнара"
                  autoComplete="given-name"
                  aria-invalid={touched && !nameOk}
                />
                {touched && !nameOk && <em>Напишите имя, по которому к вам обращаться</em>}
              </label>

              <label className="field">
                <span>Возраст</span>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  placeholder="28"
                  inputMode="numeric"
                  aria-invalid={touched && !ageOk}
                />
                {touched && !ageOk && <em>Нужен возраст от 14 лет: от него зависят показания</em>}
              </label>

              <div className="field">
                <span>Когда удобно</span>
                <div className="chips">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      className={time === t ? 'chip chip--on' : 'chip'}
                      onClick={() => setTime(time === t ? '' : t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Например: 14 ноября, после 15:00"
                />
              </div>

              <div className="sheet__actions">
                <button className="btn btn--wa" onClick={() => send('wa')}>
                  Отправить в WhatsApp
                </button>
                <button className="btn btn--tg" onClick={() => send('tg')}>
                  Отправить в Telegram
                </button>
              </div>
              {copied && (
                <p className="sheet__hint">
                  Текст скопирован. В Telegram останется вставить его в переписку.
                </p>
              )}
              <p className="sheet__privacy">
                Заявка уходит напрямую в мессенджер студии. Данные никуда больше не отправляются.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
