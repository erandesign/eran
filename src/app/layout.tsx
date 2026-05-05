import type { Metadata } from 'next';
import { Inter_Tight, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// 中文字体与英文字体结合
const displayFont = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin', 'cjk'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ERAN DESIGN - 用空间叙事，链接商业与未来',
  description: '专业空间设计、SI 系统设计、办公室设计服务。服务科技初创企业、SME 和高端制造企业。',
  keywords: ['空间设计', 'SI 系统', '办公室设计', '企业总部', '商业空间', '建筑设计'],
  authors: [{ name: 'ERAN DESIGN Team' }],
  openGraph: {
    title: 'ERAN DESIGN - 用空间叙事，链接商业与未来',
    description: '专业空间设计、SI 系统设计、办公室设计服务，为科技初创企业提供定制化设计解决方案。',
    type: 'website',
    url: 'https://erandesign.com',
    locale: 'zh_Hans_CN',
    siteName: 'ERAN DESIGN',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} font-body antialiased bg-[#0d0d1a] text-[#e8e9eb]`}
      >
        {children}
      </body>
    </html>
  );
}