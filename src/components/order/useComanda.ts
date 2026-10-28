import { useEffect, useMemo, useState } from 'react'
import { DELIVERY_ZONES, MENU, PAYMENT_METHODS } from '../../lib/menu'

const KEY = 'carbon:comanda:v1'

type Qty = Record<string, number>

export function useComanda() {
  const [qty, setQty] = useState<Qty>({})
  const [zone, setZone] = useState<string>('laureles')
  const [payment, setPayment] = useState<string>(PAYMENT_METHODS[0])
  const [note, setNote] = useState('')
  const [ticket, setTicket] = useState('0000')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
      if (saved) {
        setQty(saved.qty ?? {})
        setZone(saved.zone ?? 'laureles')
        setPayment(saved.payment ?? PAYMENT_METHODS[0])
        setNote(saved.note ?? '')
      }
    } catch {}
    setTicket(String(Math.floor(1000 + Math.random() * 9000)))
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(KEY, JSON.stringify({ qty, zone, payment, note }))
    } catch {}
  }, [qty, zone, payment, note, ready])

  const lines = useMemo(
    () =>
      MENU.filter((m) => (qty[m.id] ?? 0) > 0).map((m) => ({
        id: m.id,
        name: m.name,
        qty: qty[m.id],
        price: m.price,
        total: m.price * qty[m.id],
      })),
    [qty],
  )

  const zoneData = DELIVERY_ZONES.find((z) => z.id === zone) ?? DELIVERY_ZONES[1]
  const subtotal = lines.reduce((n, l) => n + l.total, 0)
  const count = lines.reduce((n, l) => n + l.qty, 0)

  return {
    lines,
    count,
    subtotal,
    fee: zoneData.fee,
    zoneLabel: zoneData.label,
    total: subtotal + (count ? zoneData.fee : 0),
    zone,
    setZone,
    payment,
    setPayment,
    note,
    setNote,
    ticket,
    qtyOf: (id: string) => qty[id] ?? 0,
    add: (id: string) => setQty((q) => ({ ...q, [id]: Math.min((q[id] ?? 0) + 1, 20) })),
    sub: (id: string) => setQty((q) => ({ ...q, [id]: Math.max((q[id] ?? 0) - 1, 0) })),
    clear: () => setQty({}),
  }
}

export type Comanda = ReturnType<typeof useComanda>
