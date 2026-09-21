import Link from "next/link";

export default function ProLoginPage() {
  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            DECOR PRO
          </p>
          <h1 className="mt-4 font-display text-4xl font-normal leading-[0.98] tracking-[-0.025em] text-neutral-900 sm:text-6xl">
            Вход в рабочее пространство
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Авторизация и доступ к проектам подключаются следующим этапом.
            Сейчас можно оставить заявку на доступ к DECOR PRO.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/pro/partner" className="decor-button decor-button-primary">
              Запросить доступ
            </Link>
            <Link href="/pro" className="decor-button decor-button-secondary">
              Вернуться в ПРО
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
