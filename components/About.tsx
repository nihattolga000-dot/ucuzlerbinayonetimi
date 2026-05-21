"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

// --- SAYAÇ BİLEŞENİ ---
interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
}

function Counter({ from, to, duration = 2, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: duration,
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return () => controls.stop();
    }
  }, [from, to, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// --- ANA ABOUT BİLEŞENİ ---
const About = () => {
  return (
    <section id="hakkimizda" className="py-20 bg-white dark:bg-[#020617] overflow-hidden transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 text-left">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <h2 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 tracking-[0.3em] uppercase mb-2">Hakkımızda</h2>
            <h3 className="text-3xl md:text-5xl font-black text-blue-950 dark:text-white mb-6 tracking-tighter uppercase leading-tight">
              Bina Yönetiminde <br/>
              <span className="text-cyan-600 dark:text-cyan-400">Profesyonel Dokunuş</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-medium">
              Üçüzler Bina Yönetimi olarak, yaşam alanlarınızın huzurunu ve düzenini sağlamak için teknolojiyi ve şeffaflığı birleştiriyoruz. 
              Apartman, site ve iş merkezleri yönetiminde, hukuki ve mali süreçleri uzman kadromuzla yönetiyor, 
              size sadece konforu yaşamak kalıyor.
            </p>
            
            {/* Madde İşaretleri */}
            <ul className="space-y-4">
              {[
                "7/24 Teknik Destek ve Acil Müdahale",
                "Şeffaf Muhasebe ve Online Takip",
                "Hukuki Danışmanlık Hizmeti"
              ].map((text, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (i * 0.2) }}
                  className="flex items-center text-gray-700 dark:text-gray-300 font-medium"
                >
                  <span className="w-6 h-6 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center mr-3 border dark:border-cyan-500/20">✓</span>
                  {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* SAĞ TARAF: İstatistik Kutuları (Yukarı Süzülme ve Sayıcılar) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {/* Kutu 1 - Puan */}
            <div className="bg-white dark:bg-white/5 p-6 sm:p-8 rounded-sm text-center shadow-lg hover:shadow-2xl dark:shadow-none transition border border-gray-200 dark:border-white/10 border-l-4 border-l-cyan-600 dark:border-l-cyan-400 group">
              <div className="text-4xl font-black text-blue-950 dark:text-white mb-2">
                <Counter from={0} to={5} suffix="/5" />
              </div>
              <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Puan</div>
            </div>

            {/* Kutu 2 - Yönetilen Site */}
            <div className="bg-white dark:bg-white/5 p-6 sm:p-8 rounded-sm text-center shadow-lg hover:shadow-2xl dark:shadow-none transition border border-gray-200 dark:border-white/10 border-l-4 border-l-blue-950 dark:border-l-blue-500 group">
              <div className="text-4xl font-black text-cyan-600 dark:text-cyan-400 mb-2">
                <Counter from={0} to={10} suffix="+" />
              </div>
              <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Yönetilen Site</div>
            </div>

            {/* Kutu 3 - Mutlu Sakin */}
            <div className="bg-white dark:bg-white/5 p-6 sm:p-8 rounded-sm text-center shadow-lg hover:shadow-2xl dark:shadow-none transition border border-gray-200 dark:border-white/10 border-l-4 border-l-gray-400 dark:border-l-gray-500 group">
              <div className="text-4xl font-black text-blue-950 dark:text-white mb-2">
                <Counter from={0} to={900} suffix="+" />
              </div>
              <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Mutlu Sakin</div>
            </div>

            {/* Kutu 4 - Müşteri Memnuniyeti */}
            <div className="bg-blue-950 dark:bg-cyan-900/20 p-6 sm:p-8 rounded-sm text-center shadow-2xl dark:shadow-none hover:shadow-cyan-600/30 transition transform hover:-translate-y-1 border border-blue-900 dark:border-white/10 border-l-4 border-l-cyan-400">
              <div className="text-4xl font-black text-white dark:text-cyan-400 mb-2">
                <Counter from={0} to={100} suffix="%" />
              </div>
              <div className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Memnuniyet</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;