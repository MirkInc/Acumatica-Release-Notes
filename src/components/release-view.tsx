import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Release } from "@/lib/releases";

export function ReleaseView({ release }: { release: Release }) {
  return (
    <article className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-12">
      <div className="mb-8 border-b border-slate-200 pb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
          {release.title}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-normal text-slate-950">
          Release {release.version}
        </h1>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
          {release.comparison ? (
            <span className="rounded-md border border-slate-200 bg-white px-3 py-2">
              Comparison: {release.comparison}
            </span>
          ) : null}
          {release.build ? (
            <span className="rounded-md border border-slate-200 bg-white px-3 py-2">
              {release.buildLabel}: {release.build}
            </span>
          ) : null}
        </div>
      </div>
      <div className="release-markdown rounded-lg border border-slate-200 bg-white px-6 py-2 shadow-sm md:px-9 md:py-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{release.content}</ReactMarkdown>
      </div>
    </article>
  );
}
