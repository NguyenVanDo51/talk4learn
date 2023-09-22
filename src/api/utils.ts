export function cleanInput(s: any) {
  if (typeof s === 'undefined') return ''
  if (s === null) return ''
  return s.trim()
}
