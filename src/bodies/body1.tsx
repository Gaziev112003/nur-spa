// Тело A. Сверху вниз: первый экран → раскрывающиеся факты → прайс списком → запись.
import { Hero } from '../components/Hero'
import { FactCards } from '../components/FactCards'
import { PriceList } from '../components/PriceList'
import { AppShell } from '../components/AppShell'

export function Body1() {
  return (
    <AppShell
      body={({ direction }) => (
        <>
          <Hero direction={direction} />
          <section className="section">
            <h2 className="section__title">Что важно знать до процедуры</h2>
            <FactCards direction={direction} />
          </section>
          <section className="section">
            <h2 className="section__title">Выберите процедуры</h2>
            <p className="section__hint">Цена за один сеанс. Можно отметить в любом направлении.</p>
            <PriceList direction={direction} />
          </section>
        </>
      )}
      side={(d) => <Side d={d} />}
    />
  )
}

function Side({ d }: { d: string }) {
  return (
    <div className="side">
      <span className="side__num">{d === 'laser' ? '01' : d === 'plasma' ? '02' : '03'}</span>
      <svg viewBox="0 0 400 400" className="side__rings">
        {[80, 130, 180, 230, 280].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="var(--gold)" strokeWidth="1" opacity=".5" />
        ))}
      </svg>
      <span className="side__label">
        {d === 'laser' ? 'Эстетика' : d === 'plasma' ? 'Лазер' : 'Хиджама'}
      </span>
    </div>
  )
}
