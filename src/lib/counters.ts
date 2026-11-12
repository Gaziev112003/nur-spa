// Счётчики посещаемости: counterapi.dev, фоллбэк — localStorage. Стартуем с нуля, без выдуманных чисел.

const NS = 'nur-spa-dagestan'
const KEY_TOTAL = 'nur-visits-total'
const KEY_MARK = 'nur-visited'

export type Counters = { unique: number; total: number; live: boolean }

function local(key: string) {
  try {
    return Number(localStorage.getItem(key) ?? 0) || 0
  } catch {
    return 0
  }
}

function setLocal(key: string, v: number) {
  try {
    localStorage.setItem(key, String(v))
  } catch {
    /* приватный режим */
  }
}

async function hit(name: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.counterapi.dev/v1/${NS}/${name}/up`, { method: 'GET' })
    if (!res.ok) return null
    const data = (await res.json()) as { count?: number }
    return typeof data.count === 'number' ? data.count : null
  } catch {
    return null
  }
}

async function readCount(name: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.counterapi.dev/v1/${NS}/${name}`)
    if (!res.ok) return null
    const data = (await res.json()) as { count?: number }
    return typeof data.count === 'number' ? data.count : null
  } catch {
    return null
  }
}

let cached: Promise<Counters> | null = null

export function trackVisit(): Promise<Counters> {
  if (cached) return cached
  cached = (async () => {
    let isNew = false
    try {
      isNew = !localStorage.getItem(KEY_MARK)
      localStorage.setItem(KEY_MARK, new Date().toISOString())
    } catch {
      isNew = true
    }

    // локальный счёт растёт всегда — даже если API недоступен
    const localTotal = local(KEY_TOTAL) + 1
    setLocal(KEY_TOTAL, localTotal)

    const [totalApi, uniqueApi] = await Promise.all([
      hit('visits'),
      isNew ? hit('guests') : readCount('guests'),
    ])

    const live = totalApi !== null && uniqueApi !== null
    return {
      total: Math.max(totalApi ?? 0, localTotal),
      unique: Math.max(uniqueApi ?? 0, isNew ? 1 : 0),
      live,
    }
  })()
  return cached
}
