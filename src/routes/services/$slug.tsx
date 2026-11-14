import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import {
  AlertTriangle,
  CalendarHeart,
  CheckCircle2,
  ChevronDown,
  Clock,
  Hourglass,
  Layers,
  Moon,
  Phone,
  ShieldPlus,
} from 'lucide-react'
import { useState } from 'react'

import { img } from '@/components/app-shell'
import { categories, clinic, getService } from '@/data/clinic'

export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => {
    const service = getService(params.slug)
    if (!service) throw notFound()
    return service
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? 'خدمات'} | دکتر حسین صفائی` },
      { name: 'description', content: loaderData?.short ?? '' },
    ],
  }),
  component: ServiceDetail,
})

const tabs = [
  { id: 'about', label: 'معرفی' },
  { id: 'before', label: 'قبل از درمان' },
  { id: 'after', label: 'بعد از درمان' },
  { id: 'risks', label: 'عوارض و کنترل' },
  { id: 'faq', label: 'پرسش‌ها' },
] as const

type Tab = (typeof tabs)[number]['id']

function ServiceDetail() {
  const s = Route.useLoaderData()
  const [tab, setTab] = useState<Tab>('about')
  const [open, setOpen] = useState<number | null>(0)
  const category = categories.find((c) => c.id === s.category)!

  const stats = [
    { icon: Clock, label: 'مدت', value: s.duration },
    { icon: Layers, label: 'تعداد جلسات', value: s.sessions },
    { icon: Moon, label: 'دوره نقاهت', value: s.downtime },
    { icon: Hourglass, label: 'ماندگاری', value: s.lasts },
  ]

  return (
    <div className="mx-auto max-w-content md:px-5 md:pt-6">
      <div className="relative h-64 overflow-hidden md:h-80 md:rounded-[2rem]">
        <img
          src={img(category.image, 1200)}
          alt={s.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <Link
            to="/services"
            search={{ c: s.category }}
            className="text-xs text-white/70 hover:text-white"
          >
            {category.title}
          </Link>
          <div className="font-latin text-lg italic text-accent">{s.latin}</div>
          <h1 className="text-2xl font-extrabold md:text-4xl">{s.title}</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
            {s.short}
          </p>
        </div>
      </div>

      <div className="px-5 md:px-0">
        <div className="-mt-6 relative grid grid-cols-2 gap-2 rounded-3xl border border-border/70 bg-card p-3 shadow-sm md:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2 rounded-2xl p-2">
              <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <div className="text-[11px] text-muted-foreground">{label}</div>
                <div className="text-[13px] leading-5 font-semibold">{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="no-scrollbar sticky top-16 z-30 -mx-5 mt-6 flex gap-1 overflow-x-auto bg-background/90 px-5 py-2 backdrop-blur md:mx-0 md:px-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                tab === t.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/70 hover:bg-secondary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-4 max-w-reading md:mt-6">
          {tab === 'about' && (
            <div>
              <p className="leading-8 text-foreground/85">{s.about}</p>
              <h2 className="mt-6 mb-3 font-bold">مزایا</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {s.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 rounded-2xl bg-secondary/70 px-4 py-3 text-sm"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(tab === 'before' || tab === 'after') && (
            <ol className="space-y-3">
              {(tab === 'before' ? s.before : s.after).map((item, i) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-2xl border border-border/70 bg-card p-4"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent/40 text-sm font-bold text-accent-foreground">
                    {(i + 1).toLocaleString('fa-IR')}
                  </span>
                  <p className="text-sm leading-7">{item}</p>
                </li>
              ))}
            </ol>
          )}

          {tab === 'risks' && (
            <div className="space-y-3">
              {s.complications.map((c, i) => (
                <div
                  key={c.title}
                  className="overflow-hidden rounded-2xl border border-border/70 bg-card"
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center gap-3 p-4 text-right"
                  >
                    <AlertTriangle className="size-5 shrink-0 text-gold" />
                    <span className="flex-1 font-semibold">{c.title}</span>
                    <ChevronDown
                      className={`size-4 transition ${open === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {open === i && (
                    <div className="flex gap-3 border-t border-border/60 bg-secondary/40 p-4">
                      <ShieldPlus className="mt-1 size-4 shrink-0 text-primary" />
                      <p className="text-sm leading-7">
                        <span className="font-semibold">راه کنترل: </span>
                        {c.manage}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              <a
                href={`tel:${clinic.phones[0].tel}`}
                className="flex items-center gap-3 rounded-2xl bg-destructive/10 p-4 text-sm text-destructive"
              >
                <Phone className="size-5 shrink-0" />
                <span>
                  در صورت بروز علائم غیرعادی، درد شدید یا تب، فوراً با کلینیک
                  تماس بگیرید:{' '}
                  <b dir="ltr">{clinic.phones[0].label}</b>
                </span>
              </a>
            </div>
          )}

          {tab === 'faq' && (
            <div className="space-y-3">
              {s.faqs.map((f) => (
                <div
                  key={f.q}
                  className="rounded-2xl border border-border/70 bg-card p-4"
                >
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-foreground/80">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="mt-8 text-xs leading-6 text-muted-foreground">
            این اطلاعات جنبه آموزشی دارد و جایگزین معاینه و ویزیت پزشک نیست.
            برنامه درمان هر فرد پس از مشاوره حضوری تعیین می‌شود.
          </p>
        </div>
      </div>

      <div className="h-24 md:hidden" />
      <div className="pb-safe fixed inset-x-0 bottom-[76px] z-40 px-5 md:static md:mt-8 md:px-0">
        <Link
          to="/booking"
          search={{ service: s.slug }}
          className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-full bg-primary py-4 font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:opacity-95 md:mx-0"
        >
          <CalendarHeart className="size-5" /> رزرو نوبت {s.title}
        </Link>
      </div>
    </div>
  )
}
