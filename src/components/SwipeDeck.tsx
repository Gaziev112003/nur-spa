import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import type { Direction } from '../data/services'

const ORDER: Direction[] = ['laser', 'plasma', 'hijama']

/**
 * Горизонтальный свайп между направлениями. Вертикальный скролл не перехватывается:
 * drag только по x, а touch-action на контейнере — pan-y.
 */
export function SwipeDeck({
  value,
  onChange,
  children,
}: {
  value: Direction
  onChange: (d: Direction) => void
  children: (d: Direction) => ReactNode
}) {
  const x = useMotionValue(0)
  const track = useRef<HTMLDivElement>(null)
  const idx = ORDER.indexOf(value)

  return (
    <div className="deck">
      <motion.div
        ref={track}
        className="deck__track"
        style={{ x, width: '300%', touchAction: 'pan-y' }}
        drag="x"
        dragElastic={0.12}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          const w = track.current?.offsetWidth ? track.current.offsetWidth / 3 : 390
          const far = info.offset.x < -w * 0.22 || info.velocity.x < -450
          const back = info.offset.x > w * 0.22 || info.velocity.x > 450
          let next = idx
          if (far && idx < 2) next = idx + 1
          if (back && idx > 0) next = idx - 1
          if (next !== idx) onChange(ORDER[next])
          animate(x, -(next * (w || 0)), { type: 'spring', stiffness: 420, damping: 40 })
        }}
        animate={{ x: `${-idx * 100}%` }}
        transition={{ type: 'spring', stiffness: 420, damping: 40 }}
      >
        {ORDER.map((d) => (
          <div key={d} className="deck__panel" aria-hidden={d !== value}>
            {children(d)}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
