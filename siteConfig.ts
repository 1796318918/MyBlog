// siteConfig.ts - 你的全站“控制中心”

export const siteConfig = {
  // 1. 网站标题与博主信息
  title: "LilaS",
  faviconUrl: "/images/Cat.png",
  authorName: "LilaS",
  bio: "喜欢折腾的普通人，偶尔写点东西记录生活和技术的碎片",

  navTitle: "LilaS",// 导航栏标题（默认是 authorName）

  // 2. 头像设置 (支持网络链接，或将图片放入 public 文件夹后使用 "/images/me.jpg")
  avatarUrl: "/images/Cat.png",

  // 3. 网站背景设置 (二选一)
  // 如果想用纯图片背景，请在下面 bgImage 写路径，并将 useGradient 设为 false
  useGradient: true, // 是否启用呼吸流动的渐变背景
  themeColors: ["#a18cd1", "#fbc2eb", "#a1c4fd", "#c2e9fb"], // 呼吸流动的颜色组合
// 修改这里：变成图片数组
  bgImages: ["https://bu.dusays.com/2026/03/24/69c1e38b4c370.jpg", "https://bu.dusays.com/2026/03/24/69c26fe4acdb5.jpg", "https://bu.dusays.com/2026/03/24/69c26fe4d9486.jpg"],

  // 4. 文章默认封面图 (当 Markdown 没写 cover 时显示)
  defaultPostCover: "https://bu.dusays.com/2026/03/24/69c1e38b346cb.jpg",

  social: {
    github: "https://github.com/1796318918",
    gitee: "",
    google: "LilaS1796318918@gmail.com",
    email: "1796318918@qq.com",
    qq: "1796318918",
    wechat: "chen1796318918",
  },

  buildDate: "2026-06-08T00:00:00", // 建站日期
  enableLevelSystem: true,
};
