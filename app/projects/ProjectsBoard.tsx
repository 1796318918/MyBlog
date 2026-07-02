"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../../data/projects';
import SearchBar from '../../components/SearchBar';

export default function ProjectsBoard() {
  const searchItems = projectsData.map(project => ({
    id: `project-${project.id}`,
    title: project.name,
    description: project.description,
    tags: project.tags || [],
    date: '',
    url: '/projects',
    type: 'project' as const,
  }));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-10 pt-[60px] pb-10 relative z-10">

      <SearchBar items={searchItems} placeholder="搜索项目名称、描述或技术栈..." />

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative mt-12">
        <AnimatePresence>
          {projectsData.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              key={project.id}
              className="h-full"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-3xl bg-[#f8f8f8] dark:bg-[#1e1e1e] shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 group relative p-6 md:p-8"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors duration-700"></div>

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{project.icon}</span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.name}
                    </h2>
                  </div>
                  <svg className="w-8 h-8 text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 font-serif leading-relaxed line-clamp-3 mb-6 relative z-10 min-h-[60px]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-md shadow-sm border border-indigo-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </motion.div>
          ))}
        </AnimatePresence>

        {projectsData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-20 text-slate-500 font-serif w-full"
          >
            云端尚未建立任何项目档案...
          </motion.div>
        )}
      </motion.div>

    </div>
  );
}