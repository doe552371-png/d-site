import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();

const SOURCE_ROOT = path.join(
  ROOT,
  "source",
  "products",
);

const OUTPUT_ROOT = path.join(
  ROOT,
  "public",
  "images",
  "products",
);

const MANIFEST_PATH = path.join(
  ROOT,
  "data",
  "imageManifest.json",
);

const GENERATED_TS_PATH = path.join(
  ROOT,
  "data",
  "productImages.generated.ts",
);

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getFiles(directory) {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  });

  const result = [];

  for (const entry of entries) {
    const fullPath = path.join(
      directory,
      entry.name,
    );

    if (entry.isDirectory()) {
      result.push(...(await getFiles(fullPath)));
      continue;
    }

    const extension = path
      .extname(entry.name)
      .toLowerCase();

    if (IMAGE_EXTENSIONS.has(extension)) {
      result.push(fullPath);
    }
  }

  return result;
}

function cleanName(name) {
  return name
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9а-яё_-]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function detectType(filename, width, height) {
  const value = filename.toLowerCase();

  if (
    value.includes("interior") ||
    value.includes("room") ||
    value.includes("scene")
  ) {
    return "interior";
  }

  if (
    value.includes("detail") ||
    value.includes("closeup")
  ) {
    return "detail";
  }

  if (
    value.includes("texture") ||
    value.includes("facture")
  ) {
    return "texture";
  }

  if (
    value.includes("install") ||
    value.includes("application")
  ) {
    return "installation";
  }

  if (width && height) {
    const ratio = width / height;

    if (ratio >= 1.45) {
      return "interior";
    }

    if (
      ratio >= 1.05 &&
      ratio <= 1.3 &&
      Math.max(width, height) < 1200
    ) {
      return "detail";
    }
  }

  return "catalog";
}

function manufacturerFromPath(relativePath) {
  const parts = relativePath.split(path.sep);
  return parts[0] ?? "unknown";
}

function productSlugFromPath(relativePath) {
  const parts = relativePath.split(path.sep);

  const manufacturer = parts[0] ?? "unknown";
  const product = parts[1] ?? "unknown";

  return `${manufacturer}-${product}`;
}

function sortOrderFromFilename(filename) {
  const match = filename.match(/-(\d+)\./);

  if (match) {
    return Number(match[1]);
  }

  return 1;
}

function makeImageId(productSlug, filename) {
  const base = cleanName(filename);

  return `${productSlug}-${base}`;
}

function makeAlt(productSlug, type) {
  const productNames = {
    "dako-e-3017":
      "Керамогранит DAKO E-3017 «Воздух»",
  };

  const labels = {
    catalog: "каталожное изображение",
    interior: "в интерьере",
    detail: "деталь",
    texture: "фактура",
    installation: "монтаж",
  };

  const productName =
    productNames[productSlug] ??
    productSlug
      .replace(/-/g, " ")
      .trim();

  return `${productName} — ${
    labels[type] ?? "изображение"
  }`;
}

function escapeTsString(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

async function main() {
  console.log("Importing product images...");

  if (!(await exists(SOURCE_ROOT))) {
    await fs.mkdir(SOURCE_ROOT, {
      recursive: true,
    });

    console.log(
      `Created source directory: ${SOURCE_ROOT}`,
    );

    return;
  }

  await fs.mkdir(OUTPUT_ROOT, {
    recursive: true,
  });

  const files = await getFiles(SOURCE_ROOT);

  const manifest = [];
  const seenChecksumsByProduct = new Map();

  for (const sourceFile of files) {
    const relativePath = path.relative(
      SOURCE_ROOT,
      sourceFile,
    );

    const manufacturer =
      manufacturerFromPath(relativePath);

    const productSlug =
      productSlugFromPath(relativePath);

    const filename = path.basename(sourceFile);

    const pipeline = sharp(sourceFile).rotate();
    const metadata = await pipeline.metadata();

    const imageType = detectType(
      filename,
      metadata.width ?? null,
      metadata.height ?? null,
    );

    const fileBuffer = await fs.readFile(sourceFile);
    const checksum = (await import("node:crypto"))
      .createHash("sha256")
      .update(fileBuffer)
      .digest("hex");

    const seenChecksums =
      seenChecksumsByProduct.get(productSlug) ??
      new Set();

    if (seenChecksums.has(checksum)) {
      console.log(
        `↪ duplicate skipped: ${relativePath}`,
      );
      continue;
    }

    seenChecksums.add(checksum);
    seenChecksumsByProduct.set(
      productSlug,
      seenChecksums,
    );

    const cleanFilename =
      cleanName(filename) + ".webp";

    const outputDirectory = path.join(
      OUTPUT_ROOT,
      manufacturer,
      productSlug,
    );

    await fs.mkdir(outputDirectory, {
      recursive: true,
    });

    const outputFile = path.join(
      outputDirectory,
      cleanFilename,
    );

    await pipeline
      .webp({
        quality: 88,
        effort: 5,
      })
      .toFile(outputFile);

    const publicUrl =
      `/images/products/${manufacturer}/${productSlug}/${cleanFilename}`;

    const sortOrder =
      sortOrderFromFilename(filename);

    const id = makeImageId(
      productSlug,
      filename,
    );

    const item = {
      id,
      manufacturer,
      productSlug,
      type: imageType,

      sourcePath: path.relative(
        ROOT,
        sourceFile,
      ),

      assetPath: path.relative(
        ROOT,
        outputFile,
      ),

      url: publicUrl,

      alt: makeAlt(
        productSlug,
        imageType,
      ),

      originalFilename: filename,

      width: metadata.width ?? null,
      height: metadata.height ?? null,

      generated: false,
      sortOrder,
    };

    manifest.push(item);

    console.log(
      `✓ ${relativePath} -> ${publicUrl}`,
    );
  }

  manifest.sort((a, b) => {
    const productCompare =
      a.productSlug.localeCompare(
        b.productSlug,
      );

    if (productCompare !== 0) {
      return productCompare;
    }

    return a.sortOrder - b.sortOrder;
  });

  // ------------------------------------------------------------
  // imageManifest.json
  // ------------------------------------------------------------

  await fs.mkdir(
    path.dirname(MANIFEST_PATH),
    {
      recursive: true,
    },
  );

  await fs.writeFile(
    MANIFEST_PATH,
    JSON.stringify(manifest, null, 2),
    "utf8",
  );

  // ------------------------------------------------------------
  // productImages.generated.ts
  // ------------------------------------------------------------

  const records = manifest.map((item) => {
    return `  {
    id: "${escapeTsString(item.id)}",
    productSlug: "${escapeTsString(item.productSlug)}",
    type: "${item.type}",
    url: "${escapeTsString(item.url)}",
    alt: "${escapeTsString(item.alt)}",
    source: "processed",
    status: "approved",
    sourcePath: "${escapeTsString(item.sourcePath)}",
    assetPath: "${escapeTsString(item.assetPath)}",
    generated: false,
    pipeline: {
      name: "local-image-import",
      version: "1.0",
    },
    version: 1,
    isPrimary: ${item.sortOrder === 1},
    sortOrder: ${item.sortOrder},
  },`;
  });

  const generatedSource = `import type { ProductImage } from "@/types/product";

export const productImagesGenerated: ProductImage[] = [
${records.join("\n")}
];
`;

  await fs.writeFile(
    GENERATED_TS_PATH,
    generatedSource,
    "utf8",
  );

  console.log("");
  console.log(
    `Imported ${manifest.length} image(s).`,
  );

  console.log(
    `Manifest: ${MANIFEST_PATH}`,
  );

  console.log(
    `TypeScript: ${GENERATED_TS_PATH}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
