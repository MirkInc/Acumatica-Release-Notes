"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ClipboardCopyIcon,
  Link2Icon,
  ReaderIcon,
  Share2Icon,
} from "@radix-ui/react-icons";

export function ShareMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (copyState === "idle") {
      return;
    }

    const timeout = window.setTimeout(() => setCopyState("idle"), 1800);

    return () => window.clearTimeout(timeout);
  }, [copyState]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  function printPage() {
    setIsOpen(false);
    window.print();
  }

  return (
    <div ref={menuRef} className="relative print:hidden">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex min-h-[66px] w-full items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-32"
      >
        <span>
          <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Share
          </span>
          <span className="mt-1 flex items-center gap-2 font-semibold text-slate-950">
            <Share2Icon aria-hidden className="size-4" />
            Options
          </span>
        </span>
        <ChevronDownIcon aria-hidden className="size-4 shrink-0 text-slate-500" />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-20 w-52 overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={copyLink}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
          >
            {copyState === "copied" ? (
              <CheckIcon aria-hidden className="size-4 text-teal-700" />
            ) : copyState === "error" ? (
              <Link2Icon aria-hidden className="size-4 text-amber-600" />
            ) : (
              <ClipboardCopyIcon aria-hidden className="size-4 text-slate-500" />
            )}
            <span>
              {copyState === "copied"
                ? "Link copied"
                : copyState === "error"
                  ? "Copy failed"
                  : "Copy link"}
            </span>
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={printPage}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
          >
            <ReaderIcon aria-hidden className="size-4 text-slate-500" />
            <span>Print</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
