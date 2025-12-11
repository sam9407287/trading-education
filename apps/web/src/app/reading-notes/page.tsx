import Link from 'next/link';
import { ArrowLeft, BookOpen, FileText, Clock } from 'lucide-react';
import fs from 'fs';
import path from 'path';

interface BookInfo {
  id: string;
  title: string;
  chapterCount: number;
}

function getBooks(): BookInfo[] {
  const contentPath = path.join(process.cwd(), 'src/content/reading-notes');
  
  try {
    const books = fs.readdirSync(contentPath)
      .filter(item => {
        const fullPath = path.join(contentPath, item);
        return fs.statSync(fullPath).isDirectory() && !item.startsWith('.');
      })
      .map(bookId => {
        const bookPath = path.join(contentPath, bookId);
        const chapters = fs.readdirSync(bookPath)
          .filter(file => file.endsWith('.md'));
        
        return {
          id: bookId,
          title: bookId,
          chapterCount: chapters.length,
        };
      });
    
    return books;
  } catch (error) {
    console.error('Error reading books:', error);
    return [];
  }
}

export default function ReadingNotesPage() {
  const books = getBooks();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border-b border-[var(--border-color)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        
        <div className="relative max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">學習筆記</span>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首頁
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-400 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">學習筆記</h1>
              <p className="text-[var(--text-muted)]">Reading Notes</p>
            </div>
          </div>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            整理交易相關書籍的學習筆記，記錄重要概念、實戰案例與心得感想。
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {books.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">尚無學習筆記，開始記錄你的第一本書吧！</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/reading-notes/${encodeURIComponent(book.id)}`}
                className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 hover:border-[var(--accent-gold)]/50 transition-all card-hover"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent-gold)] group-hover:bg-[var(--accent-gold)] group-hover:text-[var(--bg-primary)] transition-all flex-shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors text-lg mb-2">
                      {book.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{book.chapterCount} 章節</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
                  <span className="text-sm text-[var(--text-muted)]">點擊查看章節</span>
                  <ArrowLeft className="w-4 h-4 text-[var(--accent-gold)] rotate-180" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
