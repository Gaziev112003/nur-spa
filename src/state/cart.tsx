import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { SERVICES, type Direction, type Service } from '../data/services'

const KEY = 'nur-cart-v1'

type CartCtx = {
  ids: string[]
  items: (Service & { direction: Direction })[]
  total: number
  count: number
  has: (id: string) => boolean
  toggle: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}

const Ctx = createContext<CartCtx | null>(null)

const ALL = (Object.keys(SERVICES) as Direction[]).flatMap((d) =>
  SERVICES[d].map((s) => ({ ...s, direction: d })),
)

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr.filter((id) => ALL.some((s) => s.id === id)) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(read)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      /* приватный режим — корзина живёт до перезагрузки */
    }
  }, [ids])

  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), [])
  const clear = useCallback(() => setIds([]), [])

  const value = useMemo<CartCtx>(() => {
    const items = ids.map((id) => ALL.find((s) => s.id === id)!).filter(Boolean)
    return {
      ids,
      items,
      total: items.reduce((sum, s) => sum + s.price, 0),
      count: items.length,
      has: (id) => ids.includes(id),
      toggle,
      remove,
      clear,
    }
  }, [ids, toggle, remove, clear])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart вне CartProvider')
  return ctx
}

export function formatPrice(n: number) {
  return n.toLocaleString('ru-RU').replace(/ /g, ' ') + ' ₽'
}
