import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  Check,
  Crown,
  Sparkles,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { categories, clinic, getService, services, toFa } from '@/data/clinic'

export const Route = createFileRoute('/booking')({
  validateSearch: (s: Record<string, unknown>): { service?: string } => ({
    service:
      typeof s.service === 'string' && getService(s.service)
        ? s.service
        : undefined,
  }),
  head: () => ({ meta: [{ title: 'رزرو آنلاین نوبت | دکتر حسین صفائی' }] }),
  component: Booking,
})

const steps = ['خدمت', 'زمان', 'مشخصات', 'تأیید']

type Day = { key: string; weekday: string; day: string; month: string }

// Builds the next open clinic days. Runs on the client only so the
// visitor's "today" is used rather than the server's.
function upcomingDays(count: number): Day[] {
  const fmt = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('fa-IR', { timeZone: 'Asia/Tehran', ...o })
  const out: Day[] = []
  const d = new Date()
  while (out.length < count) {
    d.setDate(d.getDate() + 1)
    if (!clinic.openDays.includes(d.getDay())) continue
    out.push({
      key: d.toISOString().slice(0, 10),
      weekday: fmt({ weekday: 'long' }).format(d),
      day: fmt({ day: 'numeric' }).format(d),
      month: fmt({ month: 'long' }).format(d),
    })
  }
  return out
}

const slots: string[] = []
for (let h = clinic.openHour; h < clinic.closeHour; h++)
  for (const m of ['00', '30']) slots.push(`${h}:${m}`)

// Sample availability until real scheduling is connected.
const isTaken = (dayKey: string, slot: string) => {
  let h = 0
  for (const ch of dayKey + slot) h = (h * 31 + ch.charCodeAt(0)) % 997
  return h % 3 === 0
}

function Booking() {
  const search = Route.useSearch()
  const [step, setStep] = useState(search.service ? 1 : 0)
  const [serviceSlug, setServiceSlug] = useState(search.service ?? '')
  const [days, setDays] = useState<Day[]>([])
  const [dayKey, setDayKey] = useState('')
  const [slot, setSlot] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', note: '', first: true })
  const [code, setCode] = useState('')

  useEffect(() => setDays(upcomingDays(14)), [])

  const service = getService(serviceSlug)
  const day = days.find((d) => d.key === dayKey)
  const phoneOk = /^(\+98|0)?9\d{9}$/.test(
    form.phone.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))),
  )
  const canNext = [
    !!service,
    !!dayKey && !!slot,
    form.name.trim().length > 1 && phoneOk,
    true,
  ][step]

  const grouped = useMemo(
    () =>
      categories.map((c) => ({
        ...c,
        items: services.filter((s) => s.category === c.id),
      })),
    [],
  )

  function confirm() {
    const tracking = 'DS-' + Math.floor(100000 + Math.random() * 900000)
    setCode(tracking)
    toast.success('نوبت شما ثبت شد')
  }

  if (code && service && day)
    return (
      <div className="mx-auto max-w-md px-5 pt-12 text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30">
          <Check className="size-10" />
        </div>
        <h1 className="mt-6 text-2xl font-extrabold">نوبت شما ثبت شد</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          همکاران ما برای هماهنگی نهایی با شما تماس می‌گیرند.
        </p>
        <div className="mt-6 space-y-3 rounded-3xl border border-border/70 bg-card p-5 text-right text-sm">
          <Row k="کد پیگیری" v={<b dir="ltr">{toFa(code)}</b>} />
          <Row k="خدمت" v={service.title} />
          <Row k="تاریخ" v={`${day.weekday} ${day.day} ${day.month}`} />
          <Row k="ساعت" v={toFa(slot)} />
        </div>
        <Link
          to="/services/$slug"
          params={{ slug: service.slug }}
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-secondary p-4 text-sm font-medium text-primary"
        >
          <Sparkles className="size-4" />
          مطالعه مراقبت‌های قبل از {service.title}
        </Link>
        <Link
          to="/"
          className="mt-3 block rounded-full bg-primary py-3 font-semibold text-primary-foreground"
        >
          بازگشت به خانه
        </Link>
      </div>
    )

  return (
    <div className="mx-auto max-w-2xl px-5 pt-6">
      <div className="font-latin text-sm italic text-gold">Book a Visit</div>
      <h1 className="text-2xl font-extrabold">رزرو آنلاین نوبت</h1>

      {/* Stepper */}
      <div className="mt-5 flex items-center gap-2">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col gap-1.5">
            <div
              className={`h-1.5 rounded-full transition ${i <= step ? 'bg-primary' : 'bg-border'}`}
            />
            <span
              className={`text-[11px] ${i === step ? 'font-semibold text-primary' : 'text-muted-foreground'}`}
            >
              {toFa(i + 1)}. {label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        {step === 0 && (
          <div className="space-y-6">
            {grouped.map((g) => (
              <div key={g.id}>
                <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
                  {g.title}
                </h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {g.items.map((s) => (
                    <button
                      key={s.slug}
                      onClick={() => setServiceSlug(s.slug)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-right transition ${
                        serviceSlug === s.slug
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-border/70 bg-card hover:border-primary/50'
                      }`}
                    >
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-full border ${
                          serviceSlug === s.slug
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border'
                        }`}
                      >
                        {serviceSlug === s.slug && <Check className="size-3" />}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">
                          {s.title}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {s.duration}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div>
            {service && (
              <div className="mb-5 flex items-center justify-between rounded-2xl bg-secondary/70 px-4 py-3 text-sm">
                <span>
                  خدمت: <b>{service.title}</b>
                </span>
                <button
                  onClick={() => setStep(0)}
                  className="text-xs text-primary underline"
                >
                  تغییر
                </button>
              </div>
            )}
            <h2 className="mb-3 font-semibold">انتخاب روز</h2>
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2">
              {days.length === 0 &&
                Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-24 w-20 shrink-0 animate-pulse rounded-2xl bg-muted"
                  />
                ))}
              {days.map((d) => (
                <button
                  key={d.key}
                  onClick={() => {
                    setDayKey(d.key)
                    setSlot('')
                  }}
                  className={`flex w-20 shrink-0 flex-col items-center rounded-2xl border py-3 transition ${
                    dayKey === d.key
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border/70 bg-card hover:border-primary/50'
                  }`}
                >
                  <span className="text-[11px] opacity-80">{d.weekday}</span>
                  <span className="text-2xl font-bold">{d.day}</span>
                  <span className="text-[11px] opacity-80">{d.month}</span>
                </button>
              ))}
            </div>

            <h2 className="mt-6 mb-3 font-semibold">انتخاب ساعت</h2>
            {!dayKey ? (
              <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                ابتدا روز مراجعه را انتخاب کنید.
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {slots.map((t) => {
                  const taken = isTaken(dayKey, t)
                  return (
                    <button
                      key={t}
                      disabled={taken}
                      onClick={() => setSlot(t)}
                      className={`rounded-xl border py-2.5 text-sm transition ${
                        slot === t
                          ? 'border-primary bg-primary text-primary-foreground'
                          : taken
                            ? 'cursor-not-allowed border-transparent bg-muted text-muted-foreground/50 line-through'
                            : 'border-border/70 bg-card hover:border-primary/50'
                      }`}
                    >
                      {toFa(t)}
                    </button>
                  )
                })}
              </div>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              {clinic.hours} · ساعات خط‌خورده رزرو شده‌اند.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-12 rounded-xl bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">شماره موبایل</Label>
              <Input
                id="phone"
                dir="ltr"
                inputMode="tel"
                placeholder="09xxxxxxxxx"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                aria-invalid={form.phone.length > 3 && !phoneOk}
                className="h-12 rounded-xl bg-card text-right"
              />
              {form.phone.length > 3 && !phoneOk && (
                <p className="text-xs text-destructive">
                  شماره موبایل معتبر وارد کنید.
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">توضیحات (اختیاری)</Label>
              <Textarea
                id="note"
                rows={3}
                placeholder="سابقه درمان، حساسیت دارویی یا سؤال خاص…"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="rounded-xl bg-card"
              />
            </div>
            <div className="flex gap-2">
              {[
                { v: true, t: 'مراجعه اول' },
                { v: false, t: 'مراجعه مجدد' },
              ].map((o) => (
                <button
                  key={o.t}
                  onClick={() => setForm({ ...form, first: o.v })}
                  className={`flex-1 rounded-xl border py-3 text-sm ${
                    form.first === o.v
                      ? 'border-primary bg-primary/5 font-semibold text-primary'
                      : 'border-border/70 bg-card'
                  }`}
                >
                  {o.t}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && service && day && (
          <div className="space-y-4">
            <div className="space-y-3 rounded-3xl border border-border/70 bg-card p-5 text-sm">
              <Row k="خدمت" v={service.title} />
              <Row k="تاریخ" v={`${day.weekday} ${day.day} ${day.month}`} />
              <Row k="ساعت" v={toFa(slot)} />
              <Row k="نام" v={form.name} />
              <Row k="موبایل" v={<span dir="ltr">{toFa(form.phone)}</span>} />
              <Row k="نوع مراجعه" v={form.first ? 'مراجعه اول' : 'مراجعه مجدد'} />
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-accent/30 p-4 text-sm">
              <Crown className="size-5 shrink-0 text-gold" />
              اعضای باشگاه مشتریان هنگام پرداخت از تخفیف سطح عضویت خود بهره‌مند
              می‌شوند.
            </div>
            <p className="text-xs leading-6 text-muted-foreground">
              هزینه نهایی پس از ویزیت و تعیین برنامه درمان مشخص می‌شود. لطفاً
              برای لغو یا جابه‌جایی، حداقل ۲۴ ساعت قبل اطلاع دهید.
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="pb-safe sticky bottom-[76px] z-30 mt-8 flex gap-3 bg-background/90 py-3 backdrop-blur md:bottom-0">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1 rounded-full border border-border px-5 py-3.5 text-sm"
          >
            <ArrowRight className="size-4" /> قبلی
          </button>
        )}
        {step < 3 ? (
          <button
            disabled={!canNext}
            onClick={() => setStep(step + 1)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground transition disabled:opacity-40"
          >
            ادامه <ArrowLeft className="size-4" />
          </button>
        ) : (
          <button
            onClick={confirm}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/30"
          >
            <CalendarCheck2 className="size-5" /> ثبت نهایی نوبت
          </button>
        )}
      </div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  )
}
