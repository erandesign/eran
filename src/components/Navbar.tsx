'use client';
 
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// 导航组件
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d1a]/90 backdrop-blur-md border-b border-[#3a3a4e]/50">
      <nav className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#007bff] to-[#0d9488] rounded-lg flex items-center justify-center shadow-brand">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#e8e9eb]">ERAN DESIGN</h1>
            <p className="text-xs text-[#bdc0d6]">用空间叙事</p>
          </div>
        </Link>

        {/* 导航链接 */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/#services" className="text-[#e8e9eb] hover:text-[#007bff] transition-colors font-medium">
            服务
          </Link>
          <Link href="/#portfolio" className="text-[#e8e9eb] hover:text-[#007bff] transition-colors font-medium">
            作品
          </Link>
          <Link href="/#about" className="text-[#e8e9eb] hover:text-[#007bff] transition-colors font-medium">
            我们
          </Link>
          <Link href="/#contact" className="text-[#e8e9eb] hover:text-[#007bff] transition-colors font-medium">
            联系
          </Link>
        </div>

        {/* CTA 按钮 */}
        <Link href="/contact" className="btn-secondary">
          预约咨询
        </Link>

        {/* 移动端菜单按钮 */}
        <button className="md:hidden text-[#e8e9eb] text-2xl">
          ☰
        </button>
      </nav>
    </header>
  );
}