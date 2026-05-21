"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const LOCALES = [
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "zh", label: "ZH" },
  { code: "de", label: "DE" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const search = searchParams ? `?${searchParams.toString()}` : "";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Determine current locale from pathname prefix
  const getCurrent = () => {
    const seg = pathname.split("/").filter(Boolean)[0];
    return LOCALES.find((l) => l.code === seg) ? seg : "tr";
  };

  const [current, setCurrent] = useState(getCurrent);

  useEffect(() => {
    setCurrent(getCurrent());
  }, [pathname]);

  // click outside to close
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 px-3 py-2 rounded border border-white/10 bg-white/5 hover:bg-white/10 transition text-xs font-bold"
        title="Dil seçimi"
      >
        {/* Globe icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-current">
          <path d="M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.9 12h18.2M12 2.9v18.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="hidden sm:inline">{current?.toUpperCase()}</span>
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute right-0 mt-2 w-36 rounded-md ring-1 ring-black/30 bg-gray-900 text-white shadow-lg overflow-hidden transform transition-all origin-top-right ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
        role="menu"
        aria-orientation="vertical"
      >
        {LOCALES.map((loc) => {
          // Construct the new path by replacing the current locale segment
          const segments = pathname.split("/");
          if (segments[1] === current) {
            segments[1] = loc.code;
          } else {
            segments.splice(1, 0, loc.code);
          }
          const newHref = segments.join("/") + search;

          return (
            <Link
              key={loc.code}
              href={newHref}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white/5 transition ${
                current === loc.code ? "bg-white/5 text-cyan-300" : "text-white/90"
              }`}
            >
              {loc.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

