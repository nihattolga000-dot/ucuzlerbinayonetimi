"use client";

import React, from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaTag } from 'react-icons/fa';

import { blogYazilari } from '@/utils/blogData';

export default function BlogDetailPage({ params }: { params: { id: string, locale: string } }) {
  const blog = blogYazilari.find(b => b.id.toString() === params.id);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#020617] pt-24 pb-20 transition-colors duration-300">
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Geri Dön Butonu */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href={`/${params.locale}#iletisim`} className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold hover:text-blue-900 dark:hover:text-white transition-colors uppercase text-sm tracking-widest">
            <FaArrowLeft /> Tüm Haberlere Dön
          </Link>
        </motion.div>

        {/* Blog İçeriği Kartı */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white dark:bg-white/5 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden"
        >
          {/* Header Resim */}
          <div className="relative w-full h-[300px] md:h-[450px]">
            <Image 
              src={blog.resim_url} 
              alt={blog.baslik} 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            {/* Resim Üzeri Bilgiler */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col items-start gap-4">
              <span className="bg-cyan-600 text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                {blog.etiket}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                {blog.baslik}
              </h1>
              <div className="flex items-center gap-4 text-white/80 text-sm md:text-base font-medium mt-2">
                <span className="flex items-center gap-2"><FaCalendarAlt /> {blog.tarih}</span>
                <span className="flex items-center gap-2"><FaTag /> Üçüzler Yönetim</span>
              </div>
            </div>
          </div>

          {/* Yazı Metni */}
          <div className="p-6 md:p-10 lg:p-12 text-gray-700 dark:text-gray-300">
            {/* Özet Alanı */}
            <div className="mb-10 p-6 bg-blue-50 dark:bg-cyan-900/20 border-l-4 border-blue-900 dark:border-cyan-500 rounded-r-xl italic text-lg text-blue-900 dark:text-cyan-100 shadow-sm">
              "{blog.ozet}"
            </div>

            {/* Detaylı İçerik Html Rendering */}
            <div 
              className="prose prose-lg dark:prose-invert prose-cyan max-w-none 
                         prose-headings:text-blue-900 dark:prose-headings:text-white
                         prose-p:leading-relaxed prose-a:text-cyan-600 dark:prose-a:text-cyan-400"
              dangerouslySetInnerHTML={{ __html: blog.detayli_icerik }}
            />
          </div>
        </motion.article>

        {/* CTA (Harekete Geçirici Mesaj) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mt-12 bg-blue-900 dark:bg-[#0f172a] rounded-2xl p-8 md:p-12 text-center border border-transparent dark:border-white/10 shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4">
            Daha Fazla Bilgiye mi İhtiyacınız Var?
          </h3>
          <p className="text-blue-100/80 mb-8 max-w-2xl mx-auto">
            Bina yönetiminizle ilgili tüm yasal süreçler, teknik problemler ve muhasebe işlemleri için profesyonel destek alabilirsiniz.
          </p>
          <Link href={`/${params.locale}/iletisim`} className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 px-8 rounded-full transition-colors uppercase tracking-widest text-sm shadow-lg shadow-cyan-500/30">
            Hemen Bizimle İletişime Geçin
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
