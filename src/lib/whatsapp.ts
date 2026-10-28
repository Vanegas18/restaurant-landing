import { formatCOP } from './menu'

export const WHATSAPP_NUMBER = '573006764605'
export const BRAND = 'Carbón'

export const waLink = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const GENERAL_MESSAGE = waLink(`Hola ${BRAND}, quiero hacer un pedido a domicilio.`)

interface OrderLine {
  qty: number
  name: string
  total: number
}

export function orderMessage(o: {
  ticket: string
  lines: OrderLine[]
  zone: string
  fee: number
  payment: string
  note: string
  total: number
}) {
  const pickup = o.fee === 0 && o.zone.startsWith('Recojo')
  return waLink(
    [
      `Hola ${BRAND}, quiero hacer este pedido (comanda #${o.ticket}):`,
      ...o.lines.map((l) => `• ${l.qty} × ${l.name} — ${formatCOP(l.total)}`),
      pickup ? 'Entrega: recojo en el local' : `Domicilio ${o.zone}: ${formatCOP(o.fee)}`,
      `Total: ${formatCOP(o.total)}`,
      `Pago: ${o.payment}`,
      o.note.trim() ? `Nota: ${o.note.trim()}` : '',
      pickup ? '¿En cuánto tiempo lo recojo?' : 'Mi dirección es: ',
    ]
      .filter(Boolean)
      .join('\n'),
  )
}
