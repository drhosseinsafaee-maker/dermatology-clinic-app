import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Clock, Search } from 'lucide-react'
import { useState } from 'react'

import { img } from '@/components/app-shell'
import { type CategoryId, categories, services } from '@/data/clinic'

export const Route = createFileRoute('/services/')({
  validateSearch: (s: Record<string, unknown>): { c?: CategoryId } => ({
    c: categories.some((x) => x.id === s.c) ? (s.c as CategoryId) : undefined,
  }),
  head: () => ({ meta: [{ title: 'خدمات کلینیک | دکتر حسین صفائی' }] }),
  component: Services,
})

function Services() {
  const { c } = Route.useSearch()
  const navigate = Route.useNavigate()
  const [q, setQ] = useState('')
  const list = services.filter(
    (s) =>
      (!c || s.category === c) &&
      (!q || (s.title + s.short + s.latin).toLowerCase().includes(q.toLowerCase())),
  )
  const cat = categories.find((x) => x.id === c)

  return (
    <div className="mx-auto max-w-content px-5 pt-6">
      <div className="font-latin text-sm italic text-gold">Treatments</div>
      <h1 className="text-2xl font-extrabold">
        {cat ? cat.title : 'همه خدمات کلینیک'}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        خدمت مورد نظر را انتخاب کنید تا توضیحات، مراقبت‌ها و عوارض احتمالی را
        ببینید.
      </p>

      <label className="mt-5 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 focus-within:ring-2 focus-within:ring-ring/40">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجو: بوتاکس، لیزر، نخ…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </label>

      <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
        {[{ id: undefined, title: 'همه' }, ...categories].map((x) => {
          const active = x.id === c
          return (
            <button
              key={x.title}
              onClick={() => navigate({ search: { c: x.id }, replace: true })}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card text-foreground/80 hover:border-primary'
              }`}
            >
              {x.title}
            </button>
          )
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => {
          const category = categories.find((x) => x.id === s.category)!
          return (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group flex gap-4 rounded-3xl border border-border/70 bg-card p-3 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <img
                src={img(category.image, 300)}
                alt=""
                loading="lazy"
                className="size-24 shrink-0 rounded-2xl object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col py-1">
                <div className="font-latin text-xs italic text-gold">
                  {s.latin}
                </div>
                <h2 className="font-bold">{s.title}</h2>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                  {s.short}
                </p>
                <div className="mt-auto flex items-center justify-between pt-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {s.duration}
                  </span>
                  <ArrowLeft className="size-4 text-primary transition group-hover:-translate-x-1" />
                </div>
              </div>
            </Link>
          )
        })}
        {list.length === 0 && (
          <p className="col-span-full py-12 text-center text-muted-foreground">
            خدمتی با این عنوان پیدا نشد.
          </p>
        )}
      </div>
    </div>
  )
}
