'use client';

import { motion, AnimatePresence } from 'framer-motion';

// 服务板块卡片组件
interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

export default function ServiceCard({ title, description, icon, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card p-8 h-full"
    >
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#007bff] to-[#0d9488] flex items-center justify-center mb-6">
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold text-[#e8e9eb] mb-4">
        {title}
      </h3>
      
      <p className="text-[#bdc0d6] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}