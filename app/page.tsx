// app/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Navbar from '../components/Navbar';
import PageTransition from '../components/PageTransition';
import SearchBar from '../components/SearchBar';
import { siteConfig } from '../siteConfig';
import ProfileCard from '../components/ProfileCard';
import { ToastProvider } from '../components/ToastProvider';
import LatestPostsCarousel from '../components/LatestPostsCarousel';
import { projectsData } from '../data/projects';

function formatUpdateTime(dateString: string) {
  if (!dateString || dateString === '1970-01-01') return '刚刚更新';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    if (hours === '00' && mins === '00') return `${year}.${month}.${day}`;
    return `${year}.${month}.${day} ${hours}:${mins}`;
  } catch { return dateString; }
}

export default function Home() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  let allPosts: any[] = [];
  
  try {
    if (fs.existsSync(postsDirectory)) {
      const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));
      allPosts = fileNames.map(fileName => {
        const fullPath = path.join(postsDirectory, fileName);
        const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));
        const rawDate = data.date || '1970-01-01';
        return {
          slug: fileName.replace(/\.md$/, ''),
          ...data,
          title: data.title || '',
          description: data.description || '',
          content: content || '',
          date: rawDate,
          formattedDate: formatUpdateTime(rawDate)
        };
      }).sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (dateB !== dateA) return dateB - dateA;
        return b.slug.localeCompare(a.slug);
      });
    }
  } catch (e) {
    console.error("读取文章失败", e);
  }

  // ✅ 关键修复：合并文章和项目数据，统一转换为 SearchItem 格式
  const searchItems = [
    // 文章
    ...allPosts.map(post => ({
      id: `post-${post.slug}`,
      title: post.title || '无标题',
      description: post.description || '',
      tags: post.tags || [],
      date: post.date || '',
      url: `/posts/${post.slug}`,
      type: 'post' as const,
    })),
    // 项目
    ...projectsData.map(project => ({
      id: `project-${project.id}`,
      title: project.name,
      description: project.description,
      tags: project.tags || [],
      date: '',
      url: '/projects',
      type: 'project' as const,
    })),
  ];

  // ✅ 调试：在服务端打印搜索项数量
  console.log(`📊 首页搜索数据: ${searchItems.length} 项 (文章 ${allPosts.length} 篇, 项目 ${projectsData.length} 个)`);

  const top5Posts = allPosts.length > 0 ? allPosts.slice(0, 5) : [{ 
    slug: 'none', 
    title: '暂无文章', 
    description: '快去写第一篇吧！', 
    cover: siteConfig.defaultPostCover, 
    date: '', 
    formattedDate: '' 
  }];

  const chatterCount = 0;

  return (
    <ToastProvider>
      <div className="min-h-screen relative pb-10">
        <Navbar />
        <PageTransition>
          <div className="w-full max-w-6xl mx-auto mt-[60px] px-4 sm:px-6 lg:px-10 relative z-10">
            
            {/* 传入合并后的数据 */}
            <SearchBar items={searchItems} placeholder="搜寻文章、项目..." />

            <main className="flex flex-col gap-6 w-full mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                <div className="col-span-1 lg:col-span-12 flex flex-col">
                  <ProfileCard postCount={allPosts.length} chatterCount={chatterCount}/>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                <div className="col-span-1 lg:col-span-12 flex flex-col min-h-[300px]">
                  <LatestPostsCarousel posts={top5Posts} />
                </div>
              </div>
            </main>
          </div>
        </PageTransition>
      </div>
    </ToastProvider>
  );
}