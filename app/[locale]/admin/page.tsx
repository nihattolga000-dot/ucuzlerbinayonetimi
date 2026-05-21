"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'; // Animasyon için eklendi

export default function AdminPanel() {
  // --- STATE TANIMLARI ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState('mesajlar');

  type Mesaj = { id: number; ad_soyad: string; telefon: string; mesaj: string; created_at: string };
  type Referans = { id: number; baslik: string; aciklama: string; resim_url: string; created_at: string };
  type Duyuru = { id: number; etiket: string; baslik: string; icerik: string; tarih: string };

  const [mesajlar, setMesajlar] = useState<Mesaj[]>([]);
  const [referanslar, setReferanslar] = useState<Referans[]>([]);
  const [duyurular, setDuyurular] = useState<Duyuru[]>([]);

  const [uploading, setUploading] = useState(false);
  const [yeniReferans, setYeniReferans] = useState({
    baslik: '',
    aciklama: '',
    resim: null as File | null
  });
  const [yeniDuyuru, setYeniDuyuru] = useState({ etiket: '', baslik: '', icerik: '', tarih: '' });

  // --- GİRİŞ FONKSİYONLARI ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASS || 'uCu<Zler2025';
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      fetchVeriler();
    } else {
      alert("Hatalı Şifre!");
    }
  };

  const fetchVeriler = () => {
    fetchMesajlar();
    fetchReferanslar();
    fetchDuyurular();
  };

  // --- MESAJ İŞLEMLERİ ---
  const fetchMesajlar = async () => {
    const { data } = await supabase.from('mesajlar').select('*').order('created_at', { ascending: false });
    setMesajlar(data || []);
  };

  const mesajSil = async (id: number) => {
    if (!confirm('Silmek istediğine emin misin?')) return;
    await supabase.from('mesajlar').delete().eq('id', id);
    setMesajlar(mesajlar.filter(m => m.id !== id));
  };

  // --- REFERANS İŞLEMLERİ ---
  const fetchReferanslar = async () => {
    const { data } = await supabase.from('referanslar').select('*').order('created_at', { ascending: false });
    setReferanslar(data || []);
  };

  const handleDosyaSec = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setYeniReferans({ ...yeniReferans, resim: e.target.files[0] });
    }
  };

  const referansEkle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniReferans.resim || !yeniReferans.baslik) {
      alert("Lütfen başlık ve resim seçiniz.");
      return;
    }

    setUploading(true);

    try {
      const dosyaUzanti = yeniReferans.resim.name.split('.').pop();
      const dosyaAdi = `${Date.now()}-yeni-referans.${dosyaUzanti}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('referans-fotolari')
        .upload(dosyaAdi, yeniReferans.resim);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('referans-fotolari')
        .getPublicUrl(dosyaAdi);

      const { data: dbData, error: dbError } = await supabase
        .from('referanslar')
        .insert([{
          baslik: yeniReferans.baslik,
          aciklama: yeniReferans.aciklama,
          resim_url: publicUrl
        }])
        .select();

      if (dbError) throw dbError;

      if (dbData) setReferanslar([dbData[0], ...referanslar]);
      setYeniReferans({ baslik: '', aciklama: '', resim: null });
      alert("Referans başarıyla eklendi!");

    } catch (error: any) {
      alert("Hata oluştu: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const referansSil = async (id: number) => {
    if (!confirm('Bu referansı silmek istediğine emin misin?')) return;
    await supabase.from('referanslar').delete().eq('id', id);
    setReferanslar(referanslar.filter(r => r.id !== id));
  };

  // --- DUYURU İŞLEMLERİ ---
  const fetchDuyurular = async () => {
    const { data } = await supabase.from('duyurular').select('*').order('tarih', { ascending: false });
    setDuyurular(data || []);
  };

  const duyuruEkle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniDuyuru.baslik || !yeniDuyuru.icerik || !yeniDuyuru.tarih) {
      alert("Lütfen başlık, içerik ve tarih giriniz.");
      return;
    }
    setUploading(true);
    try {
      const { data, error } = await supabase
        .from('duyurular')
        .insert([{
          etiket: yeniDuyuru.etiket || 'DUYURU',
          baslik: yeniDuyuru.baslik,
          icerik: yeniDuyuru.icerik,
          tarih: yeniDuyuru.tarih
        }])
        .select();

      if (error) throw error;
      if (data) setDuyurular([data[0], ...duyurular]);
      setYeniDuyuru({ etiket: '', baslik: '', icerik: '', tarih: '' });
      alert("Duyuru başarıyla eklendi!");
    } catch (error: any) {
      alert("Hata oluştu: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const duyuruSil = async (id: number) => {
    if (!confirm('Duyuruyu silmek istediğine emin misin?')) return;
    await supabase.from('duyurular').delete().eq('id', id);
    setDuyurular(duyurular.filter(d => d.id !== id));
  };

  // --- GİRİŞ EKRANI ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
        >
          <div className="flex flex-col items-center mb-6">
            <Image src="/binayonetimi.jpeg" alt="Logo" width={80} height={80} className="mb-4 rounded-full" />
            <h1 className="text-2xl font-bold text-blue-900 text-center">Yönetici Girişi</h1>
          </div>
          <input
            type="password"
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Şifre"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-900 text-white p-3 rounded-lg font-bold hover:bg-blue-800 transition"
          >
            GİRİŞ YAP
          </motion.button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Üst Menü */}
      <nav className="bg-blue-900 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* LOGO BURAYA EKLENDİ */}
            <Image src="/binayonetimi.jpeg" alt="Logo" width={40} height={40} className="bg-white rounded-full p-1" />
            <h1 className="text-xl font-bold hidden md:block">Üçüzler Yönetim Paneli</h1>
          </div>
          <div className="flex gap-2 md:gap-4">
            <button
              onClick={() => setActiveTab('mesajlar')}
              className={`px-4 py-2 rounded-lg transition ${activeTab === 'mesajlar' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-800'}`}
            >
              Mesajlar
            </button>
            <button
              onClick={() => setActiveTab('referanslar')}
              className={`px-4 py-2 rounded-lg transition ${activeTab === 'referanslar' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-800'}`}
            >
              Referanslar
            </button>
            <button
              onClick={() => setActiveTab('duyurular')}
              className={`px-4 py-2 rounded-lg transition ${activeTab === 'duyurular' ? 'bg-blue-700 shadow-inner' : 'hover:bg-blue-800'}`}
            >
              Duyurular
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="text-red-300 hover:text-red-100 ml-2 md:ml-4 text-sm">Çıkış</button>
          </div>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto p-6"
      >
        {/* --- MESAJLAR --- */}
        {activeTab === 'mesajlar' && (
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Gelen Mesajlar ({mesajlar.length})</h2>
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold">
                  <tr>
                    <th className="p-4">Tarih</th>
                    <th className="p-4">Kişi Bilgileri</th>
                    <th className="p-4">Mesaj</th>
                    <th className="p-4">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <AnimatePresence>
                    {mesajlar.map((m) => (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        key={m.id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="p-4 text-sm text-gray-500">{new Date(m.created_at).toLocaleDateString('tr-TR')}</td>
                        <td className="p-4 font-medium">{m.ad_soyad}<br /><span className="text-xs text-blue-600">{m.telefon}</span></td>
                        <td className="p-4 text-gray-600 text-sm">{m.mesaj}</td>
                        <td className="p-4">
                          <button onClick={() => mesajSil(m.id)} className="text-red-500 hover:text-red-700 font-bold">Sil</button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- REFERANSLAR --- */}
        {activeTab === 'referanslar' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Referans Yönetimi</h2>

            <motion.div
              layout
              className="bg-white p-6 rounded-xl shadow-lg mb-8 border-t-4 border-green-500"
            >
              <h3 className="text-lg font-bold mb-4 text-blue-900">Yeni Bina Ekle</h3>
              <form onSubmit={referansEkle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Bina Adı (Örn: Yıldız Apt.)"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={yeniReferans.baslik}
                  onChange={e => setYeniReferans({ ...yeniReferans, baslik: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Konum (Örn: Melikgazi)"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={yeniReferans.aciklama}
                  onChange={e => setYeniReferans({ ...yeniReferans, aciklama: e.target.value })}
                />
                <div className="md:col-span-2 border-2 border-dashed p-4 rounded-lg bg-gray-50 flex flex-col items-center">
                  <input type="file" accept="image/*" onChange={handleDosyaSec} className="text-sm" required />
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={uploading}
                  className="md:col-span-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold disabled:opacity-50 shadow-md"
                >
                  {uploading ? 'Yükleniyor...' : 'KAYDET VE YAYINLA'}
                </motion.button>
              </form>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {referanslar.map((ref, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ delay: index * 0.05 }}
                    key={ref.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={ref.resim_url}
                        alt={ref.baslik}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-lg text-gray-800">{ref.baslik}</h4>
                      <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">📍 {ref.aciklama}</p>
                      <button
                        onClick={() => referansSil(ref.id)}
                        className="w-full bg-red-50 text-red-600 py-2 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition"
                      >
                        BU REFERANSI SİL
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* --- DUYURULAR --- */}
        {activeTab === 'duyurular' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Duyuru Yönetimi</h2>

            <motion.div
              layout
              className="bg-white p-6 rounded-xl shadow-lg mb-8 border-t-4 border-cyan-500"
            >
              <h3 className="text-lg font-bold mb-4 text-blue-900">Yeni Duyuru Ekle</h3>
              <form onSubmit={duyuruEkle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Başlık (Örn: Aidat Ödemeleri Hk.)"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={yeniDuyuru.baslik}
                  onChange={e => setYeniDuyuru({ ...yeniDuyuru, baslik: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Etiket (Örn: DUYURU)"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={yeniDuyuru.etiket}
                  onChange={e => setYeniDuyuru({ ...yeniDuyuru, etiket: e.target.value })}
                />
                <input
                  type="date"
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                  value={yeniDuyuru.tarih}
                  onChange={e => setYeniDuyuru({ ...yeniDuyuru, tarih: e.target.value })}
                  required
                />
                <div className="md:col-span-2">
                  <textarea
                    placeholder="Duyuru içeriği buraya..."
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
                    value={yeniDuyuru.icerik}
                    onChange={e => setYeniDuyuru({ ...yeniDuyuru, icerik: e.target.value })}
                    required
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={uploading}
                  className="md:col-span-2 bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 font-bold disabled:opacity-50 shadow-md"
                >
                  {uploading ? 'İşleniyor...' : 'DUYURUYU YAYINLA'}
                </motion.button>
              </form>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {duyurular.map((duyuru, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ delay: index * 0.05 }}
                    key={duyuru.id}
                    className="bg-white rounded-xl shadow-sm p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="bg-cyan-100 text-cyan-800 text-[10px] font-bold px-2 py-1 rounded">{duyuru.etiket || 'DUYURU'}</span>
                        <span className="text-gray-400 text-xs">{new Date(duyuru.tarih).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <h4 className="font-bold text-lg text-blue-900 mb-2">{duyuru.baslik}</h4>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-4">{duyuru.icerik}</p>
                    </div>
                    <button
                      onClick={() => duyuruSil(duyuru.id)}
                      className="w-full bg-red-50 text-red-600 py-2 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition"
                    >
                      SİL
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
