'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Hero 展示区域组件
export default function HeroBanner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 背景动画 */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="circleGradient">
              <stop offset="0%" stopColor="#007bff" />
              <stop offset="100%" stopColor="#007bff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50%" cy="50%" r="40%" fill="url(#circleGradient)" />
        </svg>
      </motion.div>

      {/* 主标题 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container z-10 text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#e8e9eb] to-[#bdc0d6]"
        >
          用空间叙事 <br />
          <span className="text-[#007bff]">链接商业与未来</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-[#bdc0d6] mb-8 max-w-3xl mx-auto px-4"
        >
          专业空间设计、SI 系统、办公室设计服务
          <br />
          服务科技初创企业、SME 和高端制造企业
        </motion.p>

        {/* CTA 按钮 */}
        <motion.div
          variants={itemVariants}
          className="space-y-4 flex flex-col sm:flex-row justify-center max-w-xl mx-auto"
        >
          <Link href="/portfolio" className="btn-primary">
            探索案例
          </Link>
          <Link href="/contact" className="btn-secondary">
            预约咨询
          </Link>
        </motion.div>

        {/* 信任徽章 */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center justify-center space-x-6 text-sm text-[#bdc0d6]"
        >
          <span>✓ 10 年+设计经验</span>
          <span>✓ 1000+完成项目</span>
          <span>✓ 客户满意率 98%</span>
        </motion.div>
      </motion.div>
    </section>
  );
}