'use client';

interface TermProps {
  cn: string;
  en: string;
  highlight?: boolean;
}

/**
 * 專有名詞組件 - 顯示中文名稱與英文對照
 * 
 * @example
 * <Term cn="布林帶" en="Bollinger Bands" />
 * <Term cn="看漲期權" en="Call Option" highlight />
 */
export default function Term({ cn, en, highlight = false }: TermProps) {
  return (
    <span className={`inline-flex items-center gap-1 ${highlight ? 'text-[var(--accent-gold)]' : ''}`}>
      <span className="font-medium">{cn}</span>
      <span className="text-[var(--text-muted)] text-sm">({en})</span>
    </span>
  );
}


