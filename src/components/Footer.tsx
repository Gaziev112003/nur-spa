import { VisitorCounters } from './VisitorCounters'
import { WHATSAPP_NUMBER, TELEGRAM_HANDLE } from '../lib/message'

export function Footer({ onBook }: { onBook: () => void }) {
  return (
    <footer className="footer">
      <div className="footer__cta">
        <p>Осталось выбрать удобное время</p>
        <button className="btn btn--primary" onClick={onBook}>
          Оформить запись
        </button>
      </div>

      <div className="footer__contacts">
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
          WhatsApp +7 928 805-96-74
        </a>
        <a href={`https://t.me/${TELEGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer">
          Telegram @{TELEGRAM_HANDLE}
        </a>
      </div>

      <VisitorCounters />

      <small className="footer__note">
        NUR SPA, студия эстетики и оздоровления. Дагестан. Цены указаны за один сеанс и требуют подтверждения
        перед визитом.
      </small>
    </footer>
  )
}
