import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Logo } from './Logo'

const PATH =
  'M68 24C48.1177 24 32 40.1177 32 60C32 79.8823 48.1177 96 68 96C75.5 96 82.4 93.7 88 89.8C76.5 87.5 68 77.3 68 65C68 51.2 79.2 40 93 40C94.4 40 95.7 40.1 97 40.3C90.6 30.5 80.1 24 68 24Z'

export function IntroScreen({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setGone(true), reduce ? 250 : 1900)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="intro"
      initial={{ y: 0 }}
      animate={gone ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
      onAnimationComplete={() => gone && onDone()}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" width="120" height="120" fill="none" className="intro__mark">
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="3 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.45 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />
        <motion.path
          d={PATH}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.05, ease: 'easeInOut' }}
        />
        <motion.path
          d="M84 22L86 28L92 30L86 32L84 38L82 32L76 30L82 28L84 22Z"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.35 }}
          style={{ transformOrigin: '84px 30px' }}
        />
      </svg>

      <motion.div
        className="intro__text"
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <b>NUR SPA</b>
        <small>Эстетика / Лазер / Хиджама</small>
      </motion.div>

      <Logo size={0} className="intro__spacer" />
    </motion.div>
  )
}
