'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
  labelEn?: string;
  children?: { id: string; label: string; labelEn?: string }[];
}

interface AnchorNavProps {
  sections: Section[];
}

export default function AnchorNav({ sections }: AnchorNavProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    // 觀察所有 section
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
      
      // 觀察子項目
      section.children?.forEach((child) => {
        const childElement = document.getElementById(child.id);
        if (childElement) observer.observe(childElement);
      });
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Header 高度補償
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-24 w-64 max-h-[calc(100vh-120px)] overflow-y-auto pr-4 hidden lg:block">
      <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
        目錄
      </div>
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => handleClick(section.id)}
              className={`anchor-nav-item w-full text-left py-2 text-sm transition-colors
                ${activeId === section.id 
                  ? 'active text-[var(--accent-gold)]' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              <div className="flex flex-col">
                <span>{section.label}</span>
                {section.labelEn && (
                  <span className="text-xs opacity-70 mt-0.5">{section.labelEn}</span>
                )}
              </div>
            </button>
            
            {/* 子項目 */}
            {section.children && (
              <ul className="ml-4 mt-1 space-y-1">
                {section.children.map((child) => (
                  <li key={child.id}>
                    <button
                      onClick={() => handleClick(child.id)}
                      className={`anchor-nav-item w-full text-left py-1.5 text-xs transition-colors
                        ${activeId === child.id 
                          ? 'active text-[var(--accent-gold)]' 
                          : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                        }`}
                    >
                      <div className="flex flex-col">
                        <span>{child.label}</span>
                        {child.labelEn && (
                          <span className="text-[10px] opacity-70 mt-0.5">{child.labelEn}</span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}


