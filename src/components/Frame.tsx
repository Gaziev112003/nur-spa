import type { ReactNode } from 'react'
import { Logo, TABS } from './Logo'

export function Frame({
  children,
  side,
}: {
  children: ReactNode
  side?: ReactNode
}) {
  return (
    <>
      <aside className="backdrop" aria-hidden="true">
        {side}
      </aside>
      <div className="column">
        <div className="topbar">
          <div className="topbar__brand">
            <Logo size={26} />
            <b>NUR</b>
          </div>
          <span className="topbar__place">Дагестан</span>
        </div>
        {children}
      </div>
    </>
  )
}

export { TABS }
