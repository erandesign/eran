'use client';

import { motion } from 'framer-motion';

// 服务板块组件
export default function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section id="services" className="py-24 bg-[#0d0d1a]">
      <div className="container">
        {/* 板块标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#e8e9eb] mb-4">
            我们的服务
          </h2>
          <p className="text-[#bdc0d6] max-w-2xl mx-auto">
            我们提供全方位的设计解决方案，从概念到落地，打造令人难忘的空间体验
          </p>
        </motion.div>

        {/* 服务卡片网格 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          transition={containerVariants}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* 服务 1 */}
          <ServiceCard
            icon={
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 3h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h2.5L12 6.35L13 7l5-4z" />
              </svg>
            }
            title="空间设计"
            description="定制化的办公空间与商业空间设计，融合美学与功能性，打造提升工作效率与员工体验的理想工作场所。"
          />

          {/* 服务 2 */}
          <ServiceCard
            icon={
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            }
            title="SI 系统设计"
            description="模块化空间系统解决方案，包括灯光系统、多媒体系统、智能控制等，实现空间智能化与数字化升级。"
          />

          {/* 服务 3 */}
          <ServiceCard
            icon={
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title="品牌形象空间化"
            description="将品牌理念转化为空间语言，通过材质、色彩、光影等设计元素，让空间成为最佳的品牌传播媒介。"
          />

          {/* 服务 4 */}
          <ServiceCard
            icon={
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            }
            title="可持续设计"
            description="采用环保材料与工艺，减少碳足迹，打造绿色、可持续的商业空间，回馈社会与环境责任。"
          />

          {/* 服务 5 */}
          <ServiceCard
            icon={
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.894 10.23 9.605 12.027a11.955 11.955 0 012.393 2.892M10 22c-4.9 0-12-1-12-3V9c0-3 9-4 12-2 3 2 4 8 0 12z" />
              </svg>
            }
            title="项目管理"
            description="从概念到落地的全程项目管理，确保设计方案的精准执行，把控成本、质量与进度，按时交付。"
          />

          {/* 服务 6 */}
          <ServiceCard
            icon={
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            }
            title="数字化空间"
            description="结合 AR/VR 技术，打造数字化、智能化的空间体验。通过互动、感应、多媒体技术增强空间趣味性。"
          />
        </motion.div>
      </div>
    </section>
  );
}