import { notFound } from "next/navigation";
import { ReleaseHeader } from "@/components/release-header";
import { ReleaseView } from "@/components/release-view";
import { getLatestRelease, getProduct, getProducts, getRelease, getReleases } from "@/lib/releases";

export function generateStaticParams() {
  return getProducts().flatMap((product) =>
    getReleases(product.slug).map((release) => ({
      project: product.slug,
      release: release.slug,
    })),
  );
}

export default async function ReleasePage({
  params,
}: {
  params: Promise<{ project: string; release: string }>;
}) {
  const { project, release: releaseSlug } = await params;

  const productData = getProduct(project);

  if (!productData) {
    notFound();
  }

  const release = getRelease(productData.slug, releaseSlug);
  const latestRelease = getLatestRelease(productData.slug);

  if (!release) {
    notFound();
  }

  return (
    <>
      <ReleaseHeader
        product={productData}
        release={release}
        latestRelease={latestRelease}
      />
      <ReleaseView release={release} />
    </>
  );
}
