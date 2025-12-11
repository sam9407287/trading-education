import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, Clock } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PageProps {
  params: Promise<{
    bookId: string;
    chapterId: string;
  }>;
}

interface ChapterData {
  content: string;
  title: string;
  date?: string;
  tags?: string[];
}

async function getChapterContent(bookId: string, chapterId: string): Promise<ChapterData | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      'src/content/reading-notes',
      bookId,
      `${chapterId}.md`
    );
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    return {
      content,
      title: data.title || chapterId,
      date: data.date,
      tags: data.tags,
    };
  } catch (error) {
    console.error('Error reading chapter:', error);
    return null;
  }
}

async function getAllChapters(bookId: string) {
  try {
    const contentPath = path.join(process.cwd(), 'src/content/reading-notes', bookId);
    const files = fs.readdirSync(contentPath)
      .filter(file => file.endsWith('.md'))
      .sort();
    
    return files.map(file => file.replace('.md', ''));
  } catch (error) {
    return [];
  }
}

export default async function ChapterPage({ params }: PageProps) {
  const { bookId, chapterId } = await params;
  const decodedBookId = decodeURIComponent(bookId);
  const decodedChapterId = decodeURIComponent(chapterId);
  
  const chapterData = await getChapterContent(decodedBookId, decodedChapterId);
  const allChapters = await getAllChapters(decodedBookId);
  
  const currentIndex = allChapters.indexOf(decodedChapterId);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  if (!chapterData) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">章節不存在</h1>
          <Link
            href={`/reading-notes/${bookId}`}
            className="text-[var(--accent-gold)] hover:underline"
          >
            返回章節列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border-b border-[var(--border-color)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        
        <div className="relative max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6 flex-wrap">
            <Link href="/" className="hover:text-[var(--accent-gold)]">首頁</Link>
            <span>/</span>
            <Link href="/reading-notes" className="hover:text-[var(--accent-gold)]">學習筆記</Link>
            <span>/</span>
            <Link href={`/reading-notes/${bookId}`} className="hover:text-[var(--accent-gold)]">
              {decodedBookId}
            </Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">{chapterData.title}</span>
          </nav>

          <Link
            href={`/reading-notes/${bookId}`}
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回章節列表
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-400 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">{chapterData.title}</h1>
              <p className="text-[var(--text-muted)]">{decodedBookId}</p>
            </div>
          </div>

          {(chapterData.date || chapterData.tags) && (
            <div className="flex flex-wrap gap-4 mt-4">
              {chapterData.date && (
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <Calendar className="w-4 h-4" />
                  <span>{chapterData.date}</span>
                </div>
              )}
              {chapterData.tags && chapterData.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  {chapterData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-invert max-w-none">
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-8 mb-4 pb-2 border-b border-[var(--border-color)]">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mt-6 mb-3">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-lg font-semibold text-[var(--text-primary)] mt-4 mb-2">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-[var(--text-secondary)]">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-[var(--text-secondary)]">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="ml-4">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[var(--accent-gold)] pl-4 py-2 my-4 bg-[var(--bg-secondary)] rounded-r-lg">
                    {children}
                  </blockquote>
                ),
                code: ({ className, children }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-[var(--accent-gold)] text-sm">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={className}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-[var(--bg-secondary)] p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-[var(--text-primary)]">
                    {children}
                  </strong>
                ),
                hr: () => (
                  <hr className="border-[var(--border-color)] my-8" />
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-[var(--accent-gold)] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {chapterData.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevChapter ? (
              <Link
                href={`/reading-notes/${bookId}/${encodeURIComponent(prevChapter)}`}
                className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>上一章</span>
              </Link>
            ) : (
              <div></div>
            )}

            <Link
              href={`/reading-notes/${bookId}`}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors"
            >
              返回章節列表
            </Link>

            {nextChapter ? (
              <Link
                href={`/reading-notes/${bookId}/${encodeURIComponent(nextChapter)}`}
                className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors"
              >
                <span>下一章</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
