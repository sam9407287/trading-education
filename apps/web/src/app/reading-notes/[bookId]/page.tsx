import Link from 'next/link';
import { ArrowLeft, BookOpen, FileText, Calendar } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Chapter {
  id: string;
  title: string;
  filename: string;
  order: number;
}

interface PageProps {
  params: Promise<{
    bookId: string;
  }>;
}

async function getChapters(bookId: string): Promise<Chapter[]> {
  const contentPath = path.join(process.cwd(), 'src/content/reading-notes', bookId);
  
  try {
    const files = fs.readdirSync(contentPath)
      .filter(file => file.endsWith('.md'))
      .sort();
    
    const chapters = files.map((filename, index) => {
      const filePath = path.join(contentPath, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      const chapterId = filename.replace('.md', '');
      
      return {
        id: chapterId,
        title: data.title || chapterId,
        filename,
        order: data.order || index + 1,
      };
    });
    
    return chapters.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error reading chapters:', error);
    return [];
  }
}

export default async function BookPage({ params }: PageProps) {
  const { bookId } = await params;
  const decodedBookId = decodeURIComponent(bookId);
  const chapters = await getChapters(decodedBookId);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border-b border-[var(--border-color)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        
        <div className="relative max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/reading-notes" className="hover:text-[var(--accent-gold)]">學習筆記</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">{decodedBookId}</span>
          </nav>

          <Link
            href="/reading-notes"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回書籍列表
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-400 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">{decodedBookId}</h1>
              <p className="text-[var(--text-muted)]">共 {chapters.length} 個章節</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">章節列表</h2>
          <p className="text-[var(--text-secondary)]">點擊章節開始閱讀</p>
        </div>

        {chapters.length === 0 ? (
          <div className="text-center py-20 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl">
            <FileText className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">此書籍尚無章節</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {chapters.map((chapter, index) => (
              <Link
                key={chapter.id}
                href={`/reading-notes/${bookId}/${chapter.id}`}
                className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 hover:border-[var(--accent-gold)]/50 transition-all card-hover"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--accent-gold)] font-bold text-lg group-hover:bg-[var(--accent-gold)] group-hover:text-[var(--bg-primary)] transition-all flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors text-lg mb-1">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">{chapter.filename}</p>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-[var(--accent-gold)] rotate-180 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
          <Link
            href="/reading-notes"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回書籍列表</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
