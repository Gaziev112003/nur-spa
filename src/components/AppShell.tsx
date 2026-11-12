import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Direction } from '../data/services'
import { CartProvider } from '../state/cart'
import { IntroScreen } from './IntroScreen'
import { Frame } from './Frame'
import { Tabs } from './Tabs'
import { FloatingCartBar } from './FloatingCartBar'
import { BookingBottomSheet } from './BookingBottomSheet'
import { Footer } from './Footer'

export function AppShell({
  body,
  side,
  stickyTabs = true,
}: {
  body: (args: { direction: Direction; setDirection: (d: Direction) => void }) => JSX.Element
  side?: (d: Direction) => React.ReactNode
  stickyTabs?: boolean
}) {
  const [intro, setIntro] = useState(true)
  const [direction, setDirection] = useState<Direction>('hijama')
  const [sheet, setSheet] = useState(false)

  return (
    <CartProvider>
      <div className="app" data-theme={direction}>
        <AnimatePresence>{intro && <IntroScreen key="intro" onDone={() => setIntro(false)} />}</AnimatePresence>

        <Frame side={side?.(direction)}>
          <div className={stickyTabs ? 'tabsbar tabsbar--sticky' : 'tabsbar'}>
            <Tabs value={direction} onChange={setDirection} />
          </div>
          <motion.div
            key={direction}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {body({ direction, setDirection })}
          </motion.div>
          <Footer onBook={() => setSheet(true)} />
        </Frame>

        <FloatingCartBar onOpen={() => setSheet(true)} />
        <BookingBottomSheet open={sheet} onClose={() => setSheet(false)} />
      </div>
    </CartProvider>
  )
}
