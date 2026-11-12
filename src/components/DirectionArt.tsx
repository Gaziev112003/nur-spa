import { motion } from 'framer-motion'
import type { Direction } from '../data/services'

/** Один графический элемент на направление. Без фото: схема, форма, линия. */
export function DirectionArt({ direction }: { direction: Direction }) {
  if (direction === 'laser') return <LaserArt />
  if (direction === 'plasma') return <PlasmaArt />
  return <HijamaArt />
}

function LaserArt() {
  return (
    <div className="art">
      <svg viewBox="0 0 300 190" role="img" aria-label="Схема манипулы диодного лазера с охлаждающей насадкой">
        <g stroke="var(--line)" strokeWidth="1" fill="none">
          <path d="M18 168 H282" />
          <path d="M18 168 V40" strokeDasharray="3 5" />
        </g>
        <motion.path
          d="M64 62 h132 a14 14 0 0 1 14 14 v20 a14 14 0 0 1 -14 14 h-132 z"
          fill="var(--surface)"
          stroke="var(--gold)"
          strokeWidth="1.2"
          initial={false}
        />
        <rect x="96" y="70" width="62" height="32" rx="4" fill="none" stroke="var(--line)" />
        <text x="96" y="90" fill="var(--muted)" fontSize="10" letterSpacing="1.6" fontFamily="Geologica">
          808 нм
        </text>
        <motion.circle
          cx="222"
          cy="86"
          r="11"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.4"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '222px 86px' }}
        />
        <motion.path
          d="M232 90 L272 152"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeDasharray="7 6"
          animate={{ strokeDashoffset: [0, -26] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        />
        <path d="M232 90 L272 152" stroke="var(--accent)" strokeWidth="10" opacity=".08" strokeLinecap="round" />
        <text x="152" y="182" fill="var(--muted)" fontSize="9" letterSpacing="2">
          САПФИР
        </text>
      </svg>
    </div>
  )
}

function PlasmaArt() {
  return (
    <div className="art">
      <svg viewBox="0 0 300 190" role="img" aria-label="Схема разряда холодной плазмы">
        <g fill="none" stroke="var(--line)" strokeWidth="1">
          {[26, 42, 58, 74].map((r, i) => (
            <motion.circle
              key={r}
              cx="150"
              cy="92"
              r={r}
              animate={{ scale: [1, 1.04, 1], opacity: [0.9, 0.5, 0.9] }}
              transition={{ duration: 3.2 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '150px 92px' }}
            />
          ))}
        </g>
        <motion.circle
          cx="150"
          cy="92"
          r="12"
          fill="var(--accent)"
          animate={{ scale: [1, 1.16, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '150px 92px' }}
        />
        <path d="M150 24 v40" stroke="var(--gold)" strokeWidth="1.2" />
        <path d="M150 16 l5 8 h-10 z" fill="var(--gold)" />
        <text x="118" y="180" fill="var(--muted)" fontSize="9" letterSpacing="2">
          РАЗРЯД НАД КОЖЕЙ
        </text>
      </svg>
    </div>
  )
}

function HijamaArt() {
  return (
    <div className="art">
      <svg viewBox="0 0 300 190" role="img" aria-label="Схема вакуумных банок">
        <path d="M20 156 H280" stroke="var(--line)" strokeWidth="1" />
        {[
          { x: 92, h: 62, d: 0 },
          { x: 150, h: 78, d: 0.5 },
          { x: 208, h: 54, d: 1 },
        ].map((c) => (
          <motion.g
            key={c.x}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: c.d }}
          >
            <path
              d={`M${c.x - 24} 156 v-${c.h} a24 24 0 0 1 48 0 v${c.h} z`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.4"
            />
            <path
              d={`M${c.x - 24} ${156 - c.h * 0.35} a24 24 0 0 0 48 0`}
              fill="var(--accent)"
              opacity=".1"
            />
          </motion.g>
        ))}
        <text x="92" y="180" fill="var(--muted)" fontSize="9" letterSpacing="2">
          ВАКУУМ
        </text>
      </svg>
    </div>
  )
}
