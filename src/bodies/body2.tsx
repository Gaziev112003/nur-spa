// Тело B. Прайс горизонтальными карточками вверху, факты двумя колонками, первый экран компактный.
import { motion } from 'framer-motion'
import { SERVICES, type Direction } from '../data/services'
import { formatPrice, useCart } from '../state/cart'
import { DirectionArt } from '../components/DirectionArt'
import { FactCards } from '../components/FactCards'
import { Hero } from '../components/Hero'
import { AppShell } from '../components/AppShell'

function PriceStrip({ direction }: { direction: Direction }) {
  const { has, toggle } = useCart()
  return (
    <div className="strip">
      {SERVICES[direction].map((s) => (
        <motion.button
          key={s.id}
          className={has(s.id) ? 'strip__card strip__card--on' : 'strip__card'}
          onClick={() => toggle(s.id)}
          aria-pressed={has(s.id)}
          whileTap={{ scale: 0.97 }}
        >
          <span className="strip__name">{s.name}</span>
          <span className="strip__mins">{s.minutes} мин</span>
          <span className="strip__price">{formatPrice(s.price)}</span>
          <span className="strip__mark">{has(s.id) ? 'в списке' : 'добавить'}</span>
        </motion.button>
      ))}
    </div>
  )
}

export function Body2() {
  return (
    <AppShell
      body={({ direction }) => (
        <>
          <Hero direction={direction} />
          <section className="section">
            <h2 className="section__title">Процедуры</h2>
            <div className="stripwrap">
              <PriceStrip direction={direction} />
            </div>
          </section>
          <section className="section section--split">
            <h2 className="section__title">Коротко о главном</h2>
            <FactCards direction={direction} />
          </section>
        </>
      )}
      side={(d) => (
        <div className="side side--art">
          <div className="side__frame">
            <DirectionArt direction={d as Direction} />
          </div>
        </div>
      )}
    />
  )
}
