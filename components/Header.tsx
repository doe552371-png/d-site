import Link from "next/link";

import HeaderSearch from "@/components/HeaderSearch";

export default function Header() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-display text-[25px] leading-none tracking-[0.04em]">
          DECOR
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/catalog" className="font-body text-[15px] font-medium leading-none text-neutral-900 transition-colors hover:text-neutral-500">Каталог</Link>
          <Link href="/visualizer" className="font-body text-[15px] font-medium leading-none text-neutral-900 transition-colors hover:text-neutral-500">Подбор</Link>
          <Link href="/pro" className="font-body text-[15px] font-medium leading-none text-neutral-900 transition-colors hover:text-neutral-500">Для бизнеса</Link>
          <Link href="/#contacts" className="font-body text-[15px] font-medium leading-none text-neutral-900 transition-colors hover:text-neutral-500">Контакты</Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <HeaderSearch />
          <Link href="/pro" className="decor-button decor-button-secondary decor-button-compact">ПРО</Link>
          <Link href="/#request" className="decor-button decor-button-primary decor-button-compact">Оставить заявку</Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <HeaderSearch />
          <Link href="/#request" className="decor-button decor-button-secondary decor-button-compact" aria-label="Перейти к заявке">Заявка</Link>
        </div>
      </div>
    </header>
  );
}
