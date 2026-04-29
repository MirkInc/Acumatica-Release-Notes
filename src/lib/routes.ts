import { getAllReleases, getDefaultProduct } from "@/lib/releases";

export function getDefaultReleasePath() {
  const latestRelease = getAllReleases()[0];
  const defaultProduct = getDefaultProduct();

  if (latestRelease) {
    return `/${latestRelease.productSlug}/${latestRelease.slug}`;
  }

  if (defaultProduct) {
    return `/${defaultProduct.slug}`;
  }

  return "/login";
}

export function getSafeRedirectPath(path?: string) {
  if (path?.startsWith("/") && !path.startsWith("//")) {
    return path;
  }

  return getDefaultReleasePath();
}
