"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Box, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import type { Product, Release } from "@/lib/releases";

function groupProducts(products: Product[]) {
  return products.reduce<Record<string, Product[]>>((groups, item) => {
    const groupName = item.parentProduct ?? "Other";

    return {
      ...groups,
      [groupName]: [...(groups[groupName] ?? []), item],
    };
  }, {});
}

function getReleaseSearchText(release: Release) {
  return [
    release.version,
    release.slug,
    release.releasedAt,
    release.majorVersion,
    release.build,
    release.comparison,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function Sidebar({
  products,
  product,
  releases,
}: {
  products: Product[];
  product: Product;
  releases: Release[];
}) {
  const productGroups = groupProducts(products);
  const pathname = usePathname();
  const [releaseSearch, setReleaseSearch] = useState("");
  const normalizedSearch = releaseSearch.trim().toLowerCase();
  const filteredReleases = useMemo(() => {
    if (!normalizedSearch) {
      return releases;
    }

    return releases.filter((release) =>
      getReleaseSearchText(release).includes(normalizedSearch),
    );
  }, [normalizedSearch, releases]);

  return (
    <aside className="sticky top-0 border-r border-slate-200 bg-slate-950 text-white md:h-screen">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">
            Release Notes
          </p>
          <h1 className="mt-3 text-lg font-semibold leading-7 tracking-normal text-white">
            Product Library
          </h1>
        </div>
        <nav className="border-b border-white/10 px-3 py-4" aria-label="Products">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Products
          </div>
          <div className="grid gap-3">
            {Object.entries(productGroups).map(([groupName, items]) => (
              <div
                key={groupName}
                className="rounded-md border border-white/10 bg-white/[0.03] p-2"
              >
                <div className="border-b border-white/10 px-2 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-200">
                  {groupName}
                </div>
                <div className="mt-2 grid gap-1">
                  {items.map((item) => {
                    const isActive = item.slug === product.slug;

                    return (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        className={[
                          "block rounded-md border-l-2 px-3 py-2 text-sm font-semibold transition",
                          isActive
                            ? "border-teal-300 bg-white/10 text-white"
                            : "border-transparent text-slate-300 hover:bg-white/10 hover:text-white",
                        ].join(" ")}
                      >
                        {item.shortName ?? item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Releases">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Releases
          </div>
          <Box className="mb-3 px-3">
            <TextField.Root
              value={releaseSearch}
              onChange={(event) => setReleaseSearch(event.target.value)}
              placeholder="Search versions"
              size="2"
              variant="soft"
              className="release-search-field"
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Box>
          <div className="divide-y divide-white/10">
            {filteredReleases.map((release) => {
              const isActive = pathname === `/${product.slug}/${release.slug}`;

              return (
                <Link
                  key={release.slug}
                  href={`/${product.slug}/${release.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "block px-3 py-3 text-sm transition",
                    isActive
                      ? "bg-teal-500 text-slate-950 shadow-sm"
                      : "text-slate-300 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  <span className="block font-semibold">{release.version}</span>
                  <span
                    className={[
                      "mt-1 block text-xs",
                      isActive ? "text-slate-800" : "text-slate-500",
                    ].join(" ")}
                  >
                    {new Intl.DateTimeFormat("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(`${release.releasedAt}T00:00:00`))}
                  </span>
                  {release.majorVersion || release.build ? (
                    <span
                      className={[
                        "mt-2 flex flex-wrap gap-1.5 text-xs",
                        isActive ? "text-slate-800" : "text-slate-400",
                      ].join(" ")}
                    >
                      {release.majorVersion ? (
                        <span
                          className={[
                            "rounded border px-1.5 py-0.5 font-medium",
                            isActive
                              ? "border-slate-700/20 bg-white/35"
                              : "border-white/10 bg-white/5",
                          ].join(" ")}
                        >
                          {release.majorVersionLabel}: {release.majorVersion}
                        </span>
                      ) : null}
                      {release.build ? (
                        <span
                          className={[
                            "rounded border px-1.5 py-0.5 font-medium",
                            isActive
                              ? "border-slate-700/20 bg-white/35"
                              : "border-white/10 bg-white/5",
                          ].join(" ")}
                        >
                          {release.buildLabel}: {release.build}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                </Link>
              );
            })}
            {filteredReleases.length === 0 ? (
              <p className="rounded-md border border-white/10 px-3 py-3 text-sm text-slate-400">
                No matching releases.
              </p>
            ) : null}
          </div>
        </nav>
      </div>
    </aside>
  );
}
