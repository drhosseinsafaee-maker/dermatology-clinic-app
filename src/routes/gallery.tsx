import { Link, createFileRoute } from '@tanstack/react-router'
import { Info } from 'lucide-react'
import { useState } from 'react'

import { img } from '@/components/app-shell'
import { galleryCases, getService } from '@/data/clinic'

export const Route = createFileRoute('/gallery')({
  head: () => ({ meta: [{ title: 'نمونه‌کارها | دکتر حسین صفائی' }] }),
  component: Gallery,
})

function Compare() {
  const [pos, setPos] = useState(50)
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted select-none">
      <img
        src={img('facial.png', 700)}
        alt="بعد از درمان"
        className="absolute inset-0 h-full w-full object-cover object-[68%_50%]"
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <img
          src={img('facial.png', 700)}
          alt="قبل از درمان"
          className="absolute inset-0 h-full w-full object-cover object-[68%_50%] brightness-90 contrast-90 saturate-50"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-bold text-primary shadow-lg">
          ⇆
        </span>
      </div>
      <span className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
        قبل
      </span>
      <span className="absolute top-3 left-3 rounded-full bg-primary/90 px-3 py-1 text-xs text-white">
        بعد
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="مقایسه قبل و بعد"
        dir="ltr"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}

function Gallery() {
  return (
    <div className="mx-auto max-w-content px-5 pt-6">
      <div className="font-latin text-sm italic text-gold">Before & After</div>
      <h1 className="text-2xl font-extrabold">نمونه‌کارهای کلینیک</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        نوار وسط تصویر را بکشید تا تفاوت قبل و بعد را ببینید.
      </p>

      <div className="mt-4 flex items-start gap-2 rounded-2xl bg-accent/25 p-3 text-xs leading-6">
        <Info className="mt-0.5 size-4 shrink-0 text-gold" />
        تصاویر این بخش فعلاً نمایشی هستند؛ نمونه‌کارهای واقعی مراجعین با رضایت
        کتبی آن‌ها جایگزین می‌شوند. نتایج درمان در افراد مختلف متفاوت است.
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {galleryCases.map((c) => {
          const s = getService(c.service)!
          return (
            <div key={c.id}>
              <Compare />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">{c.title}</h2>
                  <p className="text-xs text-muted-foreground">{c.note}</p>
                </div>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="rounded-full bg-secondary px-3 py-1.5 text-xs text-primary"
                >
                  درباره درمان
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
