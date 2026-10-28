import { useEffect, useState } from 'react'
import { DELIVERY_ZONES, PAYMENT_METHODS, formatTicket } from '../../lib/menu'
import { orderMessage } from '../../lib/whatsapp'
import { openStatus } from '../../lib/hours'
import { Stepper } from './Stepper'
import type { Comanda } from './useComanda'

const Rule = () => <div aria-hidden="true" className="my-3 border-t border-dashed border-carbon/60" />
const Row = ({ l, r, strong }: { l: React.ReactNode; r: React.ReactNode; strong?: boolean }) => (
  <div className={`flex items-baseline justify-between gap-3 ${strong ? 'text-lg font-medium' : ''}`}>
    <span>{l}</span>
    <span className="tabular-nums">{r}</span>
  </div>
)

export function Ticket({ c, idPrefix }: { c: Comanda; idPrefix: string }) {
  const [now, setNow] = useState<{ time: string; status: ReturnType<typeof openStatus> } | null>(null)
  useEffect(() => {
    const d = new Date()
    setNow({
      time: d.toLocaleString('es-CO', { timeZone: 'America/Bogota', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
      status: openStatus(d),
    })
  }, [])

  const empty = c.lines.length === 0
  const href = orderMessage({
    ticket: c.ticket,
    lines: c.lines,
    zone: c.zoneLabel,
    fee: c.fee,
    payment: c.payment,
    note: c.note,
    total: c.total,
  })

  return (
    <div className="tiquete sobre-papel bg-papel px-5 py-7 text-[13px] leading-relaxed text-carbon">
      <div className="text-center">
        <p className="titular text-3xl tracking-[0.06em]">Carbón</p>
        <p className="text-[11px] text-humo">LA 70, LAURELES · MEDELLÍN</p>
      </div>
      <Rule />
      <Row l={<span className="font-medium">COMANDA #{c.ticket}</span>} r={now?.time ?? ''} />
      <Rule />

      {empty ? (
        <p className="py-4 text-center text-humo">
          Tu comanda está vacía.
          <br />
          Agrega algo del menú.
        </p>
      ) : (
        <ul className="space-y-2.5" aria-label="Productos en la comanda">
          {c.lines.map((l) => (
            <li key={l.id} className="imprimir">
              <p>{l.qty} × {l.name.toUpperCase()}</p>
              <div className="mt-1 flex items-center justify-between">
                <Stepper tone="paper" name={l.name} qty={l.qty} onAdd={() => c.add(l.id)} onSub={() => c.sub(l.id)} />
                <span className="tabular-nums">{formatTicket(l.total)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Rule />
      <div className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-[11px] tracking-wider text-humo uppercase">Entrega</span>
          <select
            id={`${idPrefix}-zona`}
            value={c.zone}
            onChange={(e) => c.setZone(e.target.value)}
            className="h-11 w-full cursor-pointer border border-carbon bg-papel px-2 text-[15px]"
          >
            {DELIVERY_ZONES.map((z) => (
              <option key={z.id} value={z.id}>
                {z.label} {z.fee ? `· $ ${formatTicket(z.fee)}` : '· sin costo'}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend className="text-[11px] tracking-wider text-humo uppercase">Pago</legend>
          <div className="mt-1 grid grid-cols-3 gap-1">
            {PAYMENT_METHODS.map((p) => (
              <label key={p} className="relative cursor-pointer">
                <input type="radio" name={`${idPrefix}-pago`} value={p} checked={c.payment === p} onChange={() => c.setPayment(p)} className="peer sr-only" />
                <span className="flex min-h-11 items-center justify-center border border-carbon px-1 text-center text-[12px] leading-tight peer-checked:bg-carbon peer-checked:text-papel peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-carbon">
                  {p}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="grid gap-1">
          <span className="text-[11px] tracking-wider text-humo uppercase">Nota para la cocina (opcional)</span>
          <input
            value={c.note}
            onChange={(e) => c.setNote(e.target.value)}
            placeholder="Sin cebolla, salsas aparte…"
            maxLength={120}
            className="h-11 w-full border border-carbon bg-papel px-2 text-[15px] placeholder:text-humo"
          />
        </label>
      </div>

      <Rule />
      <Row l="SUBTOTAL" r={formatTicket(c.subtotal)} />
      <Row l={c.fee ? `DOMICILIO ${c.zoneLabel.toUpperCase()}` : 'ENTREGA'} r={c.fee ? formatTicket(empty ? 0 : c.fee) : 'RECOGE'} />
      <Rule />
      <Row strong l="TOTAL" r={`$ ${formatTicket(c.total)}`} />

      {now && !now.status.open && (
        <p className="mt-3 border border-carbon p-2 text-[12px]">
          {now.status.label.replace(/\.$/, "")}. Puedes enviar la comanda y te la confirmamos apenas abramos.
        </p>
      )}

      <a
        href={empty ? undefined : href}
        aria-disabled={empty}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => empty && e.preventDefault()}
        className={`titular mt-4 flex h-14 items-center justify-center gap-2 border-2 border-carbon text-xl tracking-[0.04em] ${
          empty ? 'cursor-not-allowed bg-transparent text-humo' : 'bg-mostaza text-carbon hover:-translate-y-0.5'
        } transition-transform`}
      >
        Enviar comanda por WhatsApp
      </a>
      <p className="mt-2 text-center text-[11px] text-humo">Te respondemos con el tiempo de entrega. Sin apps ni registro.</p>
    </div>
  )
}
