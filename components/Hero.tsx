"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".hero-line", { yPercent: 0, opacity: 1 });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.15,
        },
      });

      timeline
        .to(
          ".hero-line-1",
          {
            yPercent: -115,
            opacity: 0,
            ease: "power2.in",
            duration: 0.3,
          },
          0.18,
        )
        .to(
          ".hero-line-2",
          {
            yPercent: -95,
            opacity: 0,
            ease: "power2.in",
            duration: 0.34,
          },
          0.24,
        )
        .to(
          ".hero-line-3",
          {
            yPercent: -75,
            opacity: 0,
            ease: "power2.in",
            duration: 0.38,
          },
          0.3,
        )
        .to(
          ".hero-copy",
          {
            yPercent: -18,
            ease: "none",
            duration: 0.8,
          },
          0,
        )
;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200svh] overflow-clip bg-white text-neutral-950"
    >
      <div className="sticky top-0 h-[100svh] min-h-[680px] overflow-hidden">
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-between px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="hero-copy max-w-4xl pt-[15vh]">
            <h1 className="mt-5 max-w-5xl text-[clamp(56px,8vw,128px)] font-normal leading-[0.86] tracking-[-0.055em] text-black">
              <span className="block overflow-hidden">
                <span className="hero-line hero-line-1 inline-block">Архитектура</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line hero-line-2 inline-block">начинается</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line hero-line-3 inline-block">с деталей.</span>
              </span>
            </h1>

            <p className="font-body mt-8 max-w-lg text-base leading-7 text-black/65 sm:text-lg">
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
      </div>
    </section>
  );
}
