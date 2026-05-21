"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// --- VERİ TANIMLARI (modüler: tek yerden yönetim) ---
const ILETISIM_BILGILERI = {
  adres: "Sahabiye Mah. Ahmet Paşa Cad. Kalender İş Merkezi No:41 Kat:6 Kocasinan / KAYSERİ",
  telefon: "+90 (553) 887 36 16",
  telefonHref: "tel:+905538873616",
  whatsapp: "https://wa.me/905538873616",
  instagram: "https://www.instagram.com/ucuzlerbina_yonetimi/",
};

const SITE_LINKLERI = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/#hakkimizda" },
  { label: "Hizmetlerimiz", href: "/#hizmetler" },
  { label: "Referanslar", href: "/#referanslar" },
  { label: "SSS", href: "/#sss" },
];

const KURUMSAL_LINKLER = [
  { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
  { label: "Ücretsiz Teklif Al", href: "/iletisim" },
  { label: "Bize Ulaşın", href: "/iletisim" },
];

// Framer Motion: her sütun kademeli (stagger) girer
const columnVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function Footer() {
  return (
    <footer className="bg-blue-950 dark:bg-[#020617] text-white pt-16 pb-8 border-t border-white/5 relative overflow-hidden transition-colors duration-300">

      {/* Dekoratif arka plan lekeleri */}
      <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl -mr-36 -mt-36" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-56 h-56 bg-blue-400/5 rounded-full blur-3xl -ml-28 -mb-28" aria-hidden="true" />

      {/* --- ANA GRID ALANI ---
          w-full max-w-7xl mx-auto px-4 → Kural 2: esnek kapsayıcı, sabit px yok
          grid-cols-1 → Kural 3 (Mobile-First): mobilde 1 sütun (alt alta)
          md:grid-cols-3 → tablet'te 3 eşit sütun (yan yana)                    */}
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-12 mb-14">

          {/* === BLOK 1: İLETİŞİM === */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={columnVariant}
            className="flex flex-col gap-5"
          >
            <Link href="/" className="flex items-center gap-3 w-fit" aria-label="Ana sayfaya dön">
              <Image
                src="/binayonetimi.jpeg"
                alt="Üçüzler Bina Yönetimi"
                width={52}
                height={52}
                className="rounded-full bg-white p-0.5 shadow-xl object-cover"
              />
              <div className="flex flex-col leading-none">
                {/* text-xl → Kural 4: rem tabanlı tipografi */}
                <span className="font-black text-xl uppercase tracking-tighter">ÜÇÜZLER</span>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Bina Yönetimi</span>
              </div>
            </Link>

            <p className="text-sm text-blue-100/60 leading-relaxed">
              Kayseri&apos;de şeffaf, güvenilir bina yönetimi. Havuz sistemi olmadan, her sitenin parası kendi hesabında.
            </p>

            <address className="not-italic flex flex-col gap-3 text-sm text-blue-100/70">
              <span className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5z"/>
                </svg>
                <span>{ILETISIM_BILGILERI.adres}</span>
              </span>
              {/* py-2 → Kural 2 (Erişilebilirlik): dikey hit-box ≥ 44px */}
              <a href={ILETISIM_BILGILERI.telefonHref} className="flex items-center gap-3 py-2 hover:text-cyan-400 transition-colors w-fit" aria-label="Telefon: +90 553 887 36 16">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="font-bold">{ILETISIM_BILGILERI.telefon}</span>
              </a>
            </address>
          </motion.div>

          {/* === BLOK 2: SİTE LİNKLERİ === */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={columnVariant}
            className="flex flex-col gap-5"
          >
            <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-2">
              Hızlı Erişim
            </h3>
            {/* py-2 px-2 → Kural 2: ≥44px dikey dokunmatik alan */}
            <ul className="flex flex-col gap-1" role="list">
              {SITE_LINKLERI.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 py-2 px-2 rounded-lg text-sm text-blue-100/70 hover:text-cyan-400 hover:bg-white/5 transition-colors">
                    <span className="text-cyan-500 font-bold" aria-hidden="true">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-2 mt-2">
              Kurumsal
            </h3>
            <ul className="flex flex-col gap-1" role="list">
              {KURUMSAL_LINKLER.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="flex items-center gap-2 py-2 px-2 rounded-lg text-sm text-blue-100/70 hover:text-cyan-400 hover:bg-white/5 transition-colors">
                    <span className="text-cyan-500 font-bold" aria-hidden="true">✓</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* === BLOK 3: SOSYAL MEDYA === */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={columnVariant}
            className="flex flex-col gap-5"
          >
            <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-2">
              Sosyal Medya
            </h3>
            <p className="text-sm text-blue-100/60 leading-relaxed italic">
              Güncel duyurular ve bilgilendirmeler için bizi takip edin.
            </p>

            {/* p-3 → Kural 2: min 44×44px dokunmatik alan (p-3=12px × 2 + 22px ikon = 46px) */}
            <div className="flex gap-3 flex-wrap">
              <a href={ILETISIM_BILGILERI.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp hattımız" className="p-3 rounded-2xl bg-white/5 text-green-400 hover:bg-green-500 hover:text-white active:scale-90 transition-all shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.851L0 24l6.335-1.507A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-5.001-1.369l-.358-.214-3.761.895.952-3.658-.234-.375A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
              </a>
              <a href={ILETISIM_BILGILERI.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram sayfamız" className="p-3 rounded-2xl bg-white/5 text-pink-400 hover:bg-pink-500 hover:text-white active:scale-90 transition-all shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href={ILETISIM_BILGILERI.telefonHref} aria-label="Telefon ile arayın" className="p-3 rounded-2xl bg-white/5 text-blue-400 hover:bg-blue-500 hover:text-white active:scale-90 transition-all shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              </a>
            </div>

            {/* CTA kutusu */}
            <div className="mt-2 p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-blue-100/50 uppercase tracking-widest mb-3 font-bold">Ücretsiz Keşif</p>
              <p className="text-sm text-blue-100/80 leading-relaxed mb-4">
                Binanızı ücretsiz yerinde inceleyelim, size özel teklif hazırlayalım.
              </p>
              {/* py-3 px-5 → Kural 2: ≥44px dikey dokunmatik alan */}
              <Link href="/iletisim" className="block py-3 px-5 rounded-xl text-center text-xs font-bold uppercase tracking-widest bg-cyan-500 text-white hover:bg-cyan-400 active:scale-95 transition-all">
                Teklif Al →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* --- ALT BANT ---
            flex-col mobilde (alt alta) → md:flex-row tablet'te (yan yana) → Kural 3 */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-blue-100/30 uppercase tracking-[0.3em] font-bold text-center md:text-left">
            © {new Date().getFullYear()} ÜÇÜZLER BİNA YÖNETİMİ · TÜM HAKLARI SAKLIDIR
          </p>
          <p className="text-[10px] text-cyan-500/30 uppercase tracking-widest font-medium">
            Profesyonel Yönetim · Güvenli Gelecek · Kayseri
          </p>
        </div>
      </div>
    </footer>
  );
}