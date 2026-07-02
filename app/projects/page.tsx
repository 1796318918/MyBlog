import Navbar from '../../components/Navbar';
import PageTransition from '../../components/PageTransition';
import ProjectsBoard from './ProjectsBoard';
import { siteConfig } from "@/siteConfig";

export const metadata = {
  title: "项目 | " + siteConfig.title,
  description: "开源项目与代码仓库展示",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen relative pb-20">
      <Navbar />
      <PageTransition>
        {/* 移除 <div className="mt-28">，让 ProjectsBoard 自己控制间距 */}
        <ProjectsBoard />
      </PageTransition>
    </div>
  );
}