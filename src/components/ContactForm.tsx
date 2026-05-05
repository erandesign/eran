'use client';

// 联系表单组件
export default function ContactForm() {
  return (
    <section id="contact" className="py-24 bg-[#0d0d1a]">
      <div className="container">
        <div className="max-w-xl mx-auto bg-[#1a1a2e] rounded-2xl p-8 md:p-12 shadow-brand-lg">
          <h2 className="text-3xl font-bold text-[#e8e9eb] mb-8 text-center">
            联系我们
          </h2>

          <form className="space-y-6">
            {/* 姓名 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#bdc0d6] mb-2">
                姓名
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input w-full"
                placeholder="请输入您的姓名"
              />
            </div>

            {/* 邮箱 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#bdc0d6] mb-2">
                电子邮箱
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input w-full"
                placeholder="name@company.com"
              />
            </div>

            {/* 联系电话 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#bdc0d6] mb-2">
                联系电话
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="input w-full"
                placeholder="138-xxxx-xxxx"
              />
            </div>

            {/* 项目类型 */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-[#bdc0d6] mb-2">
                项目类型
              </label>
              <select
                id="type"
                name="type"
                className="input w-full"
              >
                <option value="" disabled>请选择项目类型</option>
                <option value="space-design">空间设计</option>
                <option value="si-system">SI 系统设计</option>
                <option value="brand-space">品牌空间化</option>
                <option value="sustainable">可持续设计</option>
                <option value="other">其他</option>
              </select>
            </div>

            {/* 公司名称 */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-[#bdc0d6] mb-2">
                公司名称
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="input w-full"
                placeholder="贵公司名称"
              />
            </div>

            {/* 项目需求描述 */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#bdc0d6] mb-2">
                项目需求描述
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="input w-full resize-none"
                placeholder="请描述您的需求、预算范围、项目时间表等..."
              ></textarea>
            </div>

            {/* 提交按钮 */}
            <button type="submit" className="btn-primary w-full py-4">
              提交咨询
            </button>

            {/* 隐私提示 */}
            <p className="text-xs text-center text-[#6d6d8e]">
              您的信息将被严格保密，仅用于项目咨询
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}