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

const MASK_RESOLUTION = 800;

type GenerationState = "idle" | "loading" | "error";

export default function VisualizerMvp({ matches }: VisualizerMvpProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [task, setTask] = useState(tasks[0]);
  const [style, setStyle] = useState(styles[0]);
  const [material, setMaterial] = useState(materials[0]);
  const [hasPainted, setHasPainted] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState<"small" | "large">("large");
  const [generation, setGeneration] = useState<GenerationState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultImage, setResultImage] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewUrlRef = useRef("");

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = MASK_RESOLUTION;
    canvas.height = MASK_RESOLUTION;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, MASK_RESOLUTION, MASK_RESOLUTION);
    setHasPainted(false);
  }, [previewUrl]);

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

    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const url = URL.createObjectURL(nextFile);
    previewUrlRef.current = url;

    setFile(nextFile);
    setPreviewUrl(url);
    setResultImage("");
    setGeneration("idle");
    setErrorMessage("");
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    handleFile(event.dataTransfer.files?.[0]);
  }

  function canvasPointFromEvent(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function paintAt(x: number, y: number) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const radius = brushSize === "large" ? 46 : 22;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!file) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDrawing(true);
    const point = canvasPointFromEvent(event);
    if (point) {
      paintAt(point.x, point.y);
      setHasPainted(true);
    }
  }

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    const point = canvasPointFromEvent(event);
    if (point) paintAt(point.x, point.y);
  }

  function handlePointerUp() {
    setIsDrawing(false);
  }

  function clearMask() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasPainted(false);
  }

  async function startVisualization() {
    if (!file) {
      inputRef.current?.click();
      return;
    }

    if (!hasPainted) {
      setErrorMessage("Обведите кистью область, которую хотим изменить");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    setGeneration("loading");
    setErrorMessage("");
    setResultImage("");

    try {
      const maskBlob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((blob) => resolve(blob), "image/png"),
      );

      if (!maskBlob) {
        throw new Error("Не удалось подготовить маску");
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append("mask", maskBlob, "mask.png");
      formData.append("task", task);
      formData.append("style", style);

      const response = await fetch("/api/visualize", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? "Не удалось сгенерировать визуализацию");
      }

      setResultImage(data.image);
      setGeneration("idle");
    } catch (error) {
      setGeneration("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Не удалось сгенерировать визуализацию",
      );
    }
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col bg-[#f4f4f1]">
          <div
            className="relative aspect-square w-full select-none"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <>
                <Image
                  src={previewUrl}
                  alt="Загруженное помещение"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 h-full w-full cursor-crosshair mix-blend-screen opacity-60 touch-none"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                />
              </>
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

          {previewUrl && (
            <div className="flex items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
                  Обведите кистью область для изменения
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Всё за пределами выделения останется как на фото
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBrushSize("small")}
                  className={
                    "h-9 w-9 rounded-full border text-xs font-semibold transition-colors " +
                    (brushSize === "small"
                      ? "border-black bg-black text-white"
                      : "border-neutral-300 bg-white")
                  }
                  aria-label="Тонкая кисть"
                >
                  S
                </button>
                <button
                  type="button"
                  onClick={() => setBrushSize("large")}
                  className={
                    "h-9 w-9 rounded-full border text-sm font-semibold transition-colors " +
                    (brushSize === "large"
                      ? "border-black bg-black text-white"
                      : "border-neutral-300 bg-white")
                  }
                  aria-label="Широкая кисть"
                >
                  L
                </button>
                <button
                  type="button"
                  onClick={clearMask}
                  className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold transition-colors hover:border-neutral-400"
                >
                  Очистить
                </button>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold transition-colors hover:border-neutral-400"
                >
                  Заменить фото
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col bg-white p-7 md:p-9">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                Шаг 01 / 02
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
                      "w-full border px-4 py-3 text-left text-base font-normal transition-colors " +
                      (task === item
                        ? "border-black bg-black text-white"
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
              <div className="mt-3 grid grid-cols-2 gap-2">
                {styles.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setStyle(item)}
                    className={
                      "border px-4 py-3 text-sm font-medium uppercase tracking-tight transition-colors " +
                      (style === item
                        ? "border-black bg-black text-white"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-400")
                    }
                  >
                    {item}
                  </button>
                ))}
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
                      "rounded-full border px-4 py-2 text-sm font-semibold transition-colors " +
                      (material === item
                        ? "border-black bg-black text-white"
                        : "border-neutral-200 hover:border-neutral-400")
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="mt-auto space-y-3 pt-8">
            {errorMessage && (
              <p className="text-sm font-medium text-red-600">{errorMessage}</p>
            )}
            <button
              type="button"
              onClick={startVisualization}
              disabled={generation === "loading"}
              className="w-full bg-black px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              {!file
                ? "Сначала загрузить фото"
                : generation === "loading"
                  ? "Генерируем…"
                  : "Показать решение"}
            </button>
          </div>
        </div>
      </div>

      {resultImage && (
        <section className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 lg:grid-cols-2">
          <div className="bg-white p-7 md:p-9">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
              До
            </p>
            <div className="relative mt-4 aspect-square overflow-hidden bg-neutral-100">
              {previewUrl && (
                <Image src={previewUrl} alt="Исходное фото" fill unoptimized className="object-cover" />
              )}
            </div>
          </div>
          <div className="bg-white p-7 md:p-9">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
              После — AI-визуализация
            </p>
            <div className="relative mt-4 aspect-square overflow-hidden bg-neutral-100">
              <Image src={resultImage} alt="AI-визуализация" fill unoptimized className="object-cover" />
            </div>
            <p className="mt-4 text-xs leading-5 text-neutral-500">
              Ориентировочный результат. Не гарантирует точную передачу цвета, текстуры и
              укладки материала — финальный подбор уточняется с менеджером DECOR.
            </p>
          </div>
        </section>
      )}

      {resultImage && (
        <section className="border border-neutral-200 bg-white p-7 md:p-9">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                Материалы DECOR
              </p>
              <h2 className="mt-3 text-3xl font-medium uppercase leading-[1.02] tracking-tight">
                Похожие позиции каталога
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
              Подходящие позиции из текущего каталога DECOR. Менеджер уточнит точный артикул под
              выбранный вариант.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
