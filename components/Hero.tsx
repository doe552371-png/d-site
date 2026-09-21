'use client';

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-white text-neutral-950">
      <div className="relative mx-auto flex min-h-[calc(100svh-76px)] w-full max-w-[1600px] flex-col justify-between px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="max-w-4xl pt-[18vh]">
          <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-black/55">
            DECOR
          </p>

          <h1 className="mt-5 max-w-4xl text-[clamp(56px,8vw,128px)] font-normal leading-[0.86] tracking-[-0.055em] text-black">
            Архитектура
            <br />
            начинается
            <br />
            с деталей.
          </h1>

          <p className="font-body mt-8 max-w-lg text-base leading-7 text-black/70 sm:text-lg">
            Молдинги, панели и декоративные элементы для современных интерьеров.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/catalog" className="decor-button decor-button-primary">
              Смотреть каталог
            </Link>
            <Link
              href="/visualizer"
              className="decor-button decor-button-secondary"
            >
              Не знаете, что выбрать?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
