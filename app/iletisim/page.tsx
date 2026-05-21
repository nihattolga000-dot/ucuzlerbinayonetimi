"use client";

import { useState } from 'react';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Iletisim = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Form verileri
  const [formData, setFormData] = useState({
    user_name: '',
    user_phone: '',
    user_email: '',
    subject: 'Yönetim Teklifi Almak İstiyorum',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend API'ye istek
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ user_name: '', user_phone: '', user_email: '', subject: 'Yönetim Teklifi Almak İstiyorum', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(data.message || 'Hata');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Sunucu hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };


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
              <FaPaperPlane className="text-cyan-300 dark:text-cyan-400" />
              <span className="text-cyan-50 text-xs font-bold uppercase tracking-widest">Bizimle İletişime Geçin</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none"
            >
              İLETİŞİM <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">MERKEZİ</span>
            </motion.h1>
          </div>
          
          <div className="hidden lg:block relative w-64 h-48">
            {/* Telefon Kartı */}
            <motion.div 
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{ delay: 0.2, duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl backdrop-blur-md shadow-2xl flex items-center justify-center z-10"
            >
              <FaPhoneAlt className="text-3xl text-cyan-300 dark:text-cyan-400" />
            </motion.div>

            {/* Konum Kartı */}
            <motion.div 
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
              transition={{ delay: 0.4, duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-28 h-28 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl backdrop-blur-md shadow-2xl flex items-center justify-center z-20"
            >
              <FaMapMarkerAlt className="text-4xl text-blue-200 dark:text-blue-400" />
            </motion.div>

            {/* Mail Kartı (Merkez) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
              transition={{ delay: 0.6, duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/30 dark:border-cyan-500/30 rounded-full backdrop-blur-lg shadow-[0_0_40px_rgba(6,182,212,0.3)] flex items-center justify-center z-30"
            >
              <FaEnvelope className="text-5xl text-white drop-shadow-lg" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 mt-8 md:mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
          
          {/* SOL: İletişim Bilgileri */}
          <div className="lg:col-span-4 xl:col-span-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-xl dark:shadow-none h-full transition-colors duration-300"
            >
              <h3 className="text-blue-950 dark:text-white font-black uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-white/10 pb-4">
                BİLGİLERİMİZ
              </h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Adres</h4>
                  <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                    Sahabiye Mah. Ahmet Paşa Cad.<br/>
                    Kalender İş Merkezi No:41 Kat:6<br/>
                    Kocasinan / KAYSERİ
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Telefon & WhatsApp</h4>
                  <a href="tel:+905538873616" className="text-xl font-black text-cyan-600 dark:text-cyan-400 hover:text-blue-900 dark:hover:text-cyan-300 transition-colors">
                    +90 553 887 36 16
                  </a>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Çalışma Saatleri</h4>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    Pazartesi - Cumartesi<br/>
                    09:00 - 18:00
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* SAĞ: Form Alanı */}
          <div className="lg:col-span-8 xl:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="bg-white dark:bg-[#0f172a] p-8 md:p-10 rounded-3xl shadow-xl dark:shadow-none border border-gray-200 dark:border-white/10 relative transition-colors duration-300">
                
                <h3 className="text-2xl font-black text-blue-950 dark:text-white uppercase tracking-tighter mb-8">
                  Size Nasıl Yardımcı Olabiliriz?
                </h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-2 block">Ad Soyad</label>
                      <input 
                        type="text" name="user_name" value={formData.user_name} onChange={handleChange} required 
                        className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#020617] border-2 border-transparent focus:border-cyan-500 dark:focus:border-cyan-400 outline-none transition-all text-gray-800 dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-600 shadow-inner dark:shadow-none" 
                        placeholder="Adınız Soyadınız" 
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-2 block">Telefon</label>
                      <input 
                        type="tel" name="user_phone" value={formData.user_phone} onChange={handleChange} required 
                        className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#020617] border-2 border-transparent focus:border-cyan-500 dark:focus:border-cyan-400 outline-none transition-all text-gray-800 dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-600 shadow-inner dark:shadow-none" 
                        placeholder="05XX XXX XX XX" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-2 block">E-posta</label>
                    <input 
                      type="email" name="user_email" value={formData.user_email} onChange={handleChange} required 
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#020617] border-2 border-transparent focus:border-cyan-500 dark:focus:border-cyan-400 outline-none transition-all text-gray-800 dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-600 shadow-inner dark:shadow-none" 
                      placeholder="ornek@mail.com" 
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-2 block">Konu</label>
                    <div className="relative">
                      <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#020617] border-2 border-transparent focus:border-cyan-500 dark:focus:border-cyan-400 outline-none transition-all text-gray-800 dark:text-white font-medium appearance-none cursor-pointer shadow-inner dark:shadow-none">
                        <option value="Yönetim Teklifi Almak İstiyorum" className="text-gray-900">Yönetim Teklifi Almak İstiyorum</option>
                        <option value="Şikayet / Öneri" className="text-gray-900">Şikayet / Öneri</option>
                        <option value="Diğer" className="text-gray-900">Diğer</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-2 block">Mesaj</label>
                    <textarea 
                      name="message" value={formData.message} onChange={handleChange} required rows={5} 
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#020617] border-2 border-transparent focus:border-cyan-500 dark:focus:border-cyan-400 outline-none transition-all text-gray-800 dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-600 resize-none shadow-inner dark:shadow-none" 
                      placeholder="Mesajınızı buraya yazın..."
                    ></textarea>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={loading} 
                    className={`w-full py-5 rounded-xl font-black text-white shadow-lg flex items-center justify-center gap-3 transition-all text-sm uppercase tracking-widest ${
                      loading ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Gönderiliyor...</span>
                      </div>
                    ) : (
                      <>
                        <span>Mesajı Gönder</span>
                        <FaPaperPlane />
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Başarı / Hata Mesajları */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 rounded-xl flex items-center gap-3 justify-center"
                    >
                      <FaCheckCircle className="text-xl shrink-0" />
                      <div>
                        <span className="font-bold block">Harika!</span>
                        <span className="text-sm">Mesajınız başarıyla iletildi, teşekkürler.</span>
                      </div>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 rounded-xl flex items-center gap-3 justify-center"
                    >
                      <FaExclamationCircle className="text-xl shrink-0" />
                      <div>
                        <span className="font-bold block">Hata Oluştu</span>
                        <span className="text-sm">{errorMessage || 'Lütfen internet bağlantınızı kontrol edin.'}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Iletisim;