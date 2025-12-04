import { TrendingUp, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[var(--bg-primary)]" />
              </div>
              <span className="text-lg font-bold text-gradient-gold">交易教育平台</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              專業的技術分析與期權知識教學，幫助你建立完整的交易知識體系。
            </p>
          </div>

          {/* 技術分析 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
              技術分析
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/technical-analysis/indicators" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
                  技術指標
                </Link>
              </li>
              <li>
                <Link href="/technical-analysis/theories" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
                  理論知識
                </Link>
              </li>
              <li>
                <Link href="/technical-analysis/patterns" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
                  形態分析
                </Link>
              </li>
              <li>
                <Link href="/technical-analysis/candlestick-patterns" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
                  K線型態
                </Link>
              </li>
            </ul>
          </div>

          {/* 期權教學 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
              期權教學
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/options/basics" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
                  期權基礎
                </Link>
              </li>
              <li>
                <Link href="/options/greeks" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
                  希臘字母
                </Link>
              </li>
              <li>
                <Link href="/options/strategies" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
                  期權策略
                </Link>
              </li>
              <li>
                <Link href="/options/iv-analysis" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors">
                  IV 分析
                </Link>
              </li>
            </ul>
          </div>

          {/* 社群連結 */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
              關注我們
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-[var(--bg-card)] flex items-center justify-center hover:bg-[var(--accent-gold)] hover:text-[var(--bg-primary)] transition-all text-[var(--text-muted)]"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-[var(--bg-card)] flex items-center justify-center hover:bg-[var(--accent-gold)] hover:text-[var(--bg-primary)] transition-all text-[var(--text-muted)]"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
          <p className="text-center text-sm text-[var(--text-muted)]">
            © 2024 交易教育平台. 僅供教育目的，非投資建議。
          </p>
        </div>
      </div>
    </footer>
  );
}

