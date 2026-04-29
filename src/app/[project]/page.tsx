import { notFound, redirect } from "next/navigation";
import { getLatestRelease, getProduct, getProducts } from "@/lib/releases";

export function generateStaticParams() {
  return getProducts().map((product) => ({
    project: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  const productData = getProduct(project);

  if (!productData) {
    notFound();
  }

  const latestRelease = getLatestRelease(productData.slug);

  if (!latestRelease) {
    notFound();
  }

  redirect(`/${productData.slug}/${latestRelease.slug}`);
}
