"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function TimelineClient({ posts: initialPosts, tags }: { posts: any[], tags: { name: string, count: number }[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const gridScrollRef = useRef<HTMLDivElement>(null);

  const searchItems = posts.map(post => ({
    id: `post-${post.slug}`,
    title: post.title,
    description: post.description,
    tags: post.tags || [],
    date: post.date,
    url: `/posts/${post.slug}`,
    type: 'post' as const,
  }));

  const timelinePosts = useMemo(() => {
    return posts.filter(post => {
      return selectedTag === 'All' || post.tags?.includes(selectedTag);
    });
  }, [posts, selectedTag]);

  const handleGridScroll = () => {
    if (gridScrollRef.current) {
      setShowScrollTop(gridScrollRef.current.scrollTop > 200);
    }
  };

  const scrollToTop = () => {
    if (gridScrollRef.current) {
      try {
        gridScrollRef.current.scroll({ top: 0, left: 0, behavior: 'smooth' });
      } catch (error) {
        gridScrollRef.current.scrollTo(0, 0);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-[60px] px-4 sm:px-10 relative z-10">

      <SearchBar items={searchItems} placeholder="搜寻被封存的知识..." />

      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 bg-[#f8f8f8] dark:bg-[#1e1e1e] p-4 rounded-3xl shadow-xl mt-6">
        <div className="flex flex-wrap justify-center md:justify-start gap-2 flex-1">
          <button 
            onClick={() => setSelectedTag('All')} 
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
              selectedTag === 'All' 
                ? 'bg-indigo-500 text-white shadow-md' 
                : 'bg-white/50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 hover:bg-white'
            }`}
          >
            全部档案
          </button>
          {tags.map(tag => (
            <button 
              key={tag.name} 
              onClick={() => setSelectedTag(tag.name)} 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                selectedTag === tag.name 
                  ? 'bg-indigo-500 text-white shadow-md' 
                  : 'bg-white/50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 hover:bg-white'
              }`}
            >
              {tag.name} <span className="opacity-50 ml-1">{tag.count}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key="card-view"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full mt-6"
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .cyber-scrollbar::-webkit-scrollbar { width: 8px; }
          .cyber-scrollbar::-webkit-scrollbar-track { background: rgba(99, 102, 241, 0.05); border-radius: 12px; margin-top: 20px; margin-bottom: 56px; }
          .cyber-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #818cf8 0%, #c084fc 100%); border-radius: 12px; border: 2px solid transparent; background-clip: padding-box; }
          .fade-edges { -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%); mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%); }
        `}} />

        <div
          ref={gridScrollRef}
          onScroll={handleGridScroll}
          className="h-[75vh] overflow-y-auto cyber-scrollbar pr-2 sm:pr-5 pb-10 fade-edges"
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 pt-4 pb-10">
            {timelinePosts.map((post, idx) => (
              <motion.div 
                key={post.slug} 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <div className="bg-[#f8f8f8] dark:bg-[#1e1e1e] shadow-xl rounded-2xl md:rounded-3xl overflow-hidden flex flex-col h-full group relative hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <Link href={`/posts/${post.slug}`} className="block flex-1 flex flex-col cursor-pointer">
                    <div className="relative h-28 sm:h-36 md:h-40 overflow-hidden">
                      <img 
                        src={post.cover} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <span className="absolute bottom-2 left-2 md:bottom-3 md:left-4 text-white/90 text-[9px] md:text-xs font-mono font-bold bg-black/40 backdrop-blur-sm px-1.5 py-0.5 md:px-2 md:py-1 rounded flex items-center gap-1">
                        <Calendar size={10} className="md:w-3 md:h-3"/> {post.date.split(' ')[0]}
                      </span>
                    </div>

                    <div className="p-3 md:p-5 flex-1 flex flex-col">
                      <h3 className="text-xs sm:text-sm md:text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 md:mb-2 line-clamp-2 transition-colors group-hover:text-indigo-500">
                        {post.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-2 md:mb-4 line-clamp-2 flex-1 leading-snug">
                        {post.description || "暂时没有描述"}
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto">
                        {post.tags.map((tag: string) => (
                          <span key={tag} className="text-[8px] md:text-[10px] font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {timelinePosts.length === 0 && (
            <div className="text-center py-20 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm">
              这个频段没有接收到任何信号
            </div>
          )}
        </div>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              onClick={scrollToTop}
              className="absolute bottom-4 -right-3 w-9 h-9 flex items-center justify-center bg-gradient-to-t from-purple-500 to-indigo-500 text-white rounded-full shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:-translate-y-1 transition-all z-50 group pointer-events-auto"
              title="回到顶部"
            >
              <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}