import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import ServicesSection from '@/components/ServicesSection';
import PortfolioGrid from '@/components/PortfolioGrid';
import AboutSection from '@/components/AboutSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

// 主页展示页面
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 导航栏 */}
      <Navbar />

      {/* Hero 展示区域 */}
      <HeroBanner />

      {/* 服务板块 */}
      <ServicesSection />

      {/* 作品集展示 */}
      <PortfolioGrid />

      {/* 关于我们 */}
      <AboutSection />

      {/* 联系表单 */}
      <ContactForm />

      {/* 页脚 */}
      <Footer />

      {/* 滚动到顶部按钮 */}
      <a
        href="#"
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#007bff] rounded-full flex items-center justify-center shadow-lg z-40 opacity-0 hover:opacity-100 transition-opacity hidden group"
        aria-label="返回顶部"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </a>
    </main>
  );
}