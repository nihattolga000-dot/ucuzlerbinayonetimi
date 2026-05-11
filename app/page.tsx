"use client"; // En üstte kalmalı


import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Hero from '@/components/Hero';
import Image from 'next/image';
import About from '@/components/About';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  FaWhatsapp, FaChartLine, FaGavel, FaTools,
  FaChevronDown, FaArrowRight, FaCreditCard,
  FaLeaf, FaBroom, FaUserShield, FaWater, FaTrash, FaInstagram, FaShieldAlt
} from 'react-icons/fa';

// TypeScript Tipleri
interface Referans {
  id: number;
  baslik: string;
  aciklama: string;
  resim_url: string;
}

interface Duyuru {
  id: number;
  baslik: string;
  icerik: string;
  etiket: string;
  tarih: string;
}

// --- ANIMASYON VARYANTLARI ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    scale: 1.03,
    y: -10,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    transition: { duration: 0.3 }
  }
};

const accordionVariants = {
  closed: { height: 0, opacity: 0, marginTop: 0 },
  open: {
    height: "auto",
    opacity: 1,
    marginTop: 16,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const
    }
  }
};

export default function Home() {
  const [referanslar, setReferanslar] = useState<Referans[]>([]);
  const [duyurular, setDuyurular] = useState<Duyuru[]>([]);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const fetchVeriler = async () => {
      // Referansları Çek
      const { data: rData } = await supabase.from('referanslar').select('*').order('created_at', { ascending: false });

      if (!rData || rData.length === 0) {
        const yedekReferanslar: Referans[] = [
          { id: 1, baslik: "Eşal Siteleri", aciklama: "KAYSERİ / BİNA YÖNETİMİ", resim_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" },
          { id: 2, baslik: "Toprak Apartmanı", aciklama: "KAYSERİ / BİNA YÖNETİMİ", resim_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80" },
          { id: 3, baslik: "Medine Apartmanı", aciklama: "KAYSERİ / BİNA YÖNETİMİ", resim_url: "https://images.unsplash.com/photo-1460317442991-0ec239f3674f?auto=format&fit=crop&w=800&q=80" },
          { id: 4, baslik: "Algül Apartmanı", aciklama: "KAYSERİ / BİNA YÖNETİMİ", resim_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" }
        ];
        setReferanslar(yedekReferanslar);
      } else {
        setReferanslar(rData);
      }

      // Duyuruları Çek
      const { data: dData } = await supabase.from('duyurular').select('*').order('tarih', { ascending: false }).limit(2);
      setDuyurular(dData || []);
    };
    fetchVeriler();
  }, []);

  const handleFooterScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const sssVerileri = [
    { q: "Aidatlar nasıl belirleniyor?", a: "Aidatlar, Kat Mülkiyeti Kanunu çerçevesinde binanın yıllık işletme projesi, personel giderleri, ortak alan enerji maliyetleri ve planlı bakım bütçeleri doğrultusunda şeffaf bir şekilde hesaplanır." },
    { q: "Borç ve ödemelerimi nereden görebilirim?", a: "Apsiyon mobil uygulaması üzerinden 7/24 güncel borç durumunuzu inceleyebilir, kredi kartı ile güvenli ve hızlı ödeme yapabilirsiniz." },
    { q: "Acil bir arıza durumunda kime ulaşmalıyım?", a: "7/24 hizmet veren teknik destek hattımızı arayarak veya mobil uygulamadan 'Arıza Bildirimi' oluşturarak profesyonel ekiplerimizin binanıza en kısa sürede müdahale etmesini sağlayabilirsiniz." },
    { q: "Gelir-Gider raporları ne zaman yayınlanıyor?", a: "Her aya ait detaylı gelir-gider tabloları ve banka ekstreleri bir sonraki ayın ilk haftasında sakin paneli ve mobil uygulamada dijital olarak ilan edilir." }
  ];

  const hizmetDetaylari = [
    { id: 1, title: "Online Hızlı Ödeme", icon: <FaCreditCard />, short: "Site sakinleri, aidat ve diğer ödemelerini güvenli online sistemimiz üzerinden 7/24 gerçekleştirebilirler.", details: ["Kredi kartı ile ödeme", "Güvenli SSL altyapısı", "Anlık makbuz üretimi"] },
    { id: 2, title: "Muhasebe & Aidat", icon: <FaChartLine />, short: "Gelir-gider raporları ve şeffaf muhasebe yönetimi ile finansal süreçleriniz tam kontrol altında.", details: ["Aylık detaylı raporlama", "Otomatik borç bilgilendirme", "Şeffaf bütçe yönetimi"] },
    { id: 3, title: "Teknik Bakım & Onarım", icon: <FaTools />, short: "Tesisat, elektrik ve genel bina onarımları uzman ekiplerimiz tarafından profesyonelce yürütülür.", details: ["7/24 teknik destek", "Planlı periyodik denetimler", "Hızlı arıza müdahalesi"] },
    { id: 4, title: "Çevre & Temizlik", icon: <FaBroom />, short: "Ortak alanlar ve merdivenler, hijyen standartlarına uygun günlük temizlik planına göre temizlenir.", details: ["Günlük blok temizliği", "Dezenfeksiyon işlemleri", "Hijyenik malzeme kullanımı"] },
    { id: 5, title: "Peyzaj & Bahçe Bakımı", icon: <FaLeaf />, short: "Yeşil alanların periyodik bakımı, ağaç budama ve peyzaj düzenlemeleri titizlikle gerçekleştirilir.", details: ["Çim biçme ve ilaçlama", "Mevsimlik çiçeklendirme", "Otomatik sulama kontrolü"] },
    { id: 6, title: "Mobil Görevli Hizmetleri", icon: <FaUserShield />, short: "Gezici ekiplerimizle binalarınıza düzenli ziyaretler gerçekleştirerek profesyonel denetim sunuyoruz.", details: ["Periyodik bina kontrolü", "Hızlı sorun tespiti", "Mobil raporlama desteği"] },
    { id: 7, title: "Sayaç Okuma & Fatura", icon: <FaWater />, short: "Su, elektrik ve doğalgaz sayaçları hatasız okunarak şeffaf bir şekilde faturalandırılır.", details: ["Isı pay ölçer okuma", "Adil gider paylaşımı", "Dijital fatura raporu"] },
    { id: 8, title: "Bina Çöp Toplama", icon: <FaTrash />, short: "Evsel atıklar, belirlenen saatlerde düzenli olarak katlardan toplanır ve hijyenik olarak bertaraf edilir.", details: ["Günlük düzenli toplama", "Koku önleyici tedbirler", "Atık ayrıştırma desteği"] },
    { id: 9, title: "Hukuki Danışmanlık", icon: <FaGavel />, short: "Kat Mülkiyeti Kanunu çerçevesinde profesyonel hukuki süreç ve danışmanlık hizmeti sunuyoruz.", details: ["KMK uyumlu yönetim", "İcra süreç takibi", "Uyuşmazlık çözümleri"] }
  ];

  return (
    <main id="anasayfa" className="min-h-screen bg-gray-50 overflow-x-hidden relative font-sans text-gray-900 leading-relaxed">
      <Hero />
      <About />

      {/* --- MİSYON & VİZYON --- */}
      <motion.section
        id="hakkimizda"
        className="py-12 md:py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* w-full → mobilde tam genişlik; max-w-7xl → masaüstünde 80rem sınırı; mx-auto → yatayda ortala; px-4 → mobil kenar boşluğu */}
        <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <motion.div variants={sectionVariants} className="p-6 md:p-8 lg:p-12 rounded-[2rem] bg-blue-50 border-l-8 border-cyan-500 shadow-sm">
            {/* text-2xl mobilde, md:text-3xl tablet+ → Kural 4: rem tabanlı responsive tipografi */}
            <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-4 uppercase tracking-tighter">Misyonumuz</h2>
            <p className="text-gray-700 italic">"Site sakinlerinin ihtiyaçlarını hızlı ve etkili şekilde karşılamak; muhasebe, temizlik ve teknik süreçleri profesyonelce yönetmek."</p>
          </motion.div>
          <motion.div variants={sectionVariants} className="p-6 md:p-8 lg:p-12 rounded-[2rem] bg-blue-900 text-white border-l-8 md:border-l-0 md:border-r-8 border-blue-400 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-black text-cyan-400 mb-4 uppercase tracking-tighter">Vizyonumuz</h2>
            <p className="text-blue-100">"Türkiye’de bina ve site yönetimi alanında şeffaf, güvenilir ve teknolojik çözümlerle örnek bir marka olmak."</p>
          </motion.div>
        </div>
      </motion.section>

      {/* --- HİZMETLER --- */}
      {/* section kapsayıcısı: w-full taşmayı önler, max-w-7xl içeriği sınırlar → Kural 2 & 3 */}
      <section id="hizmetler" className="w-full py-16 md:py-24 text-left">
        {/* İç div ile max-w sınırı uygulanır; section'ın arkaplan rengi tam genişlik kalır */}
        <div className="w-full max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-blue-900 uppercase tracking-tighter">YÖNETİMDE <span className="text-cyan-600">TAM HİZMET</span> PAKETİ</h2>
            {/* text-sm mobilde, md:text-lg tablet+ → Kural 4 */}
            <p className="text-gray-500 mt-4 text-sm md:text-lg">"Siz huzurla yaşayın, biz profesyonelce yönetelim."</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {hizmetDetaylari.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={cardVariants}
                whileHover="hover"
                onClick={() => setActiveService(activeService === item.id ? null : item.id)}
                className={`cursor-pointer p-6 md:p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col ${activeService === item.id ? 'bg-blue-900 text-white border-blue-900 shadow-2xl scale-[1.02] z-10' : 'bg-white text-gray-800 border-transparent shadow-md hover:border-cyan-500'
                  }`}
              >
                <div className={`text-4xl mb-4 ${activeService === item.id ? 'text-cyan-400' : 'text-cyan-600'}`}>{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 uppercase tracking-tight leading-tight">{item.title}</h3>
                <p className={`text-sm mb-4 leading-relaxed ${activeService === item.id ? 'text-blue-100' : 'text-gray-500'}`}>{item.short}</p>
                <AnimatePresence mode="wait">
                  {activeService === item.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 pt-4 border-t border-white/20">
                      <ul className="space-y-3">
                        {item.details.map((detail, i) => (
                          <motion.li initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} key={i} className="flex items-start gap-3 text-sm text-blue-50/90 font-medium">✓ {detail}</motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div animate={{ rotate: activeService === item.id ? 180 : 0 }} className="mt-6 flex justify-center">
                  <FaChevronDown className={activeService === item.id ? 'text-cyan-400' : 'text-gray-300'} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- APSİYON YÖNETİM PANELİ & HAVUZ SİSTEMİ VURGUSU --- */}
      <section className="py-24 bg-white overflow-hidden border-y border-gray-100 text-left">
        <div className="w-full max-w-7xl mx-auto px-4">
          {/* Kural 3: mobilde flex-col (alt alta), lg:flex-row (yan yana) */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative flex justify-center"
            >
              <div className="relative z-10 w-full max-w-2xl group">
                <div className="relative bg-gray-800 rounded-[1.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[1px] border-gray-700">
                  <div className="relative rounded-[1rem] overflow-hidden bg-white aspect-[16/10] border-2 border-gray-900">
                    <Image
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                      alt="Apsiyon Yönetim Paneli"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent"></div>
                  </div>
                </div>
                <div className="w-32 h-16 bg-gradient-to-b from-gray-700 to-gray-900 mx-auto rounded-b-3xl shadow-lg -mt-1 relative z-0"></div>
                <div className="w-48 h-2 bg-gray-900 mx-auto rounded-full shadow-md opacity-20"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400 rounded-full blur-[140px] opacity-10"></div>
            </motion.div>

            <div className="lg:w-1/2 text-left">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 relative bg-blue-900 rounded-xl flex items-center justify-center p-2 shadow-lg">
                    <span className="text-white font-black text-xs uppercase">APS</span>
                  </div>
                  <span className="text-cyan-600 font-bold uppercase tracking-[0.3em] text-sm">Dijital Yönetim Merkezi</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-blue-900 uppercase tracking-tighter leading-tight mb-6">
                  ŞEFFAF <br /><span className="text-cyan-600">BAĞIMSIZ YÖNETİM</span>
                </h2>

                <div className="bg-blue-50 border-l-4 border-blue-900 p-6 rounded-2xl mb-8 shadow-sm">
                  <h4 className="flex items-center gap-2 text-blue-900 font-black uppercase text-sm mb-2 italic">
                    <FaShieldAlt className="text-cyan-600" /> Kayseri'de İlk ve Tek!
                  </h4>
                  <p className="text-gray-700 font-bold leading-relaxed">
                    Sektördeki "Havuz Sistemi" riskine son veriyoruz. <span className="text-blue-900 font-black underline">Havuz sistemi olmadan</span> her site için bağımsız hesap tanımlıyor, aidatlarınızı doğrudan kendi sitenizin özel hesabına yönlendiriyoruz.
                  </p>
                </div>

                <p className="text-gray-500 text-lg mb-8 leading-relaxed font-medium">
                  Üçüzler Bina Yönetimi, sektör lideri <strong>Apsiyon</strong> altyapısı ile her şeyi şeffafça takip etmenizi sağlar. Muhasebe raporlarından teknik arıza takibine kadar her veri parmaklarınızın ucunda.
                </p>

                <div className="flex flex-col gap-4">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest pl-1 italic">APSİYON Uygulamasını İndirin</p>
                  <div className="flex flex-wrap gap-6 items-center">
                    <a href="https://apps.apple.com/tr/app/apsiyon/id742594884?l=tr" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" width={160} height={50} className="h-12 w-auto" />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.apsiyon.android&hl=tr" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width={180} height={50} className="h-12 w-auto" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- REFERANS VİZYONU (TİPOGRAFİK BANNER) --- */}
      <section id="referanslar" className="py-24 md:py-32 bg-blue-900 relative overflow-hidden flex items-center justify-center min-h-[50vh]">
        {/* Arka plan süslemeleri */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[150px] opacity-20 -z-0 pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400 rounded-full blur-[150px] opacity-20 -z-0 pointer-events-none mix-blend-screen"></div>

        {/* Çok ince doku (grid pattern) */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0"></div>

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs md:text-sm mb-6 block drop-shadow-md">
              Mükemmelliyetin Karşılığı
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight mb-8">
              EN BÜYÜK REFERANSIMIZ, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-200">
                DEĞİŞMEYEN KALİTEMİZDİR.
              </span>
            </h2>

            <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>

            <p className="text-blue-100/90 text-lg md:text-xl md:leading-relaxed font-light">
              Yılların getirdiği tecrübe ile binlerce haneye güven ve şeffaflık taşıyoruz. Bina isminden bağımsız olarak,
              dokunduğumuz her ortak yaşam alanında kendi kalite imzamızı bırakıyoruz. Çünkü bizim için asıl önemli olan binalar değil, içinde huzurla yaşayan ailelerdir.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- YÖNETİM SÜRECİ --- */}
      <section className="py-24 bg-blue-900 text-white relative overflow-hidden text-left">
        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              4 ADIMDA <span className="text-cyan-400">PROFESYONEL YÖNETİM</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>

            {[
              { step: "01", title: "Ücretsiz Keşif", desc: "Binanızı yerinde inceliyor, eksikleri tespit ediyoruz." },
              { step: "02", title: "Planlama", desc: "Yıllık işletme projesini ve bütçeyi hazırlıyoruz." },
              { step: "03", title: "Dijital Geçiş", desc: "Sitenizi Apsiyon sistemine ve banka hesaplarına bağlıyoruz." },
              { step: "04", title: "Huzurlu Yaşam", desc: "Tüm süreçleri 7/24 şeffaf şekilde yönetmeye başlıyoruz." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 text-center md:text-left"
              >
                <div className="text-6xl font-black text-white/10 absolute -top-4 right-4">{step.step}</div>
                <h3 className="text-xl font-black text-cyan-400 mb-4 uppercase">{step.title}</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HABERLER & DUYURULAR (DİNAMİK) --- */}
      <section className="py-20 bg-white border-b border-gray-100 text-left">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="text-left">
              <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">GÜNCEL <span className="text-cyan-600">DUYURULAR</span></h2>
              <p className="text-gray-500 mt-2">Üçüzler Yönetim'den son haberler ve projeler.</p>
            </div>
            <Link href="/iletisim" className="text-blue-900 font-black uppercase text-sm tracking-widest border-b-2 border-cyan-500 pb-1 hover:text-cyan-600 transition-all">
              Tümünü Gör →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {duyurular.length > 0 ? duyurular.map((duyuru) => (
              <div key={duyuru.id} className="flex gap-6 p-6 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-500 group border border-transparent hover:border-gray-100">
                <div className="w-24 h-24 bg-blue-900 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center text-white">
                  <span className="text-2xl font-black leading-none">{new Date(duyuru.tarih).getDate()}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest mt-1">
                    {new Date(duyuru.tarih).toLocaleDateString('tr-TR', { month: 'short' })}
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-cyan-600 text-[10px] font-black uppercase tracking-widest">{duyuru.etiket}</span>
                  <h4 className="text-lg font-black text-blue-900 uppercase tracking-tight mt-1 group-hover:text-cyan-600 transition-colors">{duyuru.baslik}</h4>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2 italic">{duyuru.icerik}</p>
                </div>
              </div>
            )) : (
              <p className="text-gray-400 italic col-span-2 text-center">Henüz güncel bir duyuru bulunmamaktadır.</p>
            )}
          </div>
        </div>
      </section>

      {/* --- HARİTA VE İLETİŞİM --- */}
      <section id="iletisim_bolumu" className="py-20 bg-white px-4">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full max-w-7xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
            <div className="lg:w-2/3 h-[400px] lg:h-[600px] relative grayscale hover:grayscale-0 transition-all duration-1000">
              <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d241.65845244577216!2d35.49174568112392!3d38.725098876041415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzjCsDQzJzMwLjQiTiAzNcKwMjknMzAuNyJF!5e1!3m2!1str!2str!4v1769358296658!5m2!1str!2str" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
              <div className="absolute top-6 left-6 bg-blue-900 text-white px-6 py-3 rounded-2xl font-bold shadow-xl">📍 Kocasinan / KAYSERİ</div>
            </div>
            <div className="lg:w-1/3 p-6 md:p-12 flex flex-col justify-center bg-gray-50 text-left">
              <div className="mb-8">
                <h3 className="text-3xl font-black text-blue-900 uppercase tracking-tighter leading-none">ÜÇÜZLER</h3>
                <p className="text-sm text-cyan-600 font-bold uppercase tracking-widest mt-1">BİNA YÖNETİMİ</p>
              </div>
              <div className="space-y-8 mb-10 text-left">
                <div className="flex items-start gap-4">
                  <FaArrowRight className="text-blue-900 mt-1 shrink-0 rotate-[-45deg]" />
                  <p className="text-gray-600 text-sm">Sahabiye Mah. Ahmet Paşa Cad. Kalender İş Merkezi No:41 Kat:6 Kocasinan/KAYSERİ</p>
                </div>
                <div className="flex items-start gap-4">
                  <FaWhatsapp className="text-green-600 mt-1 shrink-0 text-xl" />
                  <p className="text-gray-600 font-bold">+90 (553) 887 36 16</p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/iletisim" className="group bg-blue-900 text-white font-bold py-5 rounded-3xl shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-sm transition-all hover:bg-blue-800">
                  TEKLİF ALMA FORMUNA GİT <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- SSS --- */}
      <section id="sss" className="py-24 bg-blue-50 px-4 text-left">
        {/* max-w-4xl SSS için daha dar bir kapsayıcı; px-4 mobil kenar boşluğu → Kural 2 */}
        <div className="w-full max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-blue-900 uppercase tracking-tighter">SIKÇA SORULAN <span className="text-cyan-600">SORULAR</span></h2>
            <p className="text-gray-500 mt-4 italic font-medium">Bina yönetimi ve şeffaflık süreçlerimiz hakkında yanıtlar.</p>
          </motion.div>
          <div className="space-y-4">
            {sssVerileri.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 md:p-8 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-bold text-blue-900 md:text-lg pr-4">{item.q}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0, backgroundColor: activeFaq === index ? '#0891b2' : '#f1f5f9' }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0"
                  >
                    <FaChevronDown className={activeFaq === index ? 'text-white' : 'text-cyan-600'} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div initial="closed" animate="open" exit="closed" variants={accordionVariants} className="px-6 md:px-8 pb-8 text-gray-600 leading-relaxed font-medium">
                      <div className="pt-4 border-t border-gray-50">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

