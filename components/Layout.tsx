"use client";

import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslations } from "next-intl";

const WhatsAppButton = () => {
  const t = useTranslations("header");
  return (
    <motion.a
      href="https://wa.me/905538873616"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center border-2 border-white"
    >
      <FaWhatsapp size={32} />
      {/* Mobilde sadece ikon görünür, geniş ekranda yazı eklenebilir */}
      <span className="hidden md:inline ml-2 font-bold">{t("contactUs")}</span>
    </motion.a>
  );
};

export default WhatsAppButton;