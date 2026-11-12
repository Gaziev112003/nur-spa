import { motion } from 'framer-motion'
import { DIRECTIONS, type Direction } from '../data/services'

const ease = [0.22, 0.61, 0.36, 1] as const

export function Tabs({
  value,
  onChange,
  variant = 'pill',
}: {
  value: Direction
  onChange: (d: Direction) => void
  variant?: 'pill' | 'underline'
}) {
  return (
    <div className={`tabs tabs--${variant}`} role="tablist" aria-label="Направление">
      {DIRECTIONS.map((d) => {
        const on = d.id === value
        return (
          <button
            key={d.id}
            role="tab"
            aria-selected={on}
            className={on ? 'tab tab--on' : 'tab'}
            onClick={() => onChange(d.id)}
          >
            {on && variant === 'pill' && (
              <motion.span
                layoutId="tab-pill"
                className="tab__pill"
                transition={{ duration: 0.22, ease }}
              />
            )}
            <span className="tab__label">{d.label}</span>
            {on && variant === 'underline' && (
              <motion.span
                layoutId="tab-line"
                className="tab__line"
                transition={{ duration: 0.22, ease }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
