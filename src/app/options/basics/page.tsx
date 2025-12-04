import Link from 'next/link';
import { ArrowLeft, BookOpen, Construction } from 'lucide-react';

export default function OptionsBasicsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-x-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/options" className="hover:text-[var(--accent-gold)]">期權教學</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">期權基礎</span>
          </nav>

          <Link
            href="/options"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回期權教學
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">期權基礎</h1>
              <p className="text-[var(--text-muted)]">Options Basics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Under Development */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-[var(--accent-gold)]/10 flex items-center justify-center mb-6">
            <Construction className="w-12 h-12 text-[var(--accent-gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">內容開發中</h2>
          <p className="text-[var(--text-secondary)] max-w-md">
            此頁面內容正在精心製作中，敬請期待！
          </p>
        </div>
      </section>
    </div>
  );
}
