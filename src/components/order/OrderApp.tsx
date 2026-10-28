import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES, MENU, formatCOP, type MenuItem, type PhotoKey } from '../../lib/menu'
import { Stepper } from './Stepper'
import { Ticket } from './Ticket'
import { useComanda, type Comanda } from './useComanda'

export type Photo = { src: string; srcSet: string; width: number; height: number; alt: string }

function PhotoCard({ item, photo, c, wide }: { item: MenuItem; photo: Photo; c: Comanda; wide?: boolean }) {
  return (
    <article
      aria-labelledby={`m-${item.id}`}
      className={`group border border-linea bg-brasa ${wide ? 'flex flex-col sm:col-span-2 sm:grid sm:grid-cols-2' : 'grid grid-cols-[7.5rem_1fr] sm:flex sm:flex-col'}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes={wide ? '(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw'}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${wide ? 'aspect-[4/3] sm:h-full sm:aspect-auto' : 'h-full aspect-square sm:h-auto sm:aspect-[4/3]'}`}
        />
        {item.tag && (
          <span className="absolute top-3 left-3 bg-mostaza px-2 py-1 text-[11px] tracking-wider text-carbon uppercase">{item.tag}</span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-5">
        <div className="flex flex-col gap-x-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h4 id={`m-${item.id}`} className={`titular ${wide ? 'text-4xl' : 'text-2xl sm:text-3xl'}`}>{item.name}</h4>
          <span className="shrink-0 tabular-nums text-mostaza sm:text-lg sm:text-papel">{formatCOP(item.price)}</span>
        </div>
        <p className={`mt-1.5 flex-1 text-[13px] leading-relaxed text-ceniza ${wide ? '' : 'line-clamp-2 sm:line-clamp-none'}`}>{item.description}</p>
        <div className="mt-3 flex justify-end sm:mt-4">
          <Stepper name={item.name} qty={c.qtyOf(item.id)} onAdd={() => c.add(item.id)} onSub={() => c.sub(item.id)} />
        </div>
      </div>
    </article>
  )
}

function Row({ item, c }: { item: MenuItem; c: Comanda }) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-b border-dashed border-linea py-4">
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h4 className="titular text-2xl">{item.name}</h4>
          <span className="tabular-nums text-mostaza">{formatCOP(item.price)}</span>
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-ceniza">{item.description}</p>
      </div>
      <Stepper name={item.name} qty={c.qtyOf(item.id)} onAdd={() => c.add(item.id)} onSub={() => c.sub(item.id)} />
    </li>
  )
}

export default function OrderApp({ photos }: { photos: Record<PhotoKey, Photo> }) {
  const c = useComanda()
  const dialog = useRef<HTMLDialogElement>(null)

  // Cierra el panel móvil si se agranda la pantalla (la comanda ya está a la vista)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && dialog.current?.close()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <section id="menu" aria-labelledby="menu-title" className="scroll-mt-16 border-t border-linea">
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-10 lg:px-10 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="menu-title" className="titular text-6xl lg:text-8xl">El menú</h2>
            <p className="max-w-xs text-[13px] text-ceniza">Todo sale de la parrilla al carbón. Precios con IVA incluido.</p>
          </div>

          <nav aria-label="Categorías del menú" className="sticky top-16 z-20 -mx-4 mt-6 border-y border-linea bg-carbon px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            <ul className="flex gap-1 overflow-x-auto py-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a href={`#cat-${cat.id}`} className="flex h-11 items-center px-3 text-[13px] tracking-wider whitespace-nowrap uppercase hover:text-mostaza">
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {CATEGORIES.map((cat) => {
            const items = MENU.filter((m) => m.category === cat.id)
            const withPhoto = items.filter((m) => m.photo)
            const rows = items.filter((m) => !m.photo)
            return (
              <section key={cat.id} id={`cat-${cat.id}`} aria-labelledby={`h-${cat.id}`} className="scroll-mt-32 pt-10">
                <h3 id={`h-${cat.id}`} className="flex items-baseline gap-3 text-[13px] tracking-[0.14em] text-ceniza uppercase">
                  {cat.label}
                  <span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-linea" />
                </h3>
                {withPhoto.length > 0 && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {withPhoto.map((m, i) => (
                      <PhotoCard key={m.id} item={m} photo={photos[m.photo!]} c={c} wide={i === 0} />
                    ))}
                  </div>
                )}
                {rows.length > 0 && (
                  <ul className={withPhoto.length ? 'mt-2' : 'mt-2'}>
                    {rows.map((m) => (
                      <Row key={m.id} item={m} c={c} />
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </div>

        {/* Escritorio: la comanda siempre visible mientras se elige */}
        <aside aria-label="Tu comanda" className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-24">
            <Ticket c={c} idPrefix="d" />
          </div>
        </aside>
      </div>

      {/* Móvil: barra fija + comanda en panel inferior */}
      {c.count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-linea bg-carbon px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden">
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            className="titular flex h-13 w-full cursor-pointer items-center justify-between bg-mostaza px-4 text-2xl tracking-[0.04em] text-carbon"
          >
            <span>Ver comanda ({c.count})</span>
            <span className="font-mono text-base font-medium tracking-normal normal-case">{formatCOP(c.total)}</span>
          </button>
        </div>
      )}
      {c.count > 0 && <div aria-hidden="true" className="h-20 lg:hidden" />}

      <dialog
        ref={dialog}
        aria-label="Tu comanda"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-0 mt-auto max-h-[92dvh] w-full max-w-full overflow-y-auto bg-transparent p-0 backdrop:bg-carbon/70 open:animate-[imprimir_300ms_ease-out] lg:hidden"
      >
        <div className="sticky top-0 z-10 flex justify-end bg-carbon/0 px-3 pt-3">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Cerrar comanda"
            className="flex size-11 cursor-pointer items-center justify-center bg-carbon text-papel"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Ticket c={c} idPrefix="m" />
        </div>
      </dialog>
    </section>
  )
}
