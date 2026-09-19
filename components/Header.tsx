import Link from "next/link";

const productLinks = [
  { href: "/category/moldings", label: "Молдинги" },
  { href: "/category/baseboards", label: "Плинтусы" },
  { href: "/category/wall-panels", label: "Панели" },
  { href: "/category/stone-veneer", label: "Каменный шпон" },
];

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="hidden border-b border-neutral-200 md:block">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-6 text-sm text-neutral-500">
          <span>Архитекторам, дизайнерам и комплектаторам</span>
          <div className="flex items-center gap-6">
            <Link href="/pro" className="transition-colors hover:text-black">
              DECOR PRO
            </Link>
            <Link href="/#contacts" className="transition-colors hover:text-black">
              Контакты
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center gap-8 px-6">
        <Link
          href="/"
          className="shrink-0 text-xl font-semibold uppercase tracking-[0.12em]"
        >
          DECOR
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-7 lg:flex">
          {productLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base transition-colors hover:text-neutral-500"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/catalog"
            className="text-base transition-colors hover:text-neutral-500"
          >
            Каталог
          </Link>
          <Link
            href="/visualizer"
            className="text-base transition-colors hover:text-neutral-500"
          >
            Подбор
          </Link>
          <Link
            href="/#about"
            className="text-base transition-colors hover:text-neutral-500"
          >
            О нас
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/catalog"
            className="hidden px-2 py-3 text-base transition-colors hover:text-neutral-500 sm:inline-flex"
          >
            Поиск
          </Link>
          <Link
            href="/pro"
            className="hidden border border-black px-5 py-3 text-base font-medium transition-colors hover:bg-black hover:text-white sm:inline-flex"
          >
            PRO
          </Link>
          <Link
            href="/#request"
            className="bg-black px-5 py-3 text-base font-semibold text-white transition-opacity hover:opacity-80"
          >
            Заявка
          </Link>
        </div>
      </div>

      <div className="border-t border-neutral-200 lg:hidden">
        <nav className="mx-auto flex max-w-[1440px] gap-6 overflow-x-auto px-6 py-3 text-base">
          {productLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 text-neutral-700 transition-colors hover:text-black"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/catalog"
            className="shrink-0 text-neutral-700 transition-colors hover:text-black"
          >
            Каталог
          </Link>
          <Link
            href="/visualizer"
            className="shrink-0 text-neutral-700 transition-colors hover:text-black"
          >
            Подбор
          </Link>
        </nav>
      </div>
    </header>
  );
}
