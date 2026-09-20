import Link from "next/link";

import CategoriesSection from "@/components/CategoriesSection";
import RequestForm from "@/components/RequestForm";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-76px)] overflow-hidden border-b border-neutral-200">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://www.oracdecor.com/media/wysiwyg/homepage/hero-RoelfienVos_1.png)",
          }}
          role="img"
          aria-label="Интерьер Orac Decor с архитектурными молдингами"
        />

        <div className="absolute inset-x-0 bottom-0 bg-white/95">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:py-10">
            <div>
              <p className="font-body text-sm font-medium tracking-[0.16em] text-neutral-600">
                архитектурный декор
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-normal leading-[0.9] tracking-[-0.04em] text-neutral-900 sm:text-6xl lg:text-[76px]">
                Детали, которые создают пространство
              </h1>
            </div>

            <div>
              <p className="font-body max-w-xl text-base font-normal leading-7 text-neutral-600">
                Панели, молдинги, плинтусы, каменный шпон и другие материалы для
                современных интерьеров.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/catalog" className="font-body inline-flex items-center justify-center rounded-md bg-black px-6 py-3.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-80">
                  Смотреть каталог
                </Link>
                <Link href="/visualizer" className="font-body inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-6 py-3.5 text-center text-sm font-medium transition-colors hover:border-black">
                  Поможем с подбором
                </Link>
                <Link href="/pro" className="font-body inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-6 py-3.5 text-center text-sm font-medium transition-colors hover:border-black">
                  Передать проект
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTION */}
      <section id="selection" className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Подбор</p>
              <h2 className="mt-4 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.025em] text-neutral-900 sm:text-5xl">Не знаете, что выбрать?</h2>
            </div>
            <div className="max-w-2xl">
              <p className="font-body text-lg font-normal leading-8 text-neutral-600">
                Начните с фотографии помещения. Выберите направление, стиль и
                категорию материала — мы соберём сценарий для AI-визуализации и
                привяжем его к каталогу DECOR.
              </p>
              <Link href="/visualizer" className="font-body mt-7 inline-flex rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80">Запустить подбор</Link>
              <p className="font-body mt-4 text-sm font-normal leading-6 text-neutral-500">Артикул знать не нужно — достаточно показать пространство.</p>
            </div>
          </div>
        </div>
      </section>

      {/* B2B */}
      <section id="b2b" className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Для дизайнеров и бизнеса</p>
              <h2 className="mt-4 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.025em] text-neutral-900 sm:text-5xl">Есть проект или ТЗ?</h2>
            </div>
            <div className="max-w-2xl">
              <p className="font-body text-lg font-normal leading-8 text-neutral-600">
                Передайте проект — поможем подобрать материалы, собрать
                комплектацию и подготовить решение под объект.
              </p>
              <Link href="/pro" className="font-body mt-7 inline-flex rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80">Передать проект</Link>
              <p className="font-body mt-4 text-sm font-normal leading-6 text-neutral-500">Один каталог для частных клиентов, дизайнеров и строительных компаний.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST */}
      <section id="request" className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Заявка</p>
              <h2 className="mt-4 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.025em] text-neutral-900 sm:text-5xl">Расскажите о задаче</h2>
              <p className="font-body mt-4 max-w-xl text-base font-normal leading-7 text-neutral-500">
                Подойдёт фото, размеры, план помещения или просто описание.
                Не обязательно знать название материала.
              </p>
            </div>
            <div className="max-w-2xl"><RequestForm /></div>
          </div>
        </div>
      </section>

      <CategoriesSection />

      {/* ABOUT */}
      <section id="about" className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">DECOR</p>
              <h2 className="mt-4 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.025em] text-neutral-900 sm:text-5xl">Материалы как часть решения</h2>
            </div>
            <p className="font-body max-w-2xl text-lg font-normal leading-8 text-neutral-600">
              Мы собираем каталог интерьерных материалов и помогаем подобрать
              конкретное решение под задачу, пространство и бюджет — от первого
              выбора до поставки.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Контакты</p>
              <p className="font-body mt-3 text-base font-normal text-neutral-500">Подбор, расчёт и вопросы по материалам — через заявку.</p>
            </div>
            <Link href="#request" className="font-body inline-flex w-fit rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80">Оставить заявку</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
