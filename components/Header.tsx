"use client"; // useState client-side; layout.tsx'te Server Component olarak çalışmaz

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

// --- NAVİGASYON LİNKLERİ ---
// Tek kaynak olarak burada tanımlandı → Kural 4 (Bileşen izolasyonu, modüler yapı)
// We will generate the links dynamically inside the component using translations.

// --- SVG İKONLARI (harici kütüphane bağımlılığı olmadan) ---
// Kural 1: Hamburger ve X saf SVG; react-icons opsiyonel ek olarak kullanılabilir
const IconHamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconClose = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Header() {
  const t = useTranslations("header");
  const NAV_LINKS = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/#hakkimizda" },
    { label: t("services"), href: "/#hizmetler" },
    { label: t("references"), href: "/#referanslar" },
    { label: t("contact"), href: "/iletisim" },
    { label: t("kvkk"), href: "/kvkk" },
  ];
  // Kural 1: useState ile mobil menü aç/kapa durumu yönetilir
  const [isOpen, setIsOpen] = useState(false);
  // Scroll sonrası navbar'ın gölge alması için
  const [scrolled, setScrolled] = useState(false);
  // Tema yönetimi
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sayfa scroll'unu dinle → navbar görünümünü güncelle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menü açıkken body scroll'u kilitle
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Anchor (#) linkleri smooth scroll ile çözer; normal rotalar Next.js'e bırakılır
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      // Farklı sayfadaysa (pathname ≠ "/") tarayıcıya bırak, "/" ise smooth scroll
      if (window.location.pathname === "/") {
        e.preventDefault();
        const id = href.replace("/#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (href === "/" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false); // Her durumda mobil menüyü kapat
  };

  return (
    <>
      {/* sticky: sayfayla birlikte kaymaz; z-[1000]: modaller ve overlayların altında kalmaz */}
      <header
        className={`sticky top-0 z-[1000] w-full transition-all duration-300 ${
          scrolled 
            ? "bg-blue-900/95 dark:bg-[#020617]/90 backdrop-blur-md shadow-xl shadow-blue-950/40 dark:shadow-cyan-900/10 border-b border-transparent dark:border-white/5" 
            : "bg-blue-900 dark:bg-[#020617] shadow-md dark:border-b dark:border-white/5"
        } text-white`}
      >
      {/* --- ANA BANT ---
          w-full max-w-7xl mx-auto px-4 → Kural 2: sabit px yok, esnek kapsayıcı
          py-3 → dikey nefes alanı                                               */}
      <div className="w-full max-w-[1400px] mx-auto px-4 py-3 flex justify-between items-center gap-2">
        {/* LOGO */}
        <div className="flex justify-start flex-shrink-0">
          <Link
            href="/"
            onClick={(e) => handleNav(e, "/")}
            className="flex items-center gap-3 flex-shrink-0 transition-opacity hover:opacity-80"
            aria-label="Üçüzler Bina Yönetimi - Ana Sayfa"
          >
            <Image
              src="/binayonetimi.jpeg"
              alt="Üçüzler Bina Yönetimi logosu"
              width={44}
              height={44}
              priority
              className="rounded-full bg-white p-0.5 object-cover shadow-md"
            />
            <div className="flex flex-col leading-none">
              <span className="font-black text-base md:text-lg uppercase tracking-tighter">
                ÜÇÜZLER
              </span>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                {t("subTitle")}
              </span>
            </div>
          </Link>
        </div>

        {/* DESKTOP MENÜ (xl: ve üzeri) */}
        <nav className="hidden xl:flex justify-center items-center gap-3 xl:gap-5 flex-1 mx-4" aria-label="Ana menü">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="py-2 px-1 text-[11px] xl:text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* SAĞ TARAF: TEMA BUTONU, CTA veya MOBİL HAMBURGER BUTONU */}
        <div className="flex justify-end items-center gap-2 flex-shrink-0">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-yellow-300 dark:text-cyan-400 border border-white/5"
              aria-label="Temayı değiştir"
            >
              {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>
          )}
          {/* Dil seçici */}
          <div className="inline-flex ml-1 md:ml-2">
            <LanguageSwitcher />
          </div>
          <Link
            href="/iletisim"
            className="
              hidden xl:inline-flex
              ml-2 px-4 xl:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap
              bg-gradient-to-r from-cyan-500 to-blue-500
              hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5
              active:scale-95 transition-all duration-200
            "
          >
            {t("getQuote")}
          </Link>
          {/* p-3 → Kural 2 (Erişilebilirlik): minimum 44×44px dokunmatik alan */}
          <button
            className="xl:hidden p-3 rounded-xl text-cyan-400 hover:bg-white/10 active:scale-90 transition-all"
            onClick={() => setIsOpen(true)}
            aria-label="Menüyü aç"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <IconHamburger />
          </button>
        </div>
      </div>
      </header>

      {/* === MOBİL MENÜ PANEL ===
          fixed inset-0 → ekranın tamamını kaplar
          translate-x-full → kapalıyken sağda gizli, açıkken sıfıra çekilir
          transition-transform → CSS tabanlı animasyon (Framer Motion bağımlılığı gerekmez)
          xl:hidden → Kural 1: yalnızca mobil ve tablette var                              */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobil navigasyon menüsü"
        className={`
          fixed inset-0 z-[2000] flex flex-col
          bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900
          dark:from-[#020617] dark:via-[#0f172a] dark:to-[#020617]
          transition-transform duration-300 ease-in-out
          xl:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Üst bant: logo ve kapat butonu */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="font-black text-lg uppercase tracking-tighter text-white">
            ÜÇÜZLER <span className="text-cyan-400">YÖNETİM</span>
          </span>
          {/* p-3 → Kural 2: min 44px dokunmatik alan */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-3 rounded-xl text-cyan-400 hover:bg-white/10 active:scale-90 transition-all"
            aria-label="Menüyü kapat"
          >
            <IconClose />
          </button>
        </div>

        {/* Menü linkleri - mobilde alt alta */}
        <nav className="flex-1 flex flex-col justify-center gap-1 px-6 overflow-y-auto" aria-label="Mobil menü">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              // py-4 px-4 → Kural 2: ≥44px dikey dokunmatik alan (py-4 = 16px × 2 + font = ~52px)
              className="
                py-4 px-4 text-2xl font-black uppercase tracking-tighter text-white
                hover:text-cyan-400 hover:bg-white/5
                rounded-2xl transition-colors flex items-center gap-3
              "
            >
              <span className="text-cyan-500 text-base font-mono">/</span>
              {link.label}
            </Link>
          ))}
          <Link
            href="/iletisim"
            onClick={() => setIsOpen(false)}
            className="
              mt-4 py-4 px-6 rounded-full text-base font-bold uppercase tracking-widest text-center
              bg-cyan-500 text-white hover:bg-cyan-400 active:scale-95
              transition-all shadow-xl shadow-cyan-500/20
            "
          >
            {t("freeQuote")}
          </Link>
        </nav>

        {/* Alt sosyal medya bölümü */}
        <div className="px-6 py-8 border-t border-white/10">
          <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
            {t("contactUs")}
          </p>
          <div className="flex gap-4">
            {/* p-3 → Kural 2: her ikon butonu minimum 44×44px */}
            <a
              href="https://wa.me/905538873616"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp ile ulaşın"
              className="p-3 rounded-2xl bg-white/5 text-green-400 text-2xl hover:bg-green-500 hover:text-white transition-all"
            >
              {/* WhatsApp SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.851L0 24l6.335-1.507A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-5.001-1.369l-.358-.214-3.761.895.952-3.658-.234-.375A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ucuzlerbina_yonetimi/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram sayfamız"
              className="p-3 rounded-2xl bg-white/5 text-pink-400 text-2xl hover:bg-pink-500 hover:text-white transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href="tel:+905538873616"
              aria-label="Telefon ile arayın"
              className="p-3 rounded-2xl bg-white/5 text-blue-400 text-2xl hover:bg-blue-500 hover:text-white transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>
          </div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest mt-6">
            © {new Date().getFullYear()} Üçüzler Bina Yönetimi — Kayseri
          </p>
        </div>
      </div>
    </>
  );
}
