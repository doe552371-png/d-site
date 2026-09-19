import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-8 px-6">
        <Link
          href="/"
          className="shrink-0 text-[19px] font-semibold tracking-[0.12em]"
        >
          DECOR
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/catalog" className="transition-colors hover:text-neutral-500">Каталог</Link>
          <Link href="/visualizer" className="transition-colors hover:text-neutral-500">Подбор</Link>
          <Link href="/#about" className="transition-colors hover:text-neutral-500">О нас</Link>
          <Link href="/#contacts" className="transition-colors hover:text-neutral-500">Контакты</Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/pro"
            className="border border-neutral-300 px-5 py-3 text-base font-semibold transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            ПРО
          </Link>
          <Link
            href="/#request"
            className="bg-black px-5 py-3 text-base font-semibold text-white transition-opacity hover:opacity-80"
          >
            Оставить заявку
          </Link>
        </div>

        <Link href="/#request" className="text-base font-medium md:hidden" aria-label="Перейти к заявке">
          Заявка
        </Link>
      </div>
    </header>
  );
}