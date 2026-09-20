import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-display text-[25px] leading-none tracking-[0.04em]">
          DECOR
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/catalog" className="font-display text-[21px] leading-none text-neutral-900 transition-colors hover:text-neutral-500">Каталог</Link>
          <Link href="/visualizer" className="font-display text-[21px] leading-none text-neutral-900 transition-colors hover:text-neutral-500">Подбор</Link>
          <Link href="/#about" className="font-display text-[21px] leading-none text-neutral-900 transition-colors hover:text-neutral-500">О нас</Link>
          <Link href="/#contacts" className="font-display text-[21px] leading-none text-neutral-900 transition-colors hover:text-neutral-500">Контакты</Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/pro" className="font-body inline-flex items-center justify-center rounded-md border border-neutral-300 px-4 py-2.5 text-sm font-medium tracking-[0.06em] transition-colors hover:border-black hover:bg-black hover:text-white">ПРО</Link>
          <Link href="/#request" className="font-body inline-flex items-center justify-center rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80">Оставить заявку</Link>
        </div>

        <Link href="/#request" className="font-body text-sm font-medium md:hidden" aria-label="Перейти к заявке">Заявка</Link>
      </div>
    </header>
  );
}
