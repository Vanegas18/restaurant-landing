// Horario en hora de Colombia (UTC-5, sin horario de verano). 0 = domingo
export const HOURS: Record<number, [number, number]> = {
  0: [12 * 60, 22 * 60],
  1: [12 * 60, 22 * 60 + 30],
  2: [12 * 60, 22 * 60 + 30],
  3: [12 * 60, 22 * 60 + 30],
  4: [12 * 60, 22 * 60 + 30],
  5: [12 * 60, 23 * 60 + 30],
  6: [12 * 60, 23 * 60 + 30],
}

export const HOURS_TABLE = [
  { days: 'Lunes a jueves', time: '12 m. – 10:30 p. m.' },
  { days: 'Viernes y sábado', time: '12 m. – 11:30 p. m.' },
  { days: 'Domingo y festivos', time: '12 m. – 10 p. m.' },
]

const fmt = (m: number) => {
  const h = Math.floor(m / 60)
  const min = m % 60
  if (h === 12 && min === 0) return '12 m.'
  const h12 = h > 12 ? h - 12 : h
  return `${h12}${min ? ':' + String(min).padStart(2, '0') : ''} ${h >= 12 ? 'p. m.' : 'a. m.'}`
}

export function openStatus(now = new Date()) {
  const bogota = new Date(now.getTime() + (now.getTimezoneOffset() - 300) * 60000)
  const day = bogota.getDay()
  const minutes = bogota.getHours() * 60 + bogota.getMinutes()
  const [open, close] = HOURS[day]
  if (minutes >= open && minutes < close) return { open: true, label: `Abierto · cierra ${fmt(close)}` }
  if (minutes < open) return { open: false, label: `Cerrado · abre hoy ${fmt(open)}` }
  return { open: false, label: `Cerrado · abre mañana ${fmt(HOURS[(day + 1) % 7][0])}` }
}
