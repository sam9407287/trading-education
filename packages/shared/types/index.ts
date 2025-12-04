/**
 * 共享類型定義
 */

// 從 calculations.ts 重新導出類型
export type {
  BlackScholesParams,
  OptionPrices,
  Greeks,
  PayoffParams,
  StrategyLeg,
} from '../lib/options/calculations';

// 從 courses.ts 重新導出類型
export type { CourseCategory } from '../constants/courses';

// 通用類型
export type Theme = 'dark' | 'light';

export interface NavSection {
  id: string;
  label: string;
  labelEn?: string;
  children?: {
    id: string;
    label: string;
    labelEn?: string;
  }[];
}

