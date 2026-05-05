// ERAN DESIGN - Brand Configuration
export const brand = {
  name: "ERAN DESIGN",
  tagline: "用空间叙事，链接商业与未来",
  
  // 品牌定位
  positioning: {
    usp1: "叙事性空间设计",
    usp2: "模块化 SI 系统",
    usp3: "可进化的品牌表达",
  },
  
  // 目标市场
  target: {
    primary: ["科技初创企业", "中型企业(SME)", "高端制造企业"],
    secondary: ["教育机构", "文化传媒", "零售品牌"],
  },
  
  // 核心价值
  values: ["创新", "专业", "人性化", "可持续"],
};

// 品牌颜色系统
export const colors = {
  primary: {
    spaceDeep: "#0d0d1a",
    spaceNavy: "#1a1a2e",
    titanium: "#3a3a4e",
    silver: "#e8e9eb",
  },
  secondary: {
    electricBlue: "#007bff",
    deepTeal: "#0d9488",
    warmCoral: "#fb923c",
    purpleAccent: "#6366f1",
  },
  neutral: {
    black: "#0a0a12",
    space: "#1a1a2e",
    darkGray: "#2d2d4e",
    industrialGray: "#3a3a4e",
    mediumGray: "#4d4d6e",
    lightGray: "#6d6d8e",
    silverGray: "#8d8dab",
    brightGray: "#bdc0d6",
    platinum: "#e8e9eb",
    white: "#ffffff",
  },
};

// 字体系统
export const typography = {
  display: {
    h1: {
      font: "Inter Tight",
      fontSize: "64px",
      lineHeight: "72px",
      fontWeight: "800",
    },
    h2: {
      font: "Inter Tight",
      fontSize: "48px",
      lineHeight: "56px",
      fontWeight: "700",
    },
    h3: {
      font: "Space Grotesk",
      fontSize: "36px",
      lineHeight: "48px",
      fontWeight: "600",
    },
    h4: {
      font: "Inter Tight",
      fontSize: "28px",
      lineHeight: "40px",
      fontWeight: "600",
    },
  },
  body: {
    main: {
      font: "Inter",
      fontSize: "16px",
      lineHeight: "24px",
    },
    chinese: {
      font: "Noto Sans SC",
      fontSize: "16px",
      lineHeight: "24px",
    },
  },
};

// CSS Variables
export const cssVariables = `
:root {
  /* Primary Colors */
  --space-deep: ${colors.primary.spaceDeep};
  --space-navy: ${colors.primary.spaceNavy};
  --titanium: ${colors.primary.titanium};
  --silver: ${colors.primary.silver};
  
  /* Secondary Colors */
  --electric-blue: ${colors.secondary.electricBlue};
  --deep-teal: ${colors.secondary.deepTeal};
  --warm-coral: ${colors.secondary.warmCoral};
  --purple-accent: ${colors.secondary.purpleAccent};
  
  /* Neutral Colors */
  --black: ${colors.neutral.black};
  --space: ${colors.neutral.space};
  --dark-gray: ${colors.neutral.darkGray};
  --industrial-gray: ${colors.neutral.industrialGray};
  --medium-gray: ${colors.neutral.mediumGray};
  --light-gray: ${colors.neutral.lightGray};
  --silver-gray: ${colors.neutral.silverGray};
  --bright-gray: ${colors.neutral.brightGray};
  --platinum: ${colors.neutral.platinum};
  --white: ${colors.neutral.white};
}

/* Dark Mode (Default for Design Agency) */
@media (prefers-color-scheme: dark) {
  .dark {
    --body-bg: var(--space-deep);
    --card-bg: var(--titanium);
    --text-base: var(--platinum);
    --text-muted: var(--silver-gray);
  }
}
`;