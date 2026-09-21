'use client';

import Link from "next/link";
import { useState } from "react";

const HERO_VARIANTS = {
  panel: {
    label: "Панель",
    image:
      "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:c0194bb0-c95d-4f05-b9c3-e94837ff4586",
  },
  moulding: {
    label: "Молдинг",
    image:
      "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:6ab6c7e0-3c32-4425-aa5c-24839e6d5345",
  },
} as const;

type HeroVariant = keyof typeof HERO_VARIANTS;

export default function Hero() {
  const [variant, setVariant] = useState<HeroVariant>("panel");
  const current = HERO_VARIANTS[variant];

  return (
    <section className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-neutral-900 text-neutral-950">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${current.image})`,
        }}
        role="img"
        aria-label={`Тестовый Hero DECOR — ${current.label}`}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-white/5" />

      <div className="absolute right-6 top-6 z-20 flex items-center rounded-full border border-black/15 bg-white/75 p-1 backdrop-blur-md sm:right-8 sm:top-8 lg:right-12">
        {(Object.keys(HERO_VARIANTS) as HeroVariant[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setVariant(key)}
            className={[
              "rounded-full px-4 py-2 font-body text-xs font-medium transition",
              variant === key
                ? "bg-black text-white"
                : "text-black/70 hover:bg-black/5",
            ].join(" ")}
          >
            {HERO_VARIANTS[key].label}
          </button>
        ))}
      </div>

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
