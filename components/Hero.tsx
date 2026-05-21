"use client"; //

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    title: "KAYSERİ'NİN EN GÜVENİLİR",
    highlight: "BİNA YÖNETİMİ",
    desc: "Şeffaf, dijital ve profesyonel yönetim anlayışıyla tanışın."
  },
  {
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070",
    title: "YAŞAM ALANLARINIZA",
    highlight: "DEĞER KATIYORUZ",
    desc: "Teknoloji odaklı çözümlerle komşuluk huzurunu sağlıyoruz."
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] md:h-[85vh] w-full overflow-hidden bg-black">
      {/* ARKA PLAN GEÇİŞLERİ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.5, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[index].image})` }}
        />
      </AnimatePresence>

      {/* İÇERİK ALANI */}
      <div className="relative z-10 w-full max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12 px-4 pt-20 lg:pt-0">
        
        {/* İÇERİK ALANI: Grid Yapısına Tam Uyumlu */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-10 xl:col-span-8 lg:col-start-1 text-center lg:text-left pt-20 lg:pt-0"
          >
            {/* Mobilde text-3xl, Tablette text-5xl, Masaüstünde text-7xl */}
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] md:leading-[1.2] lg:leading-[1.15] uppercase pb-2">
              {slides[index].title} <br className="hidden md:block" />
              <span className="text-cyan-400 inline-block mt-2 md:mt-3">{slides[index].highlight}</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-200 mt-4 md:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto md:mx-0 leading-relaxed font-medium"
            >
              {slides[index].desc}
            </motion.p>

            {/* BUTONLAR: Grid Yapısı İçinde Sub-Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0"
            >
              <Link 
                href="https://wa.me/905538873616" 
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 px-8 md:px-10 rounded-sm shadow-xl shadow-cyan-600/20 transition-all text-sm md:text-base text-center border-b-4 border-cyan-800"
              >
                ÜCRETSİZ TEKLİF AL
              </Link>
              <Link 
                href="#hizmetler" 
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md font-bold py-4 px-10 rounded-sm transition-all border border-white/30 text-sm md:text-base text-center"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#hizmetler')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                HİZMETLERİMİZ
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ALT GEÇİŞ GRADIENT */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 dark:from-[#020617] to-transparent z-20 transition-colors duration-300" />
    </section>
  );
}