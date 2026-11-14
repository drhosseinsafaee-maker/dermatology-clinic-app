import {
  Link,
  useRouter,
  type ErrorComponentProps,
} from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="grid min-h-[70svh] place-items-center px-6 py-16">
      <div className="max-w-md space-y-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          صفحه پیدا نشد
        </h1>
        <p className="text-muted-foreground">
          این صفحه وجود ندارد. آدرس را بررسی کنید یا به صفحه اصلی برگردید.
        </p>
        <Button asChild>
          <Link to="/">بازگشت به خانه</Link>
        </Button>
      </div>
    </div>
  )
}

export function RouteErrorPage({ reset }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <div className="grid min-h-[70svh] place-items-center px-6 py-16">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          این صفحه بارگذاری نشد
        </h1>
        <p role="alert" className="text-muted-foreground">
          لطفاً دوباره تلاش کنید یا به صفحه اصلی برگردید.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => {
              void router.invalidate()
              reset()
            }}
          >
            تلاش دوباره
          </Button>
          <Button variant="outline" asChild>
            <a href="/">بازگشت به خانه</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
