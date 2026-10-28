import { Minus, Plus } from 'lucide-react'

interface Props {
  name: string
  qty: number
  onAdd: () => void
  onSub: () => void
  tone?: 'dark' | 'paper'
}

// Si no hay unidades muestra "Agregar"; si hay, el contador. Siempre 44px de alto.
export function Stepper({ name, qty, onAdd, onSub, tone = 'dark' }: Props) {
  const border = tone === 'paper' ? 'border-carbon' : 'border-papel/60 hover:border-mostaza'
  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className="titular flex h-11 cursor-pointer items-center gap-1.5 bg-mostaza px-4 text-xl tracking-[0.04em] text-carbon transition-transform active:translate-y-px"
      >
        <Plus className="size-4" strokeWidth={3} aria-hidden="true" />
        Agregar<span className="sr-only"> {name}</span>
      </button>
    )
  }
  return (
    <div role="group" aria-label={`Cantidad de ${name}`} className="flex items-center">
      <button type="button" onClick={onSub} aria-label={`Quitar un ${name}`} className={`flex size-11 cursor-pointer items-center justify-center border ${border}`}>
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span className="w-9 text-center text-base" aria-live="polite">{qty}</span>
      <button type="button" onClick={onAdd} aria-label={`Agregar otro ${name}`} className={`flex size-11 cursor-pointer items-center justify-center border ${border}`}>
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
