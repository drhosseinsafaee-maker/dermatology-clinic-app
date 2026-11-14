import { Link } from '@tanstack/react-router'
import {
  CalendarHeart,
  Crown,
  Home,
  Images,
  Phone,
  Sparkles,
} from 'lucide-react'

import { clinic } from '@/data/clinic'

const tabs = [
  { to: '/', label: 'خانه', icon: Home },
  { to: '/services', label: 'خدمات', icon: Sparkles },
  { to: '/booking', label: 'نوبت', icon: CalendarHeart, primary: true },
  { to: '/gallery', label: 'نمونه‌کار', icon: Images },
  { to: '/club', label: 'باشگاه', icon: Crown },
] as const

export function img(file: string, w: number) {
  return `/.netlify/images?url=/img/${file}&w=${w}&fm=webp&q=75`
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-3">
            <img src="/icon.svg" alt="" className="size-9 rounded-xl" />
            <div className="leading-tight">
              <div className="text-[15px] font-bold">{clinic.doctor}</div>
              <div className="text-[11px] text-muted-foreground">
                {clinic.title}
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {tabs.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                activeOptions={{ exact: t.to === '/' }}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
              >
                {t.label}
              </Link>
            ))}
          </nav>
          <a
            href={`tel:${clinic.phones[0].tel}`}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <Phone className="size-4" />
            <span className="hidden sm:inline">تماس</span>
          </a>
        </div>
      </header>

      <main className="pb-28 md:pb-12">{children}</main>

      <footer className="hidden border-t border-border/60 py-8 text-center text-sm text-muted-foreground md:block">
        <p>{clinic.address}</p>
        <p className="mt-1">{clinic.hours}</p>
      </footer>

      <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-card/95 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 px-2 pt-2 pb-2">
          {tabs.map((t) => {
            const Icon = t.icon
            if ('primary' in t)
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className="-mt-7 flex flex-col items-center gap-1 text-[11px] font-medium text-primary"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-background">
                    <Icon className="size-6" />
                  </span>
                  {t.label}
                </Link>
              )
            return (
              <Link
                key={t.to}
                to={t.to}
                activeOptions={{ exact: t.to === '/' }}
                className="group flex flex-col items-center gap-1 py-1 text-[11px] text-muted-foreground data-[status=active]:text-primary"
              >
                <Icon className="size-5 transition group-data-[status=active]:scale-110" />
                {t.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
