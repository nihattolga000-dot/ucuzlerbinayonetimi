"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaShieldAlt, FaArrowLeft, FaFileSignature, FaUserSecret, FaGavel, FaRegCheckCircle, FaBuilding } from 'react-icons/fa';

export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#020617] pb-32 transition-colors duration-300">
      {/* ÜST HEADER - Güçlü Kurumsal Görünüm */}
      <div className="w-full bg-gradient-to-b from-blue-900 to-blue-950 dark:from-[#020617] dark:to-[#0f172a] pt-32 pb-20 px-4 relative overflow-hidden border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-full mb-6"
            >
              <FaShieldAlt className="text-cyan-300 dark:text-cyan-400" />
              <span className="text-cyan-50 text-xs font-bold uppercase tracking-widest">Yasal Bilgilendirme</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none"
            >
              KVKK <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AYDINLATMA METNİ</span>
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center justify-center w-48 h-48 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-full backdrop-blur-sm shadow-2xl"
          >
            <FaFileSignature className="text-7xl text-cyan-300/80 dark:text-cyan-500/50" />
          </motion.div>
        </div>
      </div>

      {/* İÇERİK ALANI - Grid Yapısı (Sol: Menü, Sağ: İçerik) */}
      <div className="w-full max-w-7xl mx-auto px-4 mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
          
          {/* SOL: İçindekiler (Sticky) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <div className="sticky top-32 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl dark:shadow-none transition-colors duration-300">
              <h3 className="text-blue-950 dark:text-white font-black uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-white/10 pb-4">
                İÇİNDEKİLER
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="#veri-sorumlusu" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium">
                    <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-xs font-bold text-blue-900 dark:text-gray-300">1</span>
                    Veri Sorumlusu
                  </a>
                </li>
                <li>
                  <a href="#islenme-amaci" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium">
                    <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-xs font-bold text-blue-900 dark:text-gray-300">2</span>
                    İşlenme Amacı
                  </a>
                </li>
                <li>
                  <a href="#yasal-haklar" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium">
                    <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-xs font-bold text-blue-900 dark:text-gray-300">3</span>
                    Yasal Haklarınız
                  </a>
                </li>
              </ul>

              <div className="mt-12 pt-6 border-t border-gray-100 dark:border-white/10">
                <Link 
                  href="/" 
                  className="flex items-center justify-center gap-2 w-full py-4 bg-blue-950 dark:bg-white text-white dark:text-blue-950 font-black rounded-xl hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors uppercase tracking-widest text-xs shadow-lg dark:shadow-none"
                >
                  <FaArrowLeft /> ANA SAYFAYA DÖN
                </Link>
              </div>
            </div>
          </div>

          {/* SAĞ: Yasal Metinler */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Giriş */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-none transition-colors duration-300"
            >
              <p className="text-xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                Üçüzler Bina Yönetimi olarak, <strong className="text-cyan-600 dark:text-cyan-400">6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”)</strong> uyarınca kişisel verilerinizin güvenliğine, gizliliğine ve hukuka uygun şekilde işlenmesine en üst düzeyde önem veriyoruz.
              </p>
            </motion.div>

            {/* Bölüm 1 */}
            <motion.div 
              id="veri-sorumlusu"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-none border border-gray-200 dark:border-white/10 border-l-[8px] border-l-cyan-600 dark:border-l-cyan-500 scroll-mt-32 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-50 dark:bg-white/10 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center text-2xl border border-gray-200 dark:border-transparent">
                  <FaBuilding />
                </div>
                <h2 className="text-2xl font-black text-blue-950 dark:text-white uppercase tracking-tighter m-0">1. Veri Sorumlusu</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                Sahabiye Mahallesi Ahmet Paşa Caddesi Kalender İş Merkezi 41/10 adresinde mukim <strong className="text-cyan-600 dark:text-cyan-400">Üçüzler Bina Yönetimi</strong>, KVKK kapsamında "Veri Sorumlusu" sıfatıyla hareket etmekte olup, kişisel verileriniz işbu Aydınlatma Metni'nde açıklanan sınırlar çerçevesinde işlenmektedir.
              </p>
            </motion.div>

            {/* Bölüm 2 */}
            <motion.div 
              id="islenme-amaci"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-none border border-gray-200 dark:border-white/10 border-l-[8px] border-l-blue-600 dark:border-l-blue-500 scroll-mt-32 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-50 dark:bg-white/10 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-2xl border border-gray-200 dark:border-transparent">
                  <FaUserSecret />
                </div>
                <h2 className="text-2xl font-black text-blue-950 dark:text-white uppercase tracking-tighter m-0">2. Verilerin İşlenme Amacı</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
                Kişisel verileriniz, şirketimiz tarafından sunulan yönetim hizmetlerinin eksiksiz bir şekilde ifa edilebilmesi amacıyla işlenmektedir. Başlıca işleme amaçlarımız şunlardır:
              </p>
              <ul className="space-y-4">
                {[
                  "Aidat ve gider avansı tahsilat süreçlerinin yürütülmesi",
                  "Bina, site ve iş merkezi güvenliğinin sağlanması",
                  "Hukuki ve mali yükümlülüklerin eksiksiz yerine getirilmesi",
                  "Sakinlerimize yönelik hizmet kalitesinin artırılması ve iletişimin sağlanması"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    <FaRegCheckCircle className="text-cyan-600 dark:text-cyan-400 mt-1 shrink-0 text-2xl" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Bölüm 3 */}
            <motion.div 
              id="yasal-haklar"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/80 dark:to-[#0f172a] backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-none border border-gray-200 dark:border-white/10 border-l-[8px] border-l-cyan-600 dark:border-l-cyan-300 text-blue-950 dark:text-white scroll-mt-32 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-8 border-b border-gray-200 dark:border-white/10 pb-6">
                <div className="w-14 h-14 bg-white dark:bg-white/10 text-cyan-600 dark:text-cyan-300 rounded-full flex items-center justify-center text-2xl border border-gray-100 dark:border-transparent shadow-sm dark:shadow-none">
                  <FaGavel />
                </div>
                <h2 className="text-2xl font-black text-blue-950 dark:text-white uppercase tracking-tighter m-0">3. Yasal Haklarınız</h2>
              </div>
              <p className="text-gray-700 dark:text-blue-100 leading-relaxed text-lg mb-8">
                KVKK’nın 11. maddesi uyarınca, veri sahibi olarak aşağıdaki yasal haklara sahipsiniz:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Kişisel veri işlenip işlenmediğini öğrenme",
                  "İşlenmişse buna ilişkin bilgi talep etme",
                  "İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme",
                  "Eksik veya yanlış işlenen verilerin düzeltilmesini isteme",
                  "Kanuna uygun olarak verilerin silinmesini talep etme",
                  "Otomatik sistemler ile yapılan analizlere itiraz etme"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 p-5 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 backdrop-blur-sm hover:shadow-md dark:hover:bg-white/10 transition-all">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 dark:bg-cyan-400 shrink-0"></span>
                    <span className="text-sm md:text-base font-medium text-gray-800 dark:text-blue-50">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Mobil için Ana Sayfa Butonu */}
            <div className="lg:hidden mt-12 pt-8 flex justify-center">
              <Link 
                href="/" 
                className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 bg-blue-950 dark:bg-white text-white dark:text-blue-950 font-black rounded-2xl shadow-xl hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors uppercase tracking-widest text-sm"
              >
                <FaArrowLeft /> ANA SAYFAYA DÖN
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}