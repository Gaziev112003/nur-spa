// Тело C. Прайс как «меню» с группировкой и счётчиком выбора, факты — строками-лентой, первый экран с аркой.
import { motion } from 'framer-motion'
import { SERVICES, DIRECTIONS, type Direction } from '../data/services'
import { formatPrice, useCart } from '../state/cart'
import { Hero } from '../components/Hero'
import { FactCards } from '../components/FactCards'
import { AppShell } from '../components/AppShell'

function Menu({ direction, onPick }: { direction: Direction; onPick: (d: Direction) => void }) {
  const { has, toggle } = useCart()
  const row = SERVICES[direction]
  const chosen = row.filter((s) => has(s.id)).length

  return (
    <section className="section">
      <div className="menu__head">
        <h2 className="section__title">Меню студии</h2>
        <span className="menu__meta">
          {chosen} из {row.length}
        </span>
      </div>
      <ul className="menu">
        {row.map((s, i) => (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.2 }}
          >
            <button
              className={has(s.id) ? 'menu__row menu__row--on' : 'menu__row'}
              onClick={() => toggle(s.id)}
              aria-pressed={has(s.id)}
            >
              <span className="menu__name">{s.name}</span>
              <span className="menu__dots" aria-hidden="true" />
              <span className="menu__price">{formatPrice(s.price)}</span>
              <span className="menu__note">{s.note}</span>
            </button>
          </motion.li>
        ))}
      </ul>
      <div className="menu__switch">
        {DIRECTIONS.filter((d) => d.id !== direction).map((d) => (
          <button key={d.id} className="btn btn--ghost" onClick={() => onPick(d.id)}>
            Показать: {d.label.toLowerCase()}
          </button>
        ))}
      </div>
    </section>
  )
}

export function Body3() {
  return (
    <AppShell
      stickyTabs={false}
      body={({ direction, setDirection }) => (
        <>
          <Hero direction={direction} />
          <Menu direction={direction} onPick={setDirection} />
          <section className="section">
            <h2 className="section__title">Стерильность, противопоказания и остальное</h2>
            <FactCards direction={direction} />
          </section>
        </>
      )}
      side={() => <div className="side side--orn" />}
    />
  )
}
