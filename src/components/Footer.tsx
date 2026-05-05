'use client';

import Link from 'next/link';

// 页脚组件
export default function Footer() {
  return (
    <footer className="bg-[#0a0a12] border-t border-[#3a3a4e]/50 pt-16 pb-8">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-4">
          {/* 品牌信息 */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#007bff] to-[#0d9488] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#e8e9eb]">ERAN DESIGN</h3>
                <p className="text-sm text-[#bdc0d6]">用空间叙事</p>
              </div>
            </Link>

            <p className="text-[#bdc0d6] mb-6 max-w-sm">
              用空间叙事，链接商业与未来。我们专注于为科技初创企业、SME 和高端制造企业打造令人难忘的空间体验。
            </p>

            <div className="flex space-x-4">
              {/* 社交媒体链接占位符 */}
              <a href="#" className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center text-[#bdc0d6] hover:text-[#007bff] transition-colors">
                📷
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center text-[#bdc0d6] hover:text-[#007bff] transition-colors">
                🐦
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center text-[#bdc0d6] hover:text-[#007bff] transition-colors">
                💼
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="font-bold text-[#e8e9eb] mb-4">快速链接</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#services" className="text-[#bdc0d6] hover:text-[#007bff] transition-colors">
                  我们的服务
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-[#bdc0d6] hover:text-[#007bff] transition-colors">
                  精选案例
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-[#bdc0d6] hover:text-[#007bff] transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-[#bdc0d6] hover:text-[#007bff] transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h4 className="font-bold text-[#e8e9eb] mb-4">联系方式</h4>
            <ul className="space-y-3 text-[#bdc0d6]">
              <li>📧 hello@erandesign.com</li>
              <li>📱 +86 138-xxxx-xxxx</li>
              <li>🏢 上海市静安区南京西路 1266 号</li>
            </ul>

            <div className="mt-6">
              <h4 className="font-bold text-[#e8e9eb] mb-2">办公时间</h4>
              <p className="text-sm text-[#bdc0d6]">周一至周五 9:00-18:00</p>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="border-t border-[#3a3a4e]/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#6d6d8e] text-sm">
            © {new Date().getFullYear()} ERAN DESIGN. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-[#6d6d8e] hover:text-[#bdc0d6] text-sm transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-[#6d6d8e] hover:text-[#bdc0d6] text-sm transition-colors">
              服务条款
            </a>
            <a href="#" className="text-[#6d6d8e] hover:text-[#bdc0d6] text-sm transition-colors">
              Cookie 设置
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}