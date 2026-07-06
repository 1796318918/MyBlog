// data/projects.ts
export type Project = {
  id: string;
  name: string;
  description: string;
  icon: string;
  githubUrl: string;
  tags: string[];
};

export const projectsData: Project[] = [
  {
    "id": "proj_1775049332705",
    "name": "Selenium Pytest 自动化测试框架",
    "githubUrl": "https://github.com/1796318918/Selenium_Pytest_Framework.git",
    "description": "基于 Selenium WebDriver 和 Pytest 构建的 Web 自动化测试框架，采用页面对象模型（POM）设计，通过 YAML 文件统一管理页面元素定位信息，封装了显式等待、日志记录和失败自动截图功能，并集成 pytest-html 生成直观的 HTML 测试报告，便于快速定位问题和持续集成。",
    "icon": "🧪",
    "tags": ["Python", "Selenium", "Pytest", "自动化测试"]
  },
];