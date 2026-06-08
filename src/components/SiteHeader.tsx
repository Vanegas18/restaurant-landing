import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { WhatsAppIcon } from '@/components/WhatsAppIcon'
import { buildWhatsAppUrl, DEFAULT_MESSAGE } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Menú', href: '#menu' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Ubicación', href: '#ubicacion' },
]

const waUrl = buildWhatsAppUrl(DEFAULT_MESSAGE)

const whatsappBtnClass = cn(
  'inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2',
  'text-sm font-medium bg-[#25D366] text-black hover:bg-[#1fbb57] transition-colors'
)

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-black text-primary-foreground">
            S
          </span>
          <span className="text-lg font-bold tracking-tight">
            Sabor<span className="text-primary">Express</span>
          </span>
        </a>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(whatsappBtnClass, 'hidden sm:inline-flex')}
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      {open && (
        <nav className="border-t border-border/60 bg-background px-4 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(whatsappBtnClass, 'mt-2 w-full justify-center')}
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir por WhatsApp
          </a>
        </nav>
      )}
    </header>
  )
}