"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Match = {
  slug: string;
  name: string;
  manufacturer: string;
  category: string;
  categoryName: string;
  image?: string;
  price?: string;
};

type VisualizerMvpProps = {
  matches: Match[];
};

const tasks = [
  "Молдинги и стеновой декор",
  "Плинтусы и примыкания",
  "Панели и фактурные стены",
  "Несколько решений сразу",
];

const styles = ["Современный", "Минимализм", "Japandi", "Soft Classic"];
const materials = ["Все", "Молдинги", "Плинтусы", "Стеновые панели", "Каменный шпон"];

const stylePreviews: Record<string, string> = {
  "Современный":
    "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:4700b6c5-aab2-4a43-a93e-83a10ed40381",
  "Минимализм":
    "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:d1e3fc06-8375-458a-b49d-2aff343f76ac",
  "Japandi":
    "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:b7199a6e-37fd-4e1c-afea-ac2d7354f454",
  "Soft Classic":
    "https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:141d16d2-227c-4c28-909b-c2303feffb6f",
};

function StyleHeroPreview({ style }: { style: string }) {
  return (
    <div className="relative aspect-[16/7] overflow-hidden rounded-sm bg-neutral-100">
      <Image
        src={stylePreviews[style]}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 1024px) 100vw, 760px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white md:p-6">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/70">
            Стиль
          </p>
          <p className="mt-1 text-lg font-medium uppercase tracking-tight md:text-xl">
            {style}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VisualizerMvp({ matches }: VisualizerMvpProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [task, setTask] = useState(tasks[0]);
  const [style, setStyle] = useState(styles[0]);
  const [material, setMaterial] = useState(materials[0]);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const visibleMatches = useMemo(() => {
    if (material === "Все") {
      return matches.slice(0, 4);
    }

    const normalized = material.toLowerCase();

    if (normalized.includes("молдинг")) {
      return matches.filter((item) => item.category === "moldings").slice(0, 4);
    }

    if (normalized.includes("плинтус")) {
      return matches.filter((item) => item.category === "baseboards").slice(0, 4);
    }

    if (normalized.includes("панел")) {
      return matches.filter((item) => item.category === "wall-panels").slice(0, 4);
    }

    return matches.slice(0, 4);
  }, [material, matches]);

  function handleFile(nextFile?: File) {
    if (!nextFile || !nextFile.type.startsWith("image/")) return;
    setFile(nextFile);
    setSubmitted(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0]);
  }

  function startVisualization() {
    if (!file) {
      inputRef.current?.click();
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 lg:grid-cols-[1.15fr_0.85fr]">
        <div
          className="relative min-h-[520px] bg-[#f4f4f1]"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <div className="absolute inset-0">
              <Image
                src={previewUrl}
                alt="Загруженное помещение"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-6 pt-24 text-white">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/70">
                    Исходное фото
                  </p>
                  <p className="mt-2 max-w-sm text-sm font-medium">{file?.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="decor-button decor-button-light-outline decor-button-compact"
                >
                  Заменить
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center transition-colors hover:bg-[#ecece8]"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-300 bg-white text-2xl">
                +
              </span>
              <span className="mt-6 text-xl font-medium uppercase tracking-tight">
                Загрузить фото помещения
              </span>
              <span className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
                JPG, PNG или WEBP. Можно перетащить изображение прямо сюда.
              </span>
            </button>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
        </div>

        <div className="flex flex-col bg-white p-7 md:p-9">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                Шаг 01 / 03
              </p>
              <h2 className="mt-3 text-3xl font-medium uppercase leading-[1.02] tracking-tight">
                Задача
              </h2>
            </div>
          </div>

          <div className="mt-8 space-y-7">
            <fieldset>
              <legend className="text-sm font-semibold">Что хотим изменить?</legend>
              <div className="mt-3 grid gap-2">
                {tasks.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTask(item)}
                    className={
                      "decor-button decor-button-secondary w-full " +
                      (task === item
                        ? "decor-button-selected"
                        : "border-neutral-200 bg-white hover:border-neutral-400")
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold">Стиль</legend>
              <div className="mt-3">
                <StyleHeroPreview style={style} />
                <div className="mt-4 flex items-center gap-5 overflow-x-auto border-b border-neutral-200 pb-2">
                  {styles.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStyle(item)}
                      className={
                        "shrink-0 pb-2 font-body text-sm font-medium uppercase tracking-tight transition-colors " +
                        (style === item
                          ? "border-b-2 border-black text-black"
                          : "border-b-2 border-transparent text-neutral-400 hover:text-black")
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold">Материал из каталога</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {materials.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMaterial(item)}
                    className={
                      "decor-button decor-button-secondary decor-button-compact " +
                      (material === item
                        ? "decor-button-selected"
                        : "border-neutral-200 hover:border-neutral-400")
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="mt-auto pt-8">
            <button
              type="button"
              onClick={startVisualization}
              className="decor-button decor-button-primary w-full"
            >
              {file ? "Показать решение" : "Сначала загрузить фото"}
            </button>
          </div>
        </div>
      </div>

      {submitted && (
        <section className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 lg:grid-cols-[1fr_1.1fr]">
          <div className="bg-black p-7 text-white md:p-9">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
              Шаг 02 / 03
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-medium uppercase leading-[1.02] tracking-tight">
              Сценарий готов
            </h2>
            <div className="mt-8 border-t border-white/15 pt-6">
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/40">Задача</p>
                  <p className="mt-2 text-sm font-medium">{task}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/40">Стиль</p>
                  <p className="mt-2 text-sm font-medium">{style}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/40">Материал</p>
                  <p className="mt-2 text-sm font-medium">{material}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-7 md:p-9">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                  Шаг 03 / 03
                </p>
                <h2 className="mt-3 text-3xl font-medium uppercase leading-[1.02] tracking-tight">
                  Материалы DECOR
                </h2>
              </div>
              <span className="text-xs font-medium text-neutral-400">{visibleMatches.length} позиции</span>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {visibleMatches.map((item) => (
                <div key={item.slug} className="grid grid-cols-[86px_1fr] gap-4 border border-neutral-200 p-3">
                  <div className="relative aspect-square overflow-hidden bg-neutral-100">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill sizes="86px" className="object-contain" />
                    ) : null}
                  </div>
                  <div className="min-w-0 self-center">
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                      {item.manufacturer}
                    </p>
                    <p className="mt-1 text-sm font-medium uppercase leading-tight">{item.name}</p>
                    <p className="mt-2 text-xs leading-5 text-neutral-500">{item.categoryName}</p>
                    {item.price ? <p className="mt-2 text-xs font-semibold">{item.price}</p> : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-5">
              <p className="text-sm leading-6 text-neutral-500">
                Подходящие позиции из текущего каталога DECOR.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
