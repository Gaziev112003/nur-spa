import { useEffect, useRef, useState } from 'react'
import { trackVisit, type Counters } from '../lib/counters'

function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!run || target <= 0) {
      if (run) setValue(target)
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 1100
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run])
  return value
}

export function VisitorCounters() {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  const [data, setData] = useState<Counters | null>(null)

  useEffect(() => {
    trackVisit().then(setData)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const unique = useCountUp(data?.unique ?? 0, seen)
  const total = useCountUp(data?.total ?? 0, seen)

  return (
    <div className="counters" ref={ref}>
      <div className="counters__cell">
        <b>{unique.toLocaleString('ru-RU').replace(/ /g, ' ')}</b>
        <small>уникальных гостей</small>
      </div>
      <div className="counters__cell">
        <b>{total.toLocaleString('ru-RU').replace(/ /g, ' ')}</b>
        <small>всего посещений</small>
      </div>
    </div>
  )
}
