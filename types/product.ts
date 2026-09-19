export type ProductImageType =
  | "catalog"
  | "interior"
  | "detail"
  | "texture"
  | "installation";

export type ImageSource =
  | "supplier"
  | "processed"
  | "ai"
  | "manual";

export type ImageStatus =
  | "draft"
  | "review"
  | "approved"
  | "rejected";

export interface ProductImage {
  id: string;

  /**
   * Товар.
   */
  productSlug: string;

  /**
   * Конкретный вариант товара.
   * Например: белый/чёрный D235.
   */
  variantId?: string;

  type: ProductImageType;

  /**
   * Путь, который использует сайт.
   *
   * Например:
   * /images/products/dako/e-3017/catalog-v1.webp
   */
  url: string;

  alt: string;

  source: ImageSource;

  /**
   * Текущее состояние изображения.
   */
  status: ImageStatus;

  /**
   * Исходная ссылка поставщика.
   * Используется только для учёта происхождения.
   */
  sourceUrl?: string;

  /**
   * Путь к исходнику внутри проекта.
   *
   * Например:
   * source/products/dako/e-3017/catalog-01.jpg
   */
  sourcePath?: string;

  /**
   * Путь к готовому локальному asset.
   *
   * Например:
   * public/images/products/dako/e-3017/catalog-v1.webp
   */
  assetPath?: string;

  /**
   * Было ли изображение создано AI.
   */
  generated?: boolean;

  /**
   * ID задания генерации.
   */
  generationJobId?: string;

  /**
   * Каким pipeline обработано изображение.
   */
  pipeline?: {
    name: string;
    version: string;
  };

  /**
   * Версия изображения.
   */
  version?: number;

  /**
   * Основное изображение товара/варианта.
   */
  isPrimary?: boolean;

  /**
   * Порядок отображения.
   */
  sortOrder?: number;
}

export interface Product {
  slug: string;
  sku: string;
  name: string;
  manufacturer: string;
  category: string;

  description?: string;

  price?: number | string;
  collection?: string;
  dimensions?: string;
  color?: string;

  published: boolean;
}
