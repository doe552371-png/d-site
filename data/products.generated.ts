export interface Product {
  slug: string;
  sku: string;
  name: string;
  manufacturer: string;
  category: string;
  description?: string;
  published: boolean;
}

export const productsGenerated: Product[] = [
  {
    slug: "dako-e-3017",
    sku: "E-3017",
    name: "Керамогранит E-3017 «Воздух»",
    manufacturer: "dako",
    category: "porcelain-stoneware",
    description: "Светло-серый керамогранит с редкими светлыми прожилками и кристаллической структурой. Матовая поверхность, размер 600×600×9 мм.",
    published: true,
  },
  {
    slug: "flatstone-bidasar-brown",
    sku: "BIDASAR-BROWN",
    name: "Гибкий камень Bidasar Brown",
    manufacturer: "flatstone",
    category: "stone-veneer",
    description: "Натуральный каменный шпон Bidasar Brown с характерным природным рисунком и коричневыми оттенками.",
    published: true,
  },
  {
    slug: "dako-e-5015",
    sku: "E-5015",
    name: "Керамогранит E-5015 «Бриз»",
    manufacturer: "dako",
    category: "porcelain-stoneware",
    description: "Серо-бежевый матовый керамогранит коллекции «Бриз», размер 600×600×9 мм.",
    published: true,
  },
  {
    slug: "dako-e-5023",
    sku: "E-5023",
    name: "Керамогранит E-5023 «Cosmos White»",
    manufacturer: "dako",
    category: "porcelain-stoneware",
    description: "Чёрный матовый керамогранит коллекции «Космос» с выразительными прожилками, размер 600×600×9 мм.",
    published: true,
  },
  {
    slug: "laconistiq-micro-15-classic",
    sku: "MICRO-15-CLASSIC",
    name: "Микроплинтус LACONISTIQ MICRO 15 CLASSIC",
    manufacturer: "laconistiq",
    category: "baseboards",
    description: "Алюминиевый микроплинтус размером 5×15×2450 мм. Перекрывает компенсационный зазор 10–13 мм.",
    published: true,
  },
];
