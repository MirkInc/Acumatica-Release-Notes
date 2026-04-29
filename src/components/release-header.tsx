import type { Product, Release } from "@/lib/releases";

export function ReleaseHeader({
  product,
  release,
  latestRelease,
}: {
  product: Product;
  release: Release;
  latestRelease?: Release;
}) {
  const productLabel = product.parentProduct
    ? `${product.parentProduct} / ${product.shortName ?? product.name}`
    : product.name;

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/92 px-6 py-5 backdrop-blur md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-700">{productLabel}</p>
          <h2 className="mt-1 text-2xl font-bold tracking-normal text-slate-950">
            Release {release.version}
          </h2>
        </div>
        <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:min-w-[360px]">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Current
            </span>
            <span className="mt-1 block font-semibold text-slate-950">
              {release.version}
            </span>
          </div>
          <div className="rounded-md border border-teal-200 bg-teal-50 px-4 py-3">
            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-teal-700">
              Latest Available
            </span>
            <span className="mt-1 block font-semibold text-slate-950">
              {latestRelease?.version ?? "No releases"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
