
const { backToTopPlugin } = require('@vuepress/plugin-back-to-top')

module.exports = {

  dest: ".site",
  // base: "",
  title: "yangleduo",
  description: "笔记包含: Java 基础，算法与数据结构，JVM，Java 并发，计算机网络和操作系统，数据库...",
  port: "8080",
  head: [
    ["link", { rel: "icon", href: "/img/logo.png" }],
    ["link", { rel: "stylesheet", href: "/css/style.css" }],
  ],

  // theme: 'reco',
  // locales: {
  //   '/': {
  //     lang: 'zh-CN'
  //   }
  // },

  // 代码块显示行号
  markdown: {
    lineNumbers: true,
  },

  themeConfig: {

    nav: require("./nav.js"), 
    sidebar: require("./sidebar.js"),
    collapsable:true,
    sidebarDepth: 4,

    lastUpdated: "Last Updated",
    searchMaxSuggestoins: 10,
    serviceWorker: {
      updatePopup: {
        message: "有新的内容.",
        buttonText: "更新",
      },
    },

    // 假定是 GitHub. 同时也可以是一个完整的
    repo: 'yangleduo617/blog',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    // docsRepo: 'yangleduo617/blog',
    // 假如文档不是放在仓库的根目录下：
    // docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    // docsBranch: 'main',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页",
  },

  plugins: [
    // '@vuepress/back-to-top',
    backToTopPlugin(),
  ],


};
  
