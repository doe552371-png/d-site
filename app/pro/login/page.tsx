import Link from "next/link";

export default function ProLoginPage() {
  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            DECOR PRO
          </p>
          <h1 className="mt-5 text-4xl font-semibold uppercase leading-[0.98] tracking-tight text-neutral-900 sm:text-6xl">
            Вход в рабочее пространство
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600">
            Авторизация и доступ к проектам подключаются следующим этапом.
            Сейчас можно оставить заявку на доступ к DECOR PRO.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/pro/partner" className="bg-black px-7 py-4 text-base font-semibold text-white transition-opacity hover:opacity-80">
              Запросить доступ
            </Link>
            <Link href="/pro" className="border border-neutral-300 px-7 py-4 text-base font-medium transition-colors hover:bg-neutral-100">
              Вернуться в ПРО
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
