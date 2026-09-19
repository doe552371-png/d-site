"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images?: ProductImage[];
};

const imageTypeLabels: Record<ProductImage["type"], string> = {
  catalog: "Каталог",
  interior: "Интерьер",
  detail: "Детали",
  texture: "Фактура",
  installation: "Монтаж",
};

const imageTypeOrder: ProductImage["type"][] = [
  "catalog",
  "interior",
  "detail",
  "texture",
  "installation",
];

export default function ProductGallery({
  images = [],
}: ProductGalleryProps) {
  const approvedImages = useMemo(
    () =>
      [...images]
        .filter((image) => image.status === "approved")
        .sort(
          (a, b) =>
            (a.sortOrder ?? 999) - (b.sortOrder ?? 999),
        ),
    [images],
  );

  const availableTypes = useMemo(
    () =>
      imageTypeOrder.filter((type) =>
        approvedImages.some(
          (image) => image.type === type,
        ),
      ),
    [approvedImages],
  );

  const primaryImage =
    approvedImages.find((image) => image.isPrimary) ??
    approvedImages.find((image) => image.type === "catalog") ??
    approvedImages[0];

  const [selectedType, setSelectedType] = useState<
    ProductImage["type"] | undefined
  >(primaryImage?.type);

  const [selectedImageId, setSelectedImageId] = useState<
    string | undefined
  >(primaryImage?.id);

  const typeImages = useMemo(
    () =>
      approvedImages.filter(
        (image) => image.type === selectedType,
      ),
    [approvedImages, selectedType],
  );

  const selectedImage =
    typeImages.find(
      (image) => image.id === selectedImageId,
    ) ??
    typeImages[0] ??
    primaryImage;

  if (!selectedImage) {
    return (
      <div className="flex aspect-square items-center justify-center bg-neutral-50">
        <span className="text-sm text-neutral-500">
          Изображение товара пока не добавлено
        </span>
      </div>
    );
  }

  const handleTypeChange = (
    type: ProductImage["type"],
  ) => {
    const firstImage = approvedImages.find(
      (image) => image.type === type,
    );

    setSelectedType(type);
    setSelectedImageId(firstImage?.id);
  };

  const handleImageChange = (image: ProductImage) => {
    setSelectedImageId(image.id);
    setSelectedType(image.type);
  };

  return (
    <div className="space-y-5">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Image type tabs */}
      {availableTypes.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {availableTypes.map((type) => {
            const isActive = selectedType === type;

            return (
              <button
                key={type}
                type="button"
                onClick={() => handleTypeChange(type)}
                className={[
                  "rounded-full px-4 py-2 text-sm transition",
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200",
                ].join(" ")}
              >
                {imageTypeLabels[type]}
              </button>
            );
          })}
        </div>
      )}

      {/* Thumbnails */}
      {typeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {typeImages.map((image) => {
            const isSelected =
              image.id === selectedImage.id;

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => handleImageChange(image)}
                aria-label={`Показать ${image.alt}`}
                className={[
                  "relative aspect-square overflow-hidden rounded-lg transition",
                  isSelected
                    ? "ring-2 ring-neutral-900 ring-offset-2"
                    : "hover:opacity-80",
                ].join(" ")}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="rounded-lg object-contain"
                  sizes="120px"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Current image type */}
      <div className="text-sm text-neutral-500">
        {imageTypeLabels[selectedImage.type]}
      </div>
    </div>
  );
}