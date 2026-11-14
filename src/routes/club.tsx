import { Link, createFileRoute } from '@tanstack/react-router'
import { CalendarHeart, Gift, MessageSquareHeart, Share2, Star } from 'lucide-react'
import { toast } from 'sonner'

import { loyaltyTiers, sampleMember, toFa } from '@/data/clinic'

export const Route = createFileRoute('/club')({
  head: () => ({ meta: [{ title: 'باشگاه مشتریان | دکتر حسین صفائی' }] }),
  component: Club,
})

const earn = [
  { icon: CalendarHeart, t: 'هر مراجعه و درمان', p: '۱۰ امتیاز به ازای هر ۱۰۰ هزار تومان' },
  { icon: Share2, t: 'معرفی دوستان', p: '۳۰۰ امتیاز برای هر معرفی موفق' },
  { icon: MessageSquareHeart, t: 'ثبت نظر پس از درمان', p: '۵۰ امتیاز' },
  { icon: Gift, t: 'تولد شما', p: 'هدیه ویژه ماه تولد' },
]

function Club() {
  const m = sampleMember
  const idx = loyaltyTiers.filter((t) => m.points >= t.min).length - 1
  const tier = loyaltyTiers[idx]
  const next = loyaltyTiers[idx + 1]
  const pct = next
    ? Math.round(((m.points - tier.min) / (next.min - tier.min)) * 100)
    : 100

  return (
    <div className="mx-auto max-w-2xl px-5 pt-6">
      <div className="font-latin text-sm italic text-gold">Loyalty Club</div>
      <h1 className="text-2xl font-extrabold">باشگاه مشتریان وفادار</h1>

      {/* Card */}
      <div className="relative mt-5 aspect-[1.6] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[oklch(0.3_0.05_168)] via-primary to-[oklch(0.25_0.04_168)] p-6 text-primary-foreground shadow-2xl shadow-primary/30">
        <div className="absolute -top-16 -left-16 size-56 rounded-full border border-accent/30" />
        <div className="absolute -bottom-20 -right-10 size-64 rounded-full border border-accent/20" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between">
            <span className="font-latin text-xl italic text-accent">
              Dr. Safaei Club
            </span>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
              سطح {tier.name}
            </span>
          </div>
          <div className="mt-auto">
            <div className="text-xs text-white/70">امتیاز شما</div>
            <div className="text-4xl font-extrabold">{toFa(m.points.toLocaleString('en'))}</div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-white/70">
              <span>{m.name}</span>
              <span>
                {next
                  ? `${toFa(next.min - m.points)} امتیاز تا سطح ${next.name}`
                  : 'بالاترین سطح عضویت'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        کارت نمونه — پس از ورود به حساب کاربری، امتیاز واقعی شما نمایش داده
        می‌شود.
      </p>

      <h2 className="mt-8 mb-3 font-bold">سطوح عضویت و تخفیف</h2>
      <div className="grid grid-cols-3 gap-3">
        {loyaltyTiers.map((t) => (
          <div
            key={t.name}
            className={`rounded-2xl bg-gradient-to-b ${t.color} p-4 text-center ${t === tier ? 'ring-2 ring-primary' : ''}`}
          >
            <Star className="mx-auto size-5 text-foreground/70" />
            <div className="mt-2 font-bold">{t.name}</div>
            <div className="text-2xl font-extrabold text-primary">
              {toFa(t.discount)}٪
            </div>
            <div className="text-[11px] text-foreground/60">
              از {toFa(t.min.toLocaleString('en'))} امتیاز
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-8 mb-3 font-bold">راه‌های کسب امتیاز</h2>
      <div className="space-y-2">
        {earn.map(({ icon: Icon, t, p }) => (
          <div key={t} className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
              <Icon className="size-5" />
            </span>
            <div>
              <div className="text-sm font-semibold">{t}</div>
              <div className="text-xs text-muted-foreground">{p}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-5">
        <div className="flex-1">
          <div className="text-sm font-semibold">کد معرفی شما</div>
          <div className="font-latin mt-1 text-2xl tracking-widest" dir="ltr">
            SAFAEI-7K2
          </div>
        </div>
        <button
          onClick={() => {
            navigator.clipboard?.writeText('SAFAEI-7K2')
            toast.success('کد معرفی کپی شد')
          }}
          className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          کپی
        </button>
      </div>

      <Link
        to="/booking"
        className="mt-6 block rounded-full bg-primary py-4 text-center font-semibold text-primary-foreground"
      >
        رزرو نوبت و کسب امتیاز
      </Link>
    </div>
  )
}
