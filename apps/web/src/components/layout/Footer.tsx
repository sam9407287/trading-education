import { TrendingUp, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg gradient-gold flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--bg-primary)]" />
            </div>
            <span className="text-base sm:text-lg font-bold text-gradient-gold">交易教育平台</span>
          </div>

          {/* Contact */}
          <a
            href="https://www.instagram.com/sam9407287_stock/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-card)] hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all text-[var(--text-muted)] hover:text-white group"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm font-medium">@sam9407287_stock</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
          <p className="text-center text-xs sm:text-sm text-[var(--text-muted)]">
            © 2025 交易教育平台. 僅供教育目的，非投資建議。
          </p>
        </div>
      </div>
    </footer>
  );
}
