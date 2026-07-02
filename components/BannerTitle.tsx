'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ArticleMeta {
  title: string;
  date: string;
  tags: string[];
}

const pageTitles: Record<string, { title: string; desc: string }> = {
  '/projects': {
    title: 'Projects',
    desc: '项目、科研代码与实验室折腾记录。',
  },
  '/timeline': {
    title: '归档与探索',
    desc: '总计 3 篇研究记录',
  },
};

export default function BannerTitle() {
  const pathname = usePathname();
  const [articleMeta, setArticleMeta] = useState<ArticleMeta | null>(null);

  useEffect(() => {
    // 检查是否有文章元数据
    const metaElement = document.querySelector('[data-article-meta]');
    if (metaElement) {
      try {
        const data = JSON.parse(metaElement.getAttribute('data-article-meta') || '{}');
        setArticleMeta(data);
        return;
      } catch (e) {
        console.error('解析文章元数据失败', e);
      }
    }
    setArticleMeta(null);
  }, [pathname]);

  // 检查是否匹配固定页面
  const normalizedPath = pathname?.replace(/\/$/, '') || '';
  const pageInfo = pageTitles[normalizedPath] || pageTitles[pathname] || null;

  // 如果是文章详情页，显示文章元数据
  if (pathname?.startsWith('/posts/') && articleMeta) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none z-10 px-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-lg text-center">
          {articleMeta.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-3 md:mt-4">
          <span className="text-sm md:text-base opacity-90 drop-shadow-md">
            {articleMeta.date}
          </span>
          {articleMeta.tags && articleMeta.tags.length > 0 && (
            <>
              <span className="text-white/40">·</span>
              <div className="flex flex-wrap gap-2">
                {articleMeta.tags.map((tag) => (
                  <span key={tag} className="text-xs md:text-sm font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full drop-shadow-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // 固定页面标题
  if (pageInfo) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none z-10 px-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-lg text-center">
          {pageInfo.title}
        </h1>
        <p className="text-lg md:text-xl mt-2 opacity-90 drop-shadow-md text-center">
          {pageInfo.desc}
        </p>
      </div>
    );
  }

  return null;
}