# ERAN DESIGN - 空间叙事设计系统

> 用空间叙事，链接商业与未来。
> 
> 专业空间设计、SI 系统设计、办公室设计解决方案
> 服务科技初创企业、SME 和高端制造企业

## 📁 项目结构

```
eran-design/
├── src/
│   ├── app/                      # Next.js 应用目录
│   │   ├── globals.css           # 全局样式
│   │   ├── layout.tsx            # 根布局组件
│   │   └── page.tsx              # 主页展示
│   └── components/               # 可复用组件
│       ├── Navbar.tsx            # 导航栏
│       ├── HeroBanner.tsx        # Hero 展示区域
│       ├── ServicesSection.tsx   # 服务板块
│       ├── PortfolioGrid.tsx     # 作品集展示
│       ├── AboutSection.tsx      # 关于我们
│       ├── ContactForm.tsx       # 联系表单
│       └── Footer.tsx            # 页脚
├── public/                       # 静态资源
├── tailwind.config.ts            # Tailwind 配置
├── package.json
├── tsconfig.json
├── postcss.config.js
└── README.md
```

## 🎨 核心设计规范

### 品牌色彩系统

| 名称 | HEX 值 | 用途 |
|------|-------|------|
| Space Deep | `#0d0d1a` | 主背景色 |
| Space Navy | `#1a1a2e` | 次级背景 |
| Titanium | `#3a3a4e` | 卡片/容器背景 |
| Silver | `#e8e9eb` | 主文本色 |
| Electric Blue | `#007bff` | CTA 按钮/强调 |
| Deep Teal | `#0d9488` | 辅助强调色 |

### 排版规范

```
h1    48-72px  32-40px baseline  800-700 weight
h2    36-56px  24-28px baseline  600-700 weight
h3    28-36px  20-24px baseline  500-600 weight
Body  16-18px  24-28px line-height  400 weight
```

### 设计原则

1. **空间层次** - 使用深色渐变营造空间深度感
2. **叙事驱动** - 每个板块都有明确的视觉动线和信息层次
3. **功能优先** - 美观与功能性平衡，避免过度设计
4. **可持续性** - 强调环保材料和可持续设计理念

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
npm run start
```

## 📝 自定义配置

### 修改颜色主题

编辑 `tailwind.config.ts`中的`colors.brand` 配置:

```typescript
colors: {
  brand: {
    deep: '#0d0d1a',      // 修改主背景色
    navy: '#1a1a2e',      // 修改次级背景
    titanium: '#3a3a4e',  // 修改容器背景
    silver: '#e8e9eb',    // 修改主文本
    electricBlue: '#007bff', // 修改强调色
    // ...
  }
}
```

### 添加新组件

在`src/components/`目录下创建新组件，并在`globals.css` 中通过`@layer components`添加组件样式:

```css
@layer components {
  .btn-primary {
    @apply bg-[var(--color-electric-blue)] 
           px-8 py-4 rounded-lg 
           transition-all duration-300;
  }
}
```

## 🎯 部署指南

### 环境要求

- Node.js 18+
- npm 或 yarn
- 现代 Web 浏览器

### 生产部署

```bash
# 构建
npm run build

# 静态生成
next export

# 上传至服务器
# 使用 Vercel, Netlify 或自建服务器
```

### 环境变量

创建`.env.local`文件配置环境变量:

```env
NEXT_PUBLIC_APP_URL=https://erandesign.com
```

## 🛠 技术栈

- **框架**: Next.js 14 (App Router)
- **CSS**: Tailwind CSS 3.4
- **动画**: Framer Motion
- **类型**: TypeScript
- **图标**: Heroicons

## 📦 依赖管理

查看`package.json`获取完整依赖列表:

```json
{
  "dependencies": {
    "next": "14.1.4",
    "@heroicons/react": "^2.1.1",
    "framer-motion": "^10.18.0",
    // ...
  }
}
```

## 🔧 优化建议

### 性能优化

1. **图片优化** - 使用 Next/Image 或 unpic 进行图片压缩
2. **代码分割** - 动态导入大型组件
3. **字体优化** - 使用 next/font 进行字体自托管
4. **缓存策略** - 配置适当的 CDN 缓存

### SEO 优化

```typescript
export const metadata = {
  description: '你的网站描述',
  keywords: ['关键词1', '关键词2'],
  openGraph: {
    title: 'Open Graph Title',
    images: ['/og-image.jpg'],
  }
}
```

## ✍ 贡献指南

欢迎贡献代码!请遵循以下步骤:

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📄 开源协议

MIT License - 可商用

## 📧 联系支持

- 邮件: hello@erandesign.com
- 电话: +86 138-xxxx-xxxx
- 地址: 上海市静安区南京西路 1266 号

## 🌟 致谢

特别感谢开源社区提供的优秀工具和库。

---

<div align="center">
  <img src="/og-image.png" alt="Open Graph" width="200" />
  <p class="mt-4">用空间叙事，链接商业与未来</p>
</div>