import Image from "next/image";
import Link from "next/link";

import CategoriesSection from "@/components/CategoriesSection";
import RequestForm from "@/components/RequestForm";

const editorialStories = [
  {
    title: "Современная геометрия",
    text: "Чистые линии, спокойная архитектура и акцент на пропорциях.",
    image:
      "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:4700b6c5-aab2-4a43-a93e-83a10ed40381",
  },
  {
    title: "Тактильный минимализм",
    text: "Нейтральные материалы и детали, которые работают на объём.",
    image:
      "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:d1e3fc06-8375-458a-b49d-2aff343f76ac",
  },
  {
    title: "Тёплая эклектика",
    text: "Натуральные оттенки, дерево и декоративный ритм на стенах.",
    image:
      "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:b7199a6e-37fd-4e1c-afea-ac2d7354f454",
  },
];

export default function Home() {
  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto grid min-h-[calc(100vh-112px)] max-w-[1440px] grid-cols-1 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="flex items-end border-r border-neutral-200 px-6 py-16 md:px-10 md:py-20 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Архитектурный декор
              </p>

              <h1 className="mt-8 text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] md:text-7xl xl:text-[6.4rem]">
                Детали,
                <br />
                которые
                <br />
                создают
                <br />
                пространство
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600 md:text-xl md:leading-9">
                Панели, молдинги, плинтусы, каменный шпон и другие материалы
                для современных интерьеров.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/catalog"
                  className="bg-black px-6 py-4 text-base font-semibold text-white transition-opacity hover:opacity-80"
                >
                  Смотреть каталог
                </Link>
                <Link
                  href="/visualizer"
                  className="border border-neutral-300 px-6 py-4 text-base font-medium transition-colors hover:border-black"
                >
                  Подобрать решение
                </Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[520px] bg-[#f4f4f1]">
            <Image
              src={editorialStories[0].image}
              alt="Современный интерьер с декоративными стеновыми элементами"
              fill
              unoptimized
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-gradient-to-t from-black/60 via-black/5 to-transparent p-6 pt-28 text-white md:p-8">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
                  Избранное решение
                </p>
                <p className="mt-2 text-2xl font-semibold uppercase leading-tight tracking-tight md:text-3xl">
                  Стены как архитектурный элемент
                </p>
              </div>
              <span className="text-2xl">↗</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 border-x border-neutral-200 md:grid-cols-[1.1fr_0.9fr]">
          <div className="px-6 py-16 md:px-10 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
              О подходе
            </p>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold uppercase leading-tight tracking-tight md:text-5xl">
              Когда в каталоге нужен не просто материал, а готовое решение.
            </h2>
          </div>

          <div className="border-t border-neutral-200 px-6 py-16 md:border-l md:border-t-0 md:px-10 md:py-20">
            <p className="max-w-xl text-lg leading-8 text-neutral-600">
              DECOR помогает пройти весь путь: от фотографии пространства и
              идеи до конкретных артикулов, расчёта и поставки.
            </p>
            <Link
              href="/visualizer"
              className="mt-8 inline-flex text-base font-medium underline underline-offset-4"
            >
              Начать подбор →
            </Link>
          </div>
        </div>
      </section>

      <CategoriesSection />

      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:py-24">
          <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Вдохновение
              </p>
              <h2 className="mt-4 text-4xl font-semibold uppercase leading-[0.96] tracking-tight md:text-6xl">
                Неожиданные
                <br />
                возможности
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              {["Все", "Жилые", "HoReCa", "Офисы"].map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  className={
                    "border px-4 py-2.5 text-base transition-colors " +
                    (index === 0
                      ? "border-black bg-black text-white"
                      : "border-neutral-300 hover:border-black")
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 md:grid-cols-3">
            {editorialStories.map((story) => (
              <article key={story.title} className="group bg-white">
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                  <Image
                    src={story.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="text-2xl font-semibold uppercase leading-tight tracking-tight">
                    {story.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-neutral-500">
                    {story.text}
                  </p>
                  <Link
                    href="/visualizer"
                    className="mt-6 inline-flex text-base font-medium underline underline-offset-4"
                  >
                    Посмотреть решение →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="request" className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-[1440px] border-x border-neutral-200 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="px-6 py-16 md:px-10 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
              Заявка
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold uppercase leading-[0.98] tracking-tight md:text-6xl">
              Расскажите
              <br />
              о задаче
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-neutral-600">
              Подойдёт фото, размеры, план помещения или просто описание.
              Подберём направление и конкретные материалы.
            </p>
          </div>

          <div className="border-t border-neutral-200 px-6 py-16 md:px-10 md:py-20 lg:border-l lg:border-t-0">
            <RequestForm />
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-[1440px] border-x border-neutral-200 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="px-6 py-16 md:px-10 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
              DECOR
            </p>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold uppercase leading-tight tracking-tight md:text-5xl">
              Материалы как часть архитектуры, а не финальный штрих.
            </h2>
          </div>
          <div className="border-t border-neutral-200 px-6 py-16 md:border-l md:border-t-0 md:px-10 md:py-20">
            <p className="max-w-xl text-lg leading-8 text-neutral-600">
              Мы собираем каталог интерьерных материалов и помогаем превратить
              идею в конкретное решение — от первой визуализации до поставки.
            </p>
          </div>
        </div>
      </section>

      <footer id="contacts" className="bg-black text-white">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
                Связаться с DECOR
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold uppercase leading-[0.96] tracking-tight md:text-6xl">
                Подберём материалы под ваш проект.
              </h2>
            </div>

            <Link
              href="#request"
              className="inline-flex w-fit border border-white px-6 py-4 text-base font-medium transition-colors hover:bg-white hover:text-black"
            >
              Оставить заявку
            </Link>
          </div>

          <div className="mt-16 border-t border-white/15 pt-6 text-sm text-white/55 md:flex md:items-center md:justify-between">
            <span>DECOR — Архитектурный декор</span>
            <div className="mt-3 flex gap-6 md:mt-0">
              <Link href="/catalog" className="transition-colors hover:text-white">
                Каталог
              </Link>
              <Link href="/visualizer" className="transition-colors hover:text-white">
                Подбор
              </Link>
              <Link href="/pro" className="transition-colors hover:text-white">
                PRO
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
