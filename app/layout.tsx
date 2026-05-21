import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Header: yeni, Mobile-First hamburger menü bileşeni (components/Header.tsx)
import Header from "@/components/Header";
// Footer: yeni, 3 sütunlu mobile-first footer (components/Footer.tsx)
import Footer from "@/components/Footer";
// ScrollToTop: sayfa yukarı kaydırma butonu
import ScrollToTop from "@/components/ScrollToTop";
// WhatsAppButton: sabit WhatsApp CTA butonu
import WhatsAppButton from "@/components/Layout";
// ThemeProvider: Dark/Light Mode sağlayıcısı
import { ThemeProvider } from "@/components/ThemeProvider";

// --- FONT TANIMLARI ---
// next/font/google ile font değişkenleri tanımlanır;
// bu sayede layout shift (CLS) sıfır olur ve Google'dan harici istek gitmez.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Font yüklenene kadar sistem fontu gösterilir → CLS düşer
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// --- VIEWPORT (KURAL 1) ---
// Next.js 14+ App Router'da viewport, metadata objesinden AYRILMALIDIR.
// Eski yöntem: metadata içinde viewport string → build uyarısı verir.
// Doğru yöntem: ayrı bir `viewport` named export.
export const viewport: Viewport = {
  // width=device-width → mobil tarayıcı sayfayı cihaz genişliğine sığdırır
  // initial-scale=1 → varsayılan zoom seviyesi
  // maximum-scale=5 → erişilebilirlik: kullanıcı zoom yapabilmeli
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1e3a8a" }, // blue-900
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

// --- META VERİLER ---
// viewport buraya konmaz; yukarıdaki export ile ayrıldı.
export const metadata: Metadata = {
  title: {
    // template: alt sayfalarda "İletişim | Üçüzler Bina Yönetimi" şeklinde görünür
    template: "%s | Üçüzler Bina Yönetimi",
    default: "Üçüzler Bina Yönetimi | Kayseri Profesyonel Site Yönetimi",
  },
  description:
    "Kayseri'de şeffaf, güvenilir ve bağımsız hesap yönetimi sunan bina yönetim firması. Havuz sistemi olmadan her siteye özel hesap.",
  keywords: [
    "bina yönetimi",
    "site yönetimi",
    "kayseri",
    "aidat",
    "apsiyon",
    "üçüzler",
  ],
  // openGraph: sosyal medya paylaşımlarında önizleme için
  openGraph: {
    title: "Üçüzler Bina Yönetimi",
    description:
      "Kayseri'nin güvenilir bina yönetim firması. Şeffaf hesap, dijital takip.",
    locale: "tr_TR",
    type: "website",
  },
};

// --- KÖK LAYOUT ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang="tr" → ekran okuyucular ve SEO için zorunlu
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          font-sans          /* CSS değişkeni üzerinden Geist Sans aktif */
          antialiased        /* macOS/iOS'ta kenar yumuşatma */
          bg-gray-50         /* Light Mode arkaplan */
          dark:bg-[#020617]  /* Dark Mode arkaplan (Derin uzay siyahı) */
          text-gray-900      /* Light metin */
          dark:text-gray-100 /* Dark metin */
          overflow-x-hidden  /* Mobilde yatay taşmaları önler */
          transition-colors duration-300
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Header: sticky navigasyon, hamburger menü dahil */}
          <Header />

          <main className="w-full min-h-screen">
            {children}
          </main>

          <Footer />
          <ScrollToTop />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}