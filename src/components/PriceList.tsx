import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SERVICES, type Direction } from '../data/services'
import { formatPrice, useCart } from '../state/cart'

export function PriceList({ direction }: { direction: Direction }) {
  const { has, toggle } = useCart()

  return (
    <ul className="price">
      {SERVICES[direction].map((s) => {
        const on = has(s.id)
        return (
          <li key={s.id}>
            <button
              className={on ? 'price__row price__row--on' : 'price__row'}
              onClick={() => toggle(s.id)}
              aria-pressed={on}
            >
              <span className="price__check" aria-hidden="true">
                <motion.span
                  initial={false}
                  animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
                  transition={{ duration: 0.16 }}
                >
                  <Check size={13} strokeWidth={3} />
                </motion.span>
              </span>
              <span className="price__text">
                <span className="price__name">{s.name}</span>
                <span className="price__note">{s.note}</span>
              </span>
              <span className="price__sum">{formatPrice(s.price)}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
