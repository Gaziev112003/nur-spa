import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FACTS, type Direction } from '../data/services'

export function FactCards({ direction }: { direction: Direction }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="facts">
      {FACTS[direction].map((f) => {
        const isOpen = open === f.id
        return (
          <div key={f.id} className={isOpen ? 'fact fact--open' : 'fact'}>
            <button
              className="fact__head"
              onClick={() => setOpen(isOpen ? null : f.id)}
              aria-expanded={isOpen}
            >
              <span className="fact__title">{f.title}</span>
              <span className="fact__brief">{f.brief}</span>
              <span className="fact__mark" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="fact__body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 0.85 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <p>{f.detail}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
