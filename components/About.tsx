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
    <section id="hakkimizda" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* SOL TARAF: Yazı Alanı (Sola Süzülme Animasyonu) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="text-sm font-bold text-cyan-500 tracking-widest uppercase mb-2">Hakkımızda</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
              Bina Yönetiminde <br/>
              <span className="text-cyan-600">Profesyonel Dokunuş</span>
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
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
                  className="flex items-center text-gray-700"
                >
                  <span className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mr-3">✓</span>
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
            className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {/* Kutu 1 - Puan */}
            <div className="bg-cyan-50 p-6 sm:p-8 rounded-2xl text-center hover:bg-white hover:shadow-xl transition border border-cyan-100 group">
              <div className="text-4xl font-bold text-cyan-600 mb-2">
                <Counter from={0} to={5} suffix="/5" />
              </div>
              <div className="text-sm text-gray-600">Puan</div>
            </div>

            {/* Kutu 2 - Yönetilen Site */}
            <div className="bg-cyan-50 p-6 sm:p-8 rounded-2xl text-center hover:bg-white hover:shadow-xl transition border border-cyan-100">
              <div className="text-4xl font-bold text-cyan-600 mb-2">
                <Counter from={0} to={10} suffix="+" />
              </div>
              <div className="text-sm text-gray-600">Yönetilen Site</div>
            </div>

            {/* Kutu 3 - Mutlu Sakin */}
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl text-center hover:bg-white hover:shadow-xl transition border border-gray-100">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                <Counter from={0} to={900} suffix="+" />
              </div>
              <div className="text-sm text-gray-600">Mutlu Sakin</div>
            </div>

            {/* Kutu 4 - Müşteri Memnuniyeti */}
            <div className="bg-blue-900 p-6 sm:p-8 rounded-2xl text-center hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-4xl font-bold text-white mb-2">
                <Counter from={0} to={100} suffix="%" />
              </div>
              <div className="text-sm text-blue-200">Müşteri Memnuniyeti</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;