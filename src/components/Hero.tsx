import type { Direction } from '../data/services'
import { DirectionArt } from './DirectionArt'

const COPY: Record<Direction, { title: string; lede: string; sign: string }> = {
  laser: {
    title: 'Волосок убираем у корня, а кожу держим холодной',
    lede: 'Диодный лазер с сапфировой насадкой: импульс доходит до луковицы, поверхность кожи остаётся прохладной. Без анестезии, с одноразовыми расходниками.',
    sign: 'Лазер',
  },
  plasma: {
    title: 'Подтягиваем кожу без разреза и без иглы',
    lede: 'Холодная плазма работает над поверхностью кожи: тонкая дуга снимает верхний слой и запускает обновление. Чаще всего просят веко и контур лица.',
    sign: 'Плазма',
  },
  hijama: {
    title: 'Разгоняем кровь там, где тело застоялось',
    lede: 'Хиджама по Сунне: точечные насечки и вакуумные банки. Одноразовые лезвия, стерильные банки, разговор о самочувствии до процедуры.',
    sign: 'Хиджама',
  },
}

export function Hero({ direction }: { direction: Direction }) {
  const c = COPY[direction]
  return (
    <header className="hero">
      <div className="hero__arch">
        <DirectionArt direction={direction} />
      </div>
      <h1 className="hero__title">{c.title}</h1>
      <p className="hero__lede">{c.lede}</p>
    </header>
  )
}
