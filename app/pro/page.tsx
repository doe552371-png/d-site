import Link from "next/link";

export default function ProLandingPage() {
  return (
    <main>
      {/* HERO */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                DECOR PRO
              </p>

              <h1 className="mt-6 max-w-3xl font-display text-5xl font-normal leading-[0.98] tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
                Всё для работы
                <br />
                с проектом
              </h1>

              <p className="mt-7 max-w-2xl text-lg font-normal leading-8 text-neutral-600">
                Рабочая среда для дизайнеров, архитекторов, строителей
                и комплектаторов — от проекта и ТЗ до подбора материалов,
                расчёта и заказа.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/pro/login"
                  className="rounded-md bg-black px-6 py-3 text-lg font-medium text-white transition-opacity hover:opacity-80"
                >
                  Войти в ПРО
                </Link>

                <Link
                  href="/pro/partner"
                  className="rounded-md border border-neutral-300 px-6 py-3 text-lg font-medium transition-colors hover:bg-neutral-100"
                >
                  Стать партнёром
                </Link>
              </div>
            </div>

            <div className="border-l border-neutral-200 pl-8 lg:pl-12">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
                Один рабочий процесс
              </p>

              <div className="mt-6 space-y-5">
                <div className="flex gap-5">
                  <span className="text-sm text-neutral-400">01</span>

                  <div>
                    <p className="font-medium text-neutral-900">
                      Проект или ТЗ
                    </p>

                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                      Передайте проект, спецификацию или описание задачи.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <span className="text-sm text-neutral-400">02</span>

                  <div>
                    <p className="font-medium text-neutral-900">
                      Материалы и комплектация
                    </p>

                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                      Подберите позиции и соберите решение для объекта.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <span className="text-sm text-neutral-400">03</span>

                  <div>
                    <p className="font-medium text-neutral-900">
                      Расчёт и КП
                    </p>

                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                      Получите расчёт и подготовьте коммерческое предложение.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <span className="text-sm text-neutral-400">04</span>

                  <div>
                    <p className="font-medium text-neutral-900">
                      Заказ и поставка
                    </p>

                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                      Согласуйте решение и переходите к заказу.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Что даёт ПРО
            </p>

            <h2 className="mt-4 font-display text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl">
              Инструменты для работы,
              <br />
              а не просто каталог
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-7">
              <p className="text-sm font-medium text-neutral-900">
                Проекты
              </p>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Храните проекты, ТЗ и документы в одном рабочем пространстве.
              </p>
            </div>

            <div className="bg-white p-7">
              <p className="text-sm font-medium text-neutral-900">
                Подбор
              </p>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Подбирайте материалы и варианты под конкретный объект.
              </p>
            </div>

            <div className="bg-white p-7">
              <p className="text-sm font-medium text-neutral-900">
                Спецификация
              </p>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Собирайте позиции, количества и структуру комплектации.
              </p>
            </div>

            <div className="bg-white p-7">
              <p className="text-sm font-medium text-neutral-900">
                КП и заказы
              </p>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Работайте с расчётами, предложениями и заказами проекта.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOR WHOM */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                Для кого
              </p>

              <h2 className="mt-4 max-w-xl font-display text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl">
                Для тех, кто работает
                <br />
                с интерьерными проектами
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-medium text-neutral-900">
                  Дизайнеры
                </p>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Подбор материалов, проекты, спецификации и персональные
                  условия сотрудничества.
                </p>
              </div>

              <div>
                <p className="font-medium text-neutral-900">
                  Архитекторы
                </p>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Работа с проектами, материалами и требованиями объекта.
                </p>
              </div>

              <div>
                <p className="font-medium text-neutral-900">
                  Строители
                </p>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Расчёт, комплектация, заказ и организация поставки.
                </p>
              </div>

              <div>
                <p className="font-medium text-neutral-900">
                  Комплектаторы
                </p>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Единая работа с ассортиментом, проектом и коммерческими
                  предложениями.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP */}
      <section id="partner">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                Партнёрство
              </p>

              <h2 className="mt-4 max-w-xl font-display text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl">
                Работайте с DECOR
                <br />
                на своих условиях
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-lg font-normal leading-8 text-neutral-600">
                Индивидуальные условия сотрудничества, работа с проектами
                и доступ к инструментам DECOR PRO.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/pro/login"
                  className="rounded-md bg-black px-6 py-3 text-lg font-medium text-white transition-opacity hover:opacity-80"
                >
                  Войти в ПРО
                </Link>

                <Link
                  href="/pro/partner"
                  className="rounded-md border border-neutral-300 px-6 py-3 text-lg font-medium transition-colors hover:bg-neutral-100"
                >
                  Стать партнёром
                </Link>
              </div>

              <p className="mt-5 text-sm leading-6 text-neutral-500">
                Дизайнеры · Архитекторы · Строители · Комплектаторы
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}