import { Body1 } from './bodies/body1'
import { Body2 } from './bodies/body2'
import { Body3 } from './bodies/body3'
import { VariantRouter } from './variants'

declare global {
  interface Window {
    __VARIANT__?: number
    __BODY__?: string
  }
}

// /variants/N/ — черновики первого экрана; ?body=A|B|C — варианты тела на выбранной эстетике
export function Root() {
  const body = new URLSearchParams(location.search).get('body') ?? window.__BODY__
  if (body === 'A') return <Body1 />
  if (body === 'B') return <Body2 />
  if (body === 'C') return <Body3 />
  return <VariantRouter />
}
