import { AnimatePresence, motion } from 'framer-motion'
import { formatPrice, useCart } from '../state/cart'

export function FloatingCartBar({ onOpen }: { onOpen: () => void }) {
  const { count, total } = useCart()

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          className="cartbar"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="cartbar__info">
            <span className="cartbar__count">
              {count} {countLabel(count)}
            </span>
            <span className="cartbar__total">Итого: {formatPrice(total)}</span>
          </div>
          <button className="btn btn--primary" onClick={onOpen}>
            Оформить запись
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function countLabel(n: number) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'услуга'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'услуги'
  return 'услуг'
}
