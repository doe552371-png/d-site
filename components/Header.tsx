import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-medium tracking-[0.08em]"
        >
          DECOR
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/catalog"
            className="text-[15px] font-normal transition-colors hover:text-neutral-500"
          >
            Каталог
          </Link>

          <Link
            href="/visualizer"
            className="text-[15px] font-normal transition-colors hover:text-neutral-500"
          >
            Подбор
          </Link>

          <Link
            href="/#about"
            className="text-[15px] font-normal transition-colors hover:text-neutral-500"
          >
            О нас
          </Link>

          <Link
            href="/#contacts"
            className="text-[15px] font-normal transition-colors hover:text-neutral-500"
          >
            Контакты
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/pro"
            className="rounded-md border border-black px-4 py-2.5 text-[15px] font-medium transition-colors hover:bg-black hover:text-white"
          >
            ПРО
          </Link>

          <Link
            href="/#request"
            className="rounded-md bg-black px-4 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-80"
          >
            Оставить заявку
          </Link>
        </div>

        <Link
          href="/#request"
          className="text-[15px] font-normal md:hidden"
          aria-label="Перейти к заявке"
        >
          Заявка
        </Link>
      </div>
    </header>
  );
}
