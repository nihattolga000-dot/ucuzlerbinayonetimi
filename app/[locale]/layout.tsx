import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/Layout";
import { ThemeProvider } from "@/components/ThemeProvider";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Üçüzler Bina Yönetimi",
    default: "Üçüzler Bina Yönetimi | Kayseri Profesyonel Site Yönetimi",
  },
  icons: {
    icon: '/logo-round.png',
    apple: '/logo-round.png',
  }
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale ?? "tr";
  const messages = (await import(`../../locales/${locale}/common.json`)).default;

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <main className="w-full min-h-screen">{children}</main>
            <Footer />
            <ScrollToTop />
            <WhatsAppButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
