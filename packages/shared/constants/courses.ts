/**
 * 課程配置數據
 * 在 Web 和 Mobile 端共享使用
 */

export interface CourseCategory {
  title: string;
  titleEn: string;
  href: string;
  iconName: string; // 使用字符串名稱，各端自行映射到對應的圖標組件
  description: string;
}

// 技術分析子分類
export const technicalSubCategories: CourseCategory[] = [
  {
    title: '技術指標',
    titleEn: 'Indicators',
    href: '/technical-analysis/indicators',
    iconName: 'LineChart',
    description: '均線、KDJ、RSI、布林帶、ATR 等',
  },
  {
    title: '圖表判讀',
    titleEn: 'Chart Reading',
    href: '/technical-analysis/chart-reading',
    iconName: 'CandlestickChart',
    description: 'K線圖、點數圖、範圍線、Y軸類型',
  },
  {
    title: '理論知識',
    titleEn: 'Theories',
    href: '/technical-analysis/theories',
    iconName: 'BrainCircuit',
    description: '道氏理論、艾略特波浪、威科夫、江恩',
  },
  {
    title: '週期分析',
    titleEn: 'Cycle Analysis',
    href: '/technical-analysis/cycle-analysis',
    iconName: 'Waves',
    description: '循環分析、頻譜圖、序列分析',
  },
  {
    title: '形態分析',
    titleEn: 'Pattern Analysis',
    href: '/technical-analysis/patterns',
    iconName: 'Target',
    description: '反轉型態、持續型態、諧波型態',
  },
  {
    title: 'K線型態',
    titleEn: 'Candlestick Patterns',
    href: '/technical-analysis/candlestick-patterns',
    iconName: 'BarChart3',
    description: 'K線基礎、單根K線、組合型態',
  },
  {
    title: '行為金融學',
    titleEn: 'Behavioral Finance',
    href: '/technical-analysis/behavioral-finance',
    iconName: 'Activity',
    description: '認知偏誤、市場情緒、群體行為',
  },
];

// 期權子分類
export const optionsSubCategories: CourseCategory[] = [
  {
    title: '期權基礎',
    titleEn: 'Options Basics',
    href: '/options/basics',
    iconName: 'BookOpen',
    description: '認識期權的基本概念與運作原理',
  },
  {
    title: '希臘字母',
    titleEn: 'The Greeks',
    href: '/options/greeks',
    iconName: 'Calculator',
    description: 'Delta、Gamma、Theta、Vega、Rho',
  },
  {
    title: '期權策略',
    titleEn: 'Strategies',
    href: '/options/strategies',
    iconName: 'Layers',
    description: '從基礎到進階的完整策略庫',
  },
  {
    title: 'IV 分析',
    titleEn: 'IV Analysis',
    href: '/options/iv-analysis',
    iconName: 'BarChart3',
    description: '隱含波動率的應用與時機判斷',
  },
];

