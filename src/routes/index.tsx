import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowLeft,
  BookOpen,
  CalendarHeart,
  Clock,
  Crown,
  HeartPulse,
  Images,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'

import { img } from '@/components/app-shell'
import {
  articles,
  categories,
  clinic,
  festivals,
  reviews,
  services,
  toFa,
} from '@/data/clinic'

export const Route = createFileRoute('/')({
  component: Home,
})

const quick = [
  { to: '/booking', label: 'رزرو نوبت', icon: CalendarHeart },
  { to: '/services', label: 'خدمات', icon: Sparkles },
  { to: '/services', label: 'مراقبت‌ها', icon: HeartPulse },
  { to: '/gallery', label: 'نمونه‌کارها', icon: Images },
  { to: '/club', label: 'باشگاه', icon: Crown },
] as const

function SectionTitle({
  title,
  latin,
  to,
}: {
  title: string
  latin?: string
  to?: '/services'
}) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        {latin && (
          <div className="font-latin text-sm italic text-gold">{latin}</div>
        )}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {to && (
        <Link
          to={to}
          className="flex items-center gap-1 text-sm text-primary hover:underline"
        >
          همه <ArrowLeft className="size-4" />
        </Link>
      )}
    </div>
  )
}

function Home() {
  const popular = services.filter((s) => s.popular)
  return (
    <div className="mx-auto max-w-content space-y-12 px-5 pt-5">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-primary text-primary-foreground">
        <img
          src={img('hero.png', 1200)}
          alt="فضای درمانی کلینیک دکتر صفائی"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.04_168)] via-[oklch(0.22_0.04_168/0.6)] to-transparent md:bg-gradient-to-l" />
        <div className="relative flex min-h-[460px] flex-col justify-end p-6 md:min-h-[520px] md:max-w-xl md:justify-center md:p-12">
          <div className="font-latin text-lg italic text-accent">
            Dr. Hossein Safaei · Dermatology & Aesthetics
          </div>
          <h1 className="mt-2 text-3xl leading-[1.35] font-extrabold md:text-5xl md:leading-[1.3]">
            زیبایی طبیعی،
            <br />
            با دقت علم پزشکی
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-7 text-primary-foreground/85">
            لیزرهای جوانساز، تزریقات نسل جدید و لیفت با نخ؛ متناسب با چهره و
            نیاز شما، در کلینیک {clinic.doctor}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/booking"
              className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-lg transition hover:brightness-105"
            >
              <CalendarHeart className="size-5" />
              رزرو آنلاین نوبت
            </Link>
            <Link
              to="/services"
              className="rounded-full border border-white/30 px-6 py-3 font-medium backdrop-blur transition hover:bg-white/10"
            >
              مشاهده خدمات
            </Link>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="-mt-4 grid grid-cols-5 gap-2 md:gap-4">
        {quick.map((q) => {
          const Icon = q.icon
          return (
            <Link
              key={q.label}
              to={q.to}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border/70 bg-card p-3 text-center text-[12px] font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:text-sm"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              {q.label}
            </Link>
          )
        })}
      </section>

      {/* Festivals */}
      <section>
        <SectionTitle title="جشنواره‌های کلینیک" latin="Offers" />
        <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2">
          {festivals.map((f, i) => (
            <Link
              key={f.id}
              to="/booking"
              search={{ service: f.service }}
              className={`relative w-[82%] shrink-0 snap-start overflow-hidden rounded-3xl p-6 text-primary-foreground md:w-[380px] ${
                i % 2 === 0
                  ? 'bg-gradient-to-br from-primary to-[oklch(0.3_0.05_168)]'
                  : 'bg-gradient-to-br from-[oklch(0.55_0.09_60)] to-[oklch(0.4_0.07_50)]'
              }`}
            >
              <div className="absolute -top-8 -left-8 size-32 rounded-full bg-white/10" />
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-bold backdrop-blur">
                {f.badge}
              </span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/80">{f.desc}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-white/70">
                <span>{f.until}</span>
                <span className="flex items-center gap-1 font-medium text-white">
                  رزرو با تخفیف <ArrowLeft className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <SectionTitle title="خدمات تخصصی" latin="Treatments" to="/services" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/services"
              search={{ c: c.id }}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <img
                src={img(c.image, 500)}
                alt={c.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <div className="font-latin text-sm italic text-accent">
                  {c.latin}
                </div>
                <h3 className="text-[15px] leading-6 font-bold">{c.title}</h3>
                <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-white/75">
                  {c.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section>
        <SectionTitle title="پرطرفدارترین‌ها" latin="Most Loved" />
        <div className="flex flex-wrap gap-2">
          {popular.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm transition hover:border-primary hover:text-primary"
            >
              {s.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Doctor */}
      <section className="grain overflow-hidden rounded-[2rem] border border-border/70 bg-card p-6 md:flex md:items-center md:gap-10 md:p-10">
        <div className="mx-auto grid size-32 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.3_0.05_168)] ring-4 ring-accent/40 md:mx-0 md:size-44">
          <span className="font-latin text-5xl italic text-accent md:text-6xl">
            H.S
          </span>
        </div>
        <div className="mt-6 text-center md:mt-0 md:text-right">
          <div className="font-latin text-sm italic text-gold">
            Meet the Doctor
          </div>
          <h2 className="text-2xl font-bold">{clinic.doctor}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{clinic.title}</p>
          <p className="mt-4 max-w-2xl leading-8 text-foreground/80">
            رویکرد ما در کلینیک، زیبایی طبیعی و ماندگار است؛ هر درمان پس از
            معاینه دقیق و متناسب با ساختار چهره، نوع پوست و انتظارات شما طراحی
            می‌شود و پیگیری پس از درمان بخشی از مسیر درمان است.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm md:justify-start">
            {[
              { icon: ShieldCheck, t: 'مواد و دستگاه‌های اصل' },
              { icon: HeartPulse, t: 'پیگیری پس از درمان' },
              { icon: Sparkles, t: 'طراحی درمان اختصاصی' },
            ].map(({ icon: Icon, t }) => (
              <span
                key={t}
                className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5"
              >
                <Icon className="size-4 text-primary" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Club teaser */}
      <Link
        to="/club"
        className="flex items-center gap-4 rounded-3xl bg-gradient-to-l from-accent/70 to-accent/30 p-5 transition hover:brightness-105"
      >
        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-card text-gold shadow-sm">
          <Crown className="size-7" />
        </span>
        <div className="flex-1">
          <h3 className="font-bold">باشگاه مشتریان وفادار</h3>
          <p className="mt-1 text-sm text-foreground/70">
            با هر مراجعه امتیاز بگیرید و تا {toFa(15)}٪ تخفیف دائمی داشته باشید.
          </p>
        </div>
        <ArrowLeft className="size-5 text-foreground/60" />
      </Link>

      {/* Reviews */}
      <section>
        <SectionTitle title="نظر مراجعین" latin="Testimonials" />
        <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="w-[80%] shrink-0 snap-start rounded-3xl border border-border/70 bg-card p-5 md:w-auto"
            >
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < r.rating ? 'fill-current' : 'opacity-30'}`}
                  />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-7 text-foreground/85">
                «{r.text}»
              </blockquote>
              <figcaption className="mt-4 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{r.name}</span>{' '}
                · {r.service}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section>
        <SectionTitle title="مجله زیبایی" latin="Journal" />
        <div className="grid gap-4 md:grid-cols-4">
          {articles.map((a) => (
            <article
              key={a.slug}
              className="flex gap-4 rounded-3xl border border-border/70 bg-card p-3 md:flex-col"
            >
              <img
                src={img(a.image, 400)}
                alt=""
                loading="lazy"
                className="size-24 shrink-0 rounded-2xl object-cover md:aspect-[4/3] md:h-auto md:w-full"
              />
              <div className="py-1">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-primary">
                    {a.category}
                  </span>
                  <BookOpen className="size-3" /> {a.read}
                </div>
                <h3 className="mt-2 text-[15px] leading-7 font-semibold">
                  {a.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-primary p-6 text-primary-foreground">
          <h2 className="text-xl font-bold">ارتباط با کلینیک</h2>
          <div className="mt-5 space-y-3">
            {clinic.phones.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 transition hover:bg-white/15"
              >
                <span className="flex items-center gap-3">
                  <Phone className="size-4 text-accent" />
                  <span dir="ltr" className="font-semibold tracking-wide">
                    {p.label}
                  </span>
                </span>
                <span className="text-xs text-white/70">{p.kind}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-border/70 bg-card p-6">
          <div className="flex gap-3">
            <MapPin className="mt-1 size-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">آدرس</h3>
              <p className="mt-1 text-sm leading-7 text-foreground/80">
                {clinic.address}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="mt-1 size-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">ساعات کاری</h3>
              <p className="mt-1 text-sm text-foreground/80">{clinic.hours}</p>
            </div>
          </div>
          <a
            href={clinic.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-primary py-3 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <MapPin className="size-4" /> مسیریابی روی نقشه
          </a>
        </div>
      </section>
    </div>
  )
}
