import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const productsDirectory = path.join(process.cwd(), "content", "products");

export type Product = {
  name: string;
  shortName?: string;
  parentProduct?: string;
  slug: string;
  description?: string;
};

export type Release = {
  productSlug: string;
  version: string;
  slug: string;
  title: string;
  comparison?: string;
  majorVersion?: string;
  majorVersionLabel?: string;
  build?: string;
  buildLabel?: string;
  acumaticaBuild?: string;
  releasedAt: string;
  content: string;
};

function getProductDirectory(slug: string) {
  return path.join(productsDirectory, slug);
}

function getReleasesDirectory(productSlug: string) {
  return path.join(getProductDirectory(productSlug), "releases");
}

function readJson<T>(filePath: string): T | undefined {
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "")) as T;
}

function normalizeProduct(directoryName: string): Product {
  const productPath = getProductDirectory(directoryName);
  const metadata = readJson<Partial<Product>>(
    path.join(productPath, "product.json"),
  );

  return {
    name: metadata?.name ?? directoryName,
    shortName: metadata?.shortName,
    parentProduct: metadata?.parentProduct,
    slug: metadata?.slug ?? directoryName,
    description: metadata?.description,
  };
}

function normalizeRelease(productSlug: string, fileName: string): Release {
  const fullPath = path.join(getReleasesDirectory(productSlug), fileName);
  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);

  return {
    productSlug,
    version: String(data.version ?? fileName.replace(/\.md$/, "")),
    slug: String(data.slug ?? fileName.replace(/\.md$/, "")),
    title: String(data.title ?? "Release Notes"),
    comparison: data.comparison ? String(data.comparison) : undefined,
    majorVersion: data.majorVersion ? String(data.majorVersion) : undefined,
    majorVersionLabel: String(data.majorVersionLabel ?? "Major version"),
    build: data.build
      ? String(data.build)
      : data.acumaticaBuild
        ? String(data.acumaticaBuild)
        : undefined,
    buildLabel: String(data.buildLabel ?? "Build"),
    acumaticaBuild: data.acumaticaBuild
      ? String(data.acumaticaBuild)
      : undefined,
    releasedAt: String(data.releasedAt ?? fileName.replace(/\.md$/, "")),
    content,
  };
}

function sortByNewestRelease(left: Release, right: Release) {
  return (
    new Date(right.releasedAt).getTime() - new Date(left.releasedAt).getTime()
  );
}

export function getProducts() {
  if (!fs.existsSync(productsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(productsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => normalizeProduct(entry.name))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export function getProduct(slug: string) {
  return getProducts().find((product) => product.slug === slug);
}

export function getReleases(productSlug: string) {
  const releasesDirectory = getReleasesDirectory(productSlug);

  if (!fs.existsSync(releasesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(releasesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => normalizeRelease(productSlug, fileName))
    .sort(sortByNewestRelease);
}

export function getRelease(productSlug: string, releaseSlug: string) {
  return getReleases(productSlug).find(
    (release) => release.slug === releaseSlug,
  );
}

export function getLatestRelease(productSlug: string) {
  const [latest] = getReleases(productSlug);
  return latest;
}

export function getAllReleases() {
  return getProducts()
    .flatMap((product) => getReleases(product.slug))
    .sort(sortByNewestRelease);
}

export function getDefaultProduct() {
  const latestRelease = getAllReleases()[0];

  if (latestRelease) {
    return getProduct(latestRelease.productSlug);
  }

  return getProducts()[0];
}
