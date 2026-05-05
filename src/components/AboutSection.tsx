'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// 关于我们板块组件
export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#0d0d1a] to-[#0a0a12]">
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* 内容区域 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#e8e9eb] mb-6">
              关于 ERAN DESIGN
            </h2>
            <p className="text-[#bdc0d6] mb-4">
              {`
              创立于 2010 年，ERAN DESIGN 是一家专注于空间叙事的专业设计公司。
              我们相信，每个空间都应该有自己的故事，而设计的使命就是讲述这些故事。
              `}
            </p>
            <p className="text-[#bdc0d6] mb-6">
              {`
              我们的团队由来自建筑、设计、科技、艺术等不同背景的创意专家组成。
              我们不仅关注美学，更重视空间的功能性、可持续性与品牌价值的转化。
              `}
            </p>

            {/* 核心服务数据 */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-lg bg-[#007bff] flex items-center justify-center">✓</span>
                <div>
                  <div className="font-bold text-[#e8e9eb]">15+</div>
                  <div className="text-sm text-[#bdc0d6]">设计团队资深专家</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-lg bg-[#007bff] flex items-center justify-center">✓</span>
                <div>
                  <div className="font-bold text-[#e8e9eb]">200+</div>
                  <div className="text-sm text-[#bdc0d6]">完成商业项目</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-lg bg-[#007bff] flex items-center justify-center">✓</span>
                <div>
                  <div className="font-bold text-[#e8e9eb]">98%</div>
                  <div className="text-sm text-[#bdc0d6]">客户满意度</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 视觉化团队展示 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* 团队网格 - 占位符 */}
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0d0d1a] p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007bff]/20 to-[#0d9488]/20 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="w-full h-48 rounded-lg bg-[#2d2d4e] mb-4 flex flex-col items-center justify-center">
                  <span className="text-[#bdc0d6] text-2xl">👥</span>
                  <span className="text-[#bdc0d6] text-sm mt-2">我们的团队</span>
                </div>
                
                {/* 团队成员简介 */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#1a1a2e] border border-[#3a3a4e]">
                    <h4 className="font-bold text-[#e8e9eb] mb-1">创始人 & 主设计师</h4>
                    <p className="text-sm text-[#bdc0d6]">15 年经验，主导 200+ 商业设计项目</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-[#1a1a2e] border border-[#3a3a4e]">
                    <h4 className="font-bold text-[#e8e9eb] mb-1">空间设计总监</h4>
                    <p className="text-sm text-[#bdc0d6]">专攻办公与商业空间规划</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}