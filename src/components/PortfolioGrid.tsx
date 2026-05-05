'use client';

// 作品集展示组件
export default function PortfolioGrid() {
  return (
    <section id="portfolio" className="py-24 bg-[#0d0d1a]">
      <div className="container">
        {/* 板块标题 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#e8e9eb] mb-4">
            精选案例
          </h2>
          <p className="text-[#bdc0d6] max-w-2xl mx-auto">
            我们的优秀设计作品，见证空间叙事的力量
          </p>
        </div>

        {/* 作品卡片 - 占位符 */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* 作品卡片 1 */}
          <div className="card overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-[#1a1a2e] mb-4 relative overflow-hidden group">
              {/* 图片占位符 - 实际项目中替换为真实图片 */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#2d2d4e] to-[#1a1a2e] flex items-center justify-center">
                <span className="text-[#bdc0d6] text-sm">科技展厅案例</span>
              </div>
              
              {/* 悬停遮罩 */}
              <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-[#e8e9eb] font-medium">查看详情 →</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#e8e9eb] mb-2">科技展厅设计</h3>
            <p className="text-[#bdc0d6] text-sm">某科技初创企业总部展厅，融合数字化技术，打造沉浸式体验空间。</p>
          </div>

          {/* 作品卡片 2 */}
          <div className="card overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-b from-[#2d2d4e] to-[#1a1a2e] mb-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#2d2d4e] to-[#1a1a2e] flex items-center justify-center">
                <span className="text-[#bdc0d6] text-sm">办公空间设计</span>
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-[#e8e9eb] font-medium">查看详情 →</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#e8e9eb] mb-2">创意办公空间</h3>
            <p className="text-[#bdc0d6] text-sm">为中型设计公司提供开放、协作的办公环境，激发团队创新活力。</p>
          </div>

          {/* 作品卡片 3 */}
          <div className="card overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-b from-[#2d2d4e] to-[#1a1a2e] mb-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#2d2d4e] to-[#1a1a2e] flex items-center justify-center">
                <span className="text-[#bdc0d6] text-sm">SI 系统设计</span>
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-[#e8e9eb] font-medium">查看详情 →</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#e8e9eb] mb-2">智能 SI 系统</h3>
            <p className="text-[#bdc0d6] text-sm">为企业打造模块化、可扩展的空间系统，集成智能控制与节能技术。</p>
          </div>
        </div>
      </div>
    </section>
  );
}